<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\blog;
use App\Models\Event;
use App\Models\jadwalUstad;
use App\Models\penerimaan_zakat;
use App\Models\Pengurus;
use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class DashboardController extends Controller
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
        $user = auth()->user();
        $AkumulasiZakatRaw = penerimaan_zakat::getAkumulasiZakat25Persen();
        $AkumulasiFitrahRaw = penerimaan_zakat::getAkumulasiZakatPilihan(1, 1);
        $AkumulasiMalRaw = penerimaan_zakat::getAkumulasiZakatPilihan(2, 1) ?? 0;
        $AkumulasiFidyahRaw = penerimaan_zakat::getAkumulasiZakatPilihan(3, 1) ?? 0;
        $AkumulasiInfaqRaw = penerimaan_zakat::getAkumulasiInfaq();

        $totalAkumulasi = $AkumulasiZakatRaw + $AkumulasiInfaqRaw;

        // Gunakan number_format hanya saat menampilkan hasil
        $AkumulasiZakat = number_format($AkumulasiZakatRaw);
        $AkumulasiFitrah = number_format($AkumulasiFitrahRaw);
        $AkumulasiMal = number_format($AkumulasiMalRaw);
        $AkumulasiFidyah = number_format($AkumulasiFidyahRaw);
        $AkumulasiInfaq = number_format($AkumulasiInfaqRaw);
        $totalAkumulasiFormatted = number_format($totalAkumulasi);

        // Perhitungan persentase kenaikan
        $totalZakatAll = penerimaan_zakat::whereYear('created_at', Carbon::now()->year)->count();
        $totalZakatAllTahunKemarin = penerimaan_zakat::whereYear('created_at', Carbon::now()->subYear()->year)->count();
        $PersentaseKenaikanTotalZakat = $this->calculatePercentageChange($totalZakatAll, $totalZakatAllTahunKemarin);

        $AkumulasiFitrahLastYearRaw = penerimaan_zakat::getAkumulasiZakatPilihan(1, 2);
        $AkumulasiMalLastYearRaw = penerimaan_zakat::getAkumulasiZakatPilihan(2, 2) ?? 0;
        $AkumulasiFidyahLastYearRaw = penerimaan_zakat::getAkumulasiZakatPilihan(3, 2) ?? 0;

        $PersentaseKenaikanFitrah = $this->calculatePercentageChange($AkumulasiFitrahRaw, $AkumulasiFitrahLastYearRaw);
        $PersentaseKenaikanMal = $this->calculatePercentageChange($AkumulasiMalRaw, $AkumulasiMalLastYearRaw);
        $PersentaseKenaikanFidyah = $this->calculatePercentageChange($AkumulasiFidyahRaw, $AkumulasiFidyahLastYearRaw);

        return inertia(
            'Dashboard',
            compact(
                'AkumulasiMal',
                'AkumulasiFitrah',
                'PersentaseKenaikanTotalZakat',
                'totalZakatAll',
                'AkumulasiInfaq',
                'AkumulasiZakat',
                'totalAkumulasiFormatted',
                'AkumulasiFidyah',
                'PersentaseKenaikanFitrah',
                'PersentaseKenaikanMal',
                'PersentaseKenaikanFidyah',

            )
        );
    }
    public function welcome()
    {
        $bulanSekarang = date('m');
        $tahunSekarang = date('Y');
        $response = Http::get('http://api.aladhan.com/v1/calendarByAddress/' . $tahunSekarang . '/' . $bulanSekarang . '?address=Bekasi, indonesia&method=2');
        $statusCode = $response->getStatusCode(); // Status code
        $data = json_decode($response->getBody()->getContents(), true)['data']; // Decode JSON response
        foreach ($data as $key => $value) {
            $data[$key]['date']['readable'] = date('d m Y', strtotime($value['date']['readable']));
            if ($data[$key]['date']['readable'] == date('d m Y')) {
                $fajr = $value['timings']['Fajr'];
                $Sunrise = $value['timings']['Sunrise'];
                $Dhuhr = $value['timings']['Dhuhr'];
                $Asr = $value['timings']['Asr'];
                $Maghrib = $value['timings']['Maghrib'];
                $Isha = $value['timings']['Isha'];
                $hari =   date('d ', strtotime($data[$key]['date']['hijri']['date']));
                $tahun =   date('Y', strtotime($data[$key]['date']['hijri']['date']));
                $waktu =  $hari . '' . $data[$key]['date']['hijri']['month']['en'] . ' ' . $tahun . ' H';
            }
        }
        $event = Event::query()
            ->orderBy('date', 'asc')
            ->limit(5)
            ->get();

        $blog =  Blog::with('createdByUser')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        $pengurus = Pengurus::query()
            ->limit(5)
            ->get();

        $tanggalHariIni = Carbon::today();
        $kajianUstad = JadwalUstad::query()
            ->where('tanggal_kajian', '>=', $tanggalHariIni)
            ->orderBy('tanggal_kajian', 'asc')
            ->where('status', 'aktif')
            ->first();

        return inertia(
            'Welcome',
            compact('fajr', 'event', 'kajianUstad', 'pengurus', 'Sunrise', 'blog', 'Dhuhr', 'Asr', 'Maghrib', 'Isha', 'waktu')
        );
    }
}
