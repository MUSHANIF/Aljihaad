<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class Storepembagian_zakatRequest extends FormRequest
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
        $rules = [
            "pilihan" => ['required'],
            "uang" => ['required'],
            "jumlah_beras" => [],
            "jenis_pengambilan" => ['required'],
            "created_by" => ['nullable'],
            "updated_by" => ['nullable'],
        ];

        if ($this->pilihan == 2) {
            $rules['nama_yayasan'] = ['required'];
            $rules['alamat'] = ['required'];
            $rules['telepon'] = ['required'];
        } else if ($this->pilihan == 1) {
            $rules['id_rt'] = ['required'];
        }
        return $rules;
    }
}
