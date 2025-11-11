<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MenuItem>
 */
class MenuItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->unique()->words(3, true);
        $baseTags = ['croissant', 'cappuccino', 'special', 'seasonal', 'classic', 'signature', 'iced', 'warm'];
        $tagSelection = Arr::random($baseTags, $this->faker->numberBetween(1, 3));
        $tags = is_array($tagSelection) ? array_values($tagSelection) : [$tagSelection];

        return [
            'category_id' => Category::factory(),
            'name' => Str::title($name),
            'slug' => Str::slug($name . '-' . $this->faker->unique()->numberBetween(1, 999)),
            'subtitle' => $this->faker->optional(0.5)->sentence(4),
            'description' => $this->faker->optional()->paragraphs(3, true),
            'price' => $this->faker->numberBetween(90_000, 420_000),
            'currency' => 'تومان',
            'is_available' => $this->faker->boolean(88),
            'is_featured' => $this->faker->boolean(22),
            'image_url' => $this->faker->optional(0.35)->imageUrl(900, 900, 'food', true),
            'tags' => $tags,
            'display_order' => $this->faker->numberBetween(0, 12),
        ];
    }
}
