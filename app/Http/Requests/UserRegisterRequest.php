<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'email:rfc,dns', 'unique:users', 'string'],
            'password' => ['required', 'string', 'confirmed', 'min:6'],
            'remember' => ['nullable', 'sometimes', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'Введите ваш email!',
            'email.email' => 'Пожалуйста, введите корректный email!',
            'email.unique' => 'Этот email уже занят!',
            'password.confirmed' => 'Пароли не совпадают',
            'password.min' => 'Пароль должен быть неменее 6 символов',
            'required' => 'Это поле обязательно!'
        ];
    }
}
