<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePengurusRequest extends FormRequest
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
            "name" => ['required', 'max:255'],
            'image' => ['nullable', 'image'],
            'imageTandaTangan' => ['nullable', 'image'],
            'user_id' => ['nullable'],
            "description" => ['nullable', 'string'],
            "no_telp" => ['nullable', 'string'],
            "gender" => ['nullable', 'string'],
            "status" => ['required', 'string'],
            "umur" => ['nullable', 'string'],
        ];
    }
}
