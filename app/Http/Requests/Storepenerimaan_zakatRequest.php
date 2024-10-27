<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class Storepenerimaan_zakatRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "nama_muzakki" => ['required', 'max:255'],
            'tanggal' => ['required', 'date'],
            "jiwa" => ['required'],
            "dataJenisZakat.*.id_jenis_zakat" => ['required'],
            "dataJenisZakat.*.status_zakat" => ['required', 'string'],
            "dataJenisZakat.*.jumlah_uang" => ['nullable'],
            "dataJenisZakat.*.jumlah_beras" => ['nullable'],
            "dataJenisZakat.*.waktu_berzakat" => ['required'],
            "dataJenisZakat.*.metode_pembayaran" => ['required'],
            "created_by" => ['required'],
            "updated_by" => ['required'],
            "id_rt" => ['required'],
        ];
    }
}
