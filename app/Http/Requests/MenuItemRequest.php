<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MenuItemRequest extends FormRequest
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
        $menuItemId = optional($this->route('menuItem'))->id;

        return [
            'name' => ['required', 'string', 'max:150'],
            'slug' => ['nullable', 'string', 'max:180', 'regex:/^[a-z0-9-]+$/', 'unique:menu_items,slug,' . $menuItemId],
            'subtitle' => ['nullable', 'string', 'max:180'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'currency' => ['required', 'string', 'max:16'],
            'is_available' => ['sometimes', 'boolean'],
            'is_featured' => ['sometimes', 'boolean'],
            'image_url' => ['nullable', 'url', 'max:255'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['string', 'max:50'],
            'display_order' => ['nullable', 'integer', 'between:0,500'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'slug' => $this->filled('slug')
                ? str()->slug($this->string('slug')->value())
                : $this->input('slug'),
            'currency' => $this->filled('currency')
                ? trim($this->input('currency'))
                : 'تومان',
            'price' => $this->parsePrice($this->input('price')),
            'display_order' => $this->has('display_order')
                ? (int) $this->input('display_order')
                : null,
        ]);
    }

    private function parsePrice(mixed $price): float
    {
        if (is_numeric($price)) {
            return (float) $price;
        }

        if (is_string($price)) {
            $normalized = preg_replace('/[^\d.]/', '', $price);

            return (float) ($normalized ?: 0);
        }

        return 0.0;
    }
}
