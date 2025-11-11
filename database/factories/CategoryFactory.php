<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $name = $this->faker->unique()->words(2, true),
            'slug' => Str::slug($name),
            'description' => $this->faker->optional(0.7)->sentence(12),
            'hero_image_url' => $this->faker->optional(0.4)->imageUrl(1200, 900, 'food', true),
            'is_active' => $this->faker->boolean(92),
            'display_order' => $this->faker->numberBetween(0, 10),
        ];
    }
}
