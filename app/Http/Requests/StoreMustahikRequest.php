<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMustahikRequest extends FormRequest
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
            'muzakki.*.nama_muzakki' => ['required', 'string', 'max:255'],
            'muzakki.*.jiwa' => ['required', 'integer'],
            'muzakki.*.nik' => ['nullable', 'integer'],
            'tanggal' => ['required', 'date'],
            "id_rt" => ['required'],
            "created_by" => ['nullable'],
            "updated_by" => ['nullable'],
        ];
    }
}
