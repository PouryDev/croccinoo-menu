<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\MenuCategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function index(Request $request)
    {
        $includeInactive = $request->boolean('preview', false);

        $categories = Category::query()
            ->with([
                'items' => function ($query) use ($includeInactive) {
                    if (! $includeInactive) {
                        $query->available();
                    }

                    $query->orderBy('display_order')->orderBy('name');
                },
            ])
            ->when(! $includeInactive, fn ($query) => $query->where('is_active', true))
            ->orderBy('display_order')
            ->orderBy('name')
            ->get();

        return MenuCategoryResource::collection($categories)->additional([
            'meta' => [
                'preview' => $includeInactive,
                'generated_at' => now()->toIso8601String(),
            ],
        ]);
    }
}
