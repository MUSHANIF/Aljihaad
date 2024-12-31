<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAtkRequest;
use App\Http\Requests\Storepenerimaan_zakatRequest;
use App\Http\Requests\Updatepenerimaan_zakatRequest;
use App\Http\Resources\AtkResource;
use App\Http\Resources\PengurusResource;
use App\Models\Atk;
use App\Models\jenis_zakat;
use Illuminate\Support\Str;
use App\Models\penerimaan_zakat;
use App\Models\Pengurus;
use App\Models\per_rt;
use App\Models\Total_sum_zakat;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ZakatController extends Controller
{
    /**
     * Menghitung persentase kenaikan atau penurunan.
     *
     * @param float $current  Nilai saat ini.
     * @param float $previous Nilai sebelumnya.
     * @return float Persentase kenaikan atau penurunan.
     */
    function calculatePercentageChange($current, $previous)
    {
        if ($previous > 0) {
            return (($current - $previous) / $previous) * 100;
        } else {
            return $current > 0 ? 100 : 0;
        }
    }
    public function index()
    {
        $TotalHariIni = penerimaan_zakat::whereDate('tanggal', now()->format('Y-m-d'))->count();
        $TotalKemarin = penerimaan_zakat::whereDate('tanggal', now()->subDay()->format('Y-m-d'))->count();

        $TotalKemarinUangZakat = penerimaan_zakat::whereDate('tanggal', now()->subDay()->format('Y-m-d'))->sum('jumlah_uang');
        $TotalUangZakatToday = penerimaan_zakat::whereDate('tanggal', now()->format('Y-m-d'))->sum('jumlah_uang');

        $PersentaseKenaikan = $TotalKemarin > 0 ? (($TotalHariIni - $TotalKemarin) / $TotalKemarin) * 100 : ($TotalHariIni > 0 ? 100 : 0);

        $PersentaseKenaikanUang = $this->calculatePercentageChange($TotalUangZakatToday, $TotalKemarinUangZakat);

        return inertia("Zakat/RekapGabungan", [
            'queryParams' => request()->query() ?: null,
            'dataRT' => per_rt::all(),
            'dataJenisZakat' => jenis_zakat::all(),
            'success' => session('success'),
            'TotalHariIni' => $TotalHariIni,
            'PersentaseKenaikan' => $PersentaseKenaikan,
            'TotalUangZakatToday' => number_format($TotalUangZakatToday, 2, ',', '.'),
            'PersentaseKenaikanUang' => $PersentaseKenaikanUang,
        ]);
    }
    public function RekapAtk()
    {
        $query = Atk::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("description")) {
            $query->where("description", request("description"));
        }

        $Mustahik = $query->orderBy($sortField, $sortDirection)
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->onEachSide(1);

        return inertia("Zakat/Atk/Atk", [
            "AtkData" => AtkResource::collection($Mustahik),
            'queryParams' => request()->query() ?: null,
            'dataRT' => per_rt::all(),
            'amil' => Pengurus::all(),
            'dataJenisZakat' => jenis_zakat::all(),
            'success' => session('success'),
        ]);
    }
    public function CreateAtk()
    {
        return inertia("Zakat/Atk/CreateAtk");
    }
    public function zakatPerhari()
    {
        $query = Pengurus::where('created_at', now()->format('Y-m-d'));

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("description")) {
            $query->where("description", request("description"));
        }

        $Pengurus = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        $TotalHariIniRt3 = penerimaan_zakat::byRt(3)->byDate()->get();
        $TotalHariIniRt4 = penerimaan_zakat::byRt(5)->byDate()->get();
        $TotalHariIniRt4Atas = penerimaan_zakat::byRt(4)->byDate()->get();
        $TotalHariIniRt5 = penerimaan_zakat::byRt(6)->byDate()->get();

        return inertia("Zakat/RekapDataPerhari", [
            "pengurus" => PengurusResource::collection($Pengurus),
            'queryParams' => request()->query() ?: null,
            'dataRT' => per_rt::all(),
            'dataJenisZakat' => jenis_zakat::all(),
            'success' => session('success'),
            'TotalHariIniRt3' => number_format($TotalHariIniRt3->sum('jumlah_uang'), 2, ',', '.'),
            'TotalHariIniRt4' => number_format($TotalHariIniRt4->sum('jumlah_uang'), 2, ',', '.'),
            'TotalHariIniRt4Atas' => number_format($TotalHariIniRt4Atas->sum('jumlah_uang'), 2, ',', '.'),
            'TotalHariIniRt5' => number_format($TotalHariIniRt5->sum('jumlah_uang'), 2, ',', '.'),

            'CountHariIniRt3' => $TotalHariIniRt3->count(),
            'CountHariIniRt4' => $TotalHariIniRt4->count(),
            'CountHariIniRt4Atas' => $TotalHariIniRt4Atas->count(),
            'CountHariIniRt5' => $TotalHariIniRt5->count(),

        ]);
    }
    public function downloadPDF($id)
    {
        $dataZakat = penerimaan_zakat::with(['RelationRt', 'createdByUser', 'RelationJenisZakat'])->where('id', $id)->first();
        $invoice = [
            'no' => $dataZakat->no_invoice,
            'tanggal' => \Carbon\Carbon::parse($dataZakat->tanggal)->locale('id')->translatedFormat('d F Y'),
            'nama' => $dataZakat->nama_muzakki,
            'alamat' => 'Pondok Cipta Blok C ' . $dataZakat->RelationRt->nama_rt,
            'uang' => number_format($dataZakat->jumlah_uang, 2, ',', '.'),
            'beras' => $dataZakat->jumlah_beras,
            'jenis' => $dataZakat->RelationJenisZakat->jenis_zakat,
            'jiwa' => $dataZakat->jiwa,
            'namaPetugas' => $dataZakat->createdByUser->name,
        ];


        $pdf = Pdf::loadView('invoicePageZakat', compact('invoice'))->setPaper('a4', 'portrait')->setOption('height', '1in');

        // Tampilkan PDF di browser
        return $pdf->stream('invoice_' . $id . '.pdf');
        // return $pdf->download('invoice_' . $id . '.pdf');
    }
    public function CreateZakat()
    {
        return inertia("Zakat/Create");
    }
    public function PembagianZakat()
    {

        return inertia("Zakat/PembagianZakat", [
            'dataRT' => per_rt::all(),
            'amil' => Pengurus::all(),
            'dataJenisZakat' => jenis_zakat::all(),
        ]);
    }
    public function CreatePembagianZakat()
    {
        $allZakat = penerimaan_zakat::whereYear('created_at', now()->year)->where('id_jenis_zakat', '!=', 4)->get();
        $InfaqShodaqoh = penerimaan_zakat::whereYear('created_at', now()->year)->where('id_jenis_zakat', 4)->get();
        $jumlah_zakat = $allZakat->sum('jumlah_uang');
        $jumlah_Shadaqoh = $InfaqShodaqoh->sum('jumlah_uang');
        $Total_beras = $allZakat->sum('jumlah_beras');
        $jumlah_zakat_Amil_Fisabilillah = penerimaan_zakat::getAkumulasiZakat25Persen();

        return inertia("Zakat/PembagianZakat/CreatePembagianZakat", [
            'jumlah_zakat_Amil_Fisabilillah' => $jumlah_zakat_Amil_Fisabilillah + $jumlah_Shadaqoh,
            'jumlah_zakat' => $jumlah_zakat - $jumlah_zakat_Amil_Fisabilillah,
            'Total_beras' => $Total_beras,
            'allZakat' => $allZakat
        ]);
    }
    public function EditZakat($penerimaan_zakat)
    {
        $EditZakat = penerimaan_zakat::find($penerimaan_zakat);
        return inertia("Zakat/Edit", [
            'penerimaan_zakat' => $EditZakat
        ]);
    }
    public function PostDataAtk(StoreAtkRequest $request)
    {
        try {
            $data = $request->validated();
            foreach ($data['atkData'] as $atk) {
                $image = $atk['foto_struk'] ?? null;

                if ($image) {
                    $path = $image->store('FotoStrukAtk/' . Str::random(), 'public');
                    $atk['foto_struk'] = $path;
                }
                Atk::create([
                    'nama_barang' => $atk['nama_barang'],
                    'harga_barang' => $atk['harga_barang'],
                    'total_barang' => $atk['total_barang'],
                    'foto_struk' => $atk['foto_struk'],
                    'tanggal_pembelian' => $data['tanggal_pembelian'],
                    'id_amil' => $data['id_amil'],
                ]);
            }
            return redirect()->route('zakat.RekapAtk')->with('success', 'Data Atk berhasil ditambahkan');
        } catch (\Exception $e) {
            dd($e->getMessage());
        }
    }
    public function PostZakat(Storepenerimaan_zakatRequest $request)
    {
        try {
            $data = $request->validated();
            $currentYear = now()->year;
            foreach ($data['dataJenisZakat'] as $key) {

                $no_invoice = str_pad(penerimaan_zakat::max('id') + 1, 4, '0', STR_PAD_LEFT) . '/INV/' . now()->format('Y') . '/' . \Carbon\Carbon::now()->format('Y') - 580;

                penerimaan_zakat::create([
                    'no_invoice' => $no_invoice,
                    'nama_muzakki' => $data['nama_muzakki'],
                    'id_rt' => $data['id_rt'],
                    'tanggal' => $data['tanggal'],
                    'jiwa' => $data['jiwa'],
                    'id_jenis_zakat' => $key['id_jenis_zakat'],
                    'status_zakat' => $key['status_zakat'],
                    'jumlah_uang' => $key['jumlah_uang'],
                    'jumlah_beras' => $key['jumlah_beras'],
                    'waktu_berzakat' => $key['waktu_berzakat'],
                    'metode_pembayaran' => $key['metode_pembayaran'],
                    'created_by' => $data['created_by'],
                    'updated_by' => $data['updated_by']
                ]);
                $getTotalZakat = Total_sum_zakat::whereYear('created_at', $currentYear)
                    ->first();
                if ($key['id_jenis_zakat'] != 4) {
                    if ($getTotalZakat) {
                        $totalZakat = $getTotalZakat->total_pemasukan_total + $key['jumlah_uang'];
                        $uangMasuk25Percent = $key['jumlah_uang'] * 0.25;
                        $perhitungan25percentTotal = $totalZakat * 0.25;
                        $perhitunganNetTotal = $totalZakat - $perhitungan25percentTotal;
                        $jumlahPemasukanSisaNet = $key['jumlah_uang'] - $uangMasuk25Percent;
                        $getTotalZakat->update([
                            'total_pemasukan_total' => $totalZakat,
                            'sisa_pemasukan_total' => $getTotalZakat->sisa_pemasukan_total + $key['jumlah_uang'],
                            'total_pemasukan_25_percent' => $perhitungan25percentTotal,
                            'sisa_pemasukan_25_percent' => $getTotalZakat->sisa_pemasukan_25_percent + $uangMasuk25Percent,
                            'net_pemasukan_total' => $perhitunganNetTotal,
                            'sisa_net_pemasukan_total' => $getTotalZakat->sisa_net_pemasukan_total + $jumlahPemasukanSisaNet,
                            'total_beras' => $getTotalZakat->total_beras + $key['jumlah_beras'],
                            'sisa_beras' => $getTotalZakat->total_beras + $key['jumlah_beras'],
                            'total_25percent_infaq' => $getTotalZakat->sisa_pemasukan_25_percent + $uangMasuk25Percent,

                        ]);
                    } else {
                        Total_sum_zakat::create([
                            'total_pemasukan_total' => $key['jumlah_uang'],
                            'sisa_pemasukan_total' => $key['jumlah_uang'],
                            'total_pemasukan_25_percent' => $key['jumlah_uang'] * 0.25,
                            'sisa_pemasukan_25_percent' =>  $key['jumlah_uang'] * 0.25,
                            'net_pemasukan_total' => $key['jumlah_uang'] - ($key['jumlah_uang'] * 0.25),
                            'sisa_net_pemasukan_total' =>  $key['jumlah_uang'] - ($key['jumlah_uang'] * 0.25),
                            'total_beras' => $key['jumlah_beras'],
                            'sisa_beras' => $key['jumlah_beras'],

                        ]);
                    }
                } else {
                    $this->logicPostJenisZakatInfaq($getTotalZakat, $key);
                }
            }
            return redirect()->route('zakat.RekapGabungan')->with('success', 'Muzaaki atas nama ' . $data['nama_muzakki'] . ' berhasil ditambahkan');
        } catch (\Exception $e) {
            dd($e->getMessage());
        }
    }
    private function logicPostJenisZakatInfaq($getTotalZakat, $key)
    {
        if ($getTotalZakat) {
            $totalZakat = $getTotalZakat->total_infaq_shodaqoh + $key['jumlah_uang'];
            $getTotalZakat->update([
                'total_infaq_shodaqoh' => $totalZakat,
                'sisa_infaq_shodaqoh' => $getTotalZakat->sisa_infaq_shodaqoh + $key['jumlah_uang'],
                'total_25percent_infaq' => $getTotalZakat->sisa_pemasukan_25_percent + $key['jumlah_uang'],
            ]);
        } else {
            Total_sum_zakat::create([
                'total_infaq_shodaqoh' => $key['jumlah_uang'],
                'sisa_infaq_shodaqoh' => $key['jumlah_uang'],
                'created_by' => $key['created_by'],
            ]);
        }
    }

    public function PutZakat(Updatepenerimaan_zakatRequest $request, $zakat)
    {

        try {
            $Datazakat = penerimaan_zakat::find($zakat);
            $YearData = $Datazakat->created_at->format('Y');
            $data = $request->validated();
            $data['updated_by'] = Auth::id();
            $getTotalZakat = Total_sum_zakat::whereYear('created_at', $YearData)
                ->first();
            if ($Datazakat->id_jenis_zakat != 4) {

                $totalZakat = $getTotalZakat->total_pemasukan_total - $Datazakat->jumlah_uang + $data['jumlah_uang'];
                $getTotalZakat->update([
                    'total_pemasukan_total' => $totalZakat,
                    'sisa_pemasukan_total' => $getTotalZakat->sisa_pemasukan_total - $Datazakat->jumlah_uang + $data['jumlah_uang'],
                    'total_pemasukan_25_percent' =>  $getTotalZakat->total_pemasukan_25_percent - $Datazakat->jumlah_uang + $data['jumlah_uang'],
                    'sisa_pemasukan_25_percent' => $getTotalZakat->sisa_pemasukan_25_percent - $Datazakat->jumlah_uang + $data['jumlah_uang'],
                    'net_pemasukan_total' => $getTotalZakat->net_pemasukan_total - $Datazakat->jumlah_uang + $data['jumlah_uang'],
                    'sisa_net_pemasukan_total' => $getTotalZakat->sisa_net_pemasukan_total  - $Datazakat->jumlah_uang + $data['jumlah_uang'],
                    'total_beras' => $getTotalZakat->total_beras - $Datazakat->jumlah_beras   + $data['jumlah_beras'],
                    'sisa_beras' => $getTotalZakat->total_beras - $Datazakat->jumlah_beras  + $data['jumlah_beras'],
                    'total_25percent_infaq' => $getTotalZakat->total_25percent_infaq - $Datazakat->jumlah_uang + $data['jumlah_uang'],

                ]);
            } else {
            }
            $Datazakat->update($data);
            return redirect()->route('zakat.RekapGabungan')->with('success', 'Muzaaki atas nama ' . $Datazakat->nama_muzakki . ' berhasil diupdate');
        } catch (\Exception $e) {
            dd($e->getMessage());
        }
    }

    public function DeleteZakat($Idpenerimaan_zakat)
    {
        try {
            $penerimaan_zakat = penerimaan_zakat::find($Idpenerimaan_zakat);
            $name = $penerimaan_zakat->nama_muzakki;
            $penerimaan_zakat->delete();
            return to_route('zakat.RekapGabungan')
                ->with('success', "Muzakki \"$name\" berhasil dihapus, Tolong Refresh Halaman");
        } catch (\Exception $e) {
            dd($e->getMessage());
        }
    }
    public function DeleteAtk($id_atk)
    {
        try {
            $DataAtk = Atk::find($id_atk);
            if ($DataAtk->foto_struk) {
                Storage::disk('public')->deleteDirectory(dirname($DataAtk->foto_struk));
            }
            $DataAtk->delete();
            return to_route('zakat.RekapAtk');
        } catch (\Exception $e) {
            dd($e->getMessage());
        }
    }
}
