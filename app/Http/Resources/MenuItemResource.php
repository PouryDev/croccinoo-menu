<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MenuItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'category_id' => $this->category_id,
            'name' => $this->name,
            'subtitle' => $this->whenNotNull($this->subtitle),
            'description' => $this->whenNotNull($this->description),
            'price' => (float) $this->price,
            'formatted_price' => $this->formatted_price,
            'currency' => $this->currency,
            'is_available' => $this->is_available,
            'is_featured' => $this->is_featured,
            'image_url' => $this->whenNotNull($this->image_url),
            'tags' => $this->tags ?? [],
            'display_order' => $this->display_order,
        ];
    }
}
