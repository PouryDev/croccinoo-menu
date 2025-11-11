<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MenuCategoryResource extends JsonResource
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
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->whenNotNull($this->description),
            'hero_image_url' => $this->whenNotNull($this->hero_image_url),
            'is_active' => $this->is_active,
            'display_order' => $this->display_order,
            'items' => $this->relationLoaded('items')
                ? MenuItemResource::collection($this->items)->resolve()
                : [],
        ];
    }
}
