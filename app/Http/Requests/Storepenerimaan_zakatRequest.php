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
            "jumlah_uang" => ['nullable'],
            "jumlah_beras" => ['nullable'],
            "status_zakat" => ['required', 'string'],
            "waktu_berzakat" => ['required'],
            "created_by" => ['required'],
            "updated_by" => ['required'],
            "id_jenis_zakat" => ['required'],
            "id_rt" => ['required'],
        ];
    }
}
