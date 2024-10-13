<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAtkRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
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
            'atkData.*.nama_barang' => ['required', 'string', 'max:255'],
            'atkData.*.harga_barang' => ['required', 'integer'],
            'atkData.*.total_barang' => ['nullable', 'integer'],
            'atkData.*.foto_struk' => ['nullable'],
            'tanggal_pembelian' => ['required', 'date'],
            "id_amil" => ['required'],
            "created_by" => ['nullable'],
            "updated_by" => ['nullable'],
        ];
    }
}
