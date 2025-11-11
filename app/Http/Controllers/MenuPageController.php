<?php

namespace App\Http\Controllers;

use App\Http\Resources\MenuCategoryResource;
use App\Models\Category;
use App\Models\MenuItem;
use Inertia\Inertia;
use Inertia\Response;

class MenuPageController extends Controller
{
    public function __invoke(): Response
    {
        $categories = Category::query()
            ->with([
                'items' => fn ($query) => $query->available()->orderBy('display_order')->orderBy('name'),
            ])
            ->where('is_active', true)
            ->orderBy('display_order')
            ->orderBy('name')
            ->get();

        $featuredItems = MenuItem::query()
            ->available()
            ->where('is_featured', true)
            ->with('category:id,name,slug')
            ->orderBy('display_order')
            ->orderBy('name')
            ->take(6)
            ->get()
            ->map(fn (MenuItem $item) => [
                'id' => $item->id,
                'name' => $item->name,
                'subtitle' => $item->subtitle,
                'price' => (float) $item->price,
                'formatted_price' => $item->formatted_price,
                'category' => $item->category?->only(['id', 'name', 'slug']),
                'image_url' => $item->image_url,
                'tags' => $item->tags ?? [],
            ]);

        return Inertia::render('Menu/Index', [
            'categories' => MenuCategoryResource::collection($categories)->resolve(),
            'featured' => $featuredItems,
            'updatedAt' => now()->toIso8601String(),
        ]);
    }
}
