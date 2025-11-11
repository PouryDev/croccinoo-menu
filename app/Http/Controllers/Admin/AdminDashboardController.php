<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\MenuItem;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function index(): Response
    {
        $stats = [
            'categories' => Category::count(),
            'menu_items' => MenuItem::count(),
            'available_items' => MenuItem::available()->count(),
            'featured_items' => MenuItem::where('is_featured', true)->count(),
        ];

        $recentUpdates = MenuItem::query()
            ->with(['category:id,name'])
            ->latest('updated_at')
            ->take(5)
            ->get()
            ->map(fn ($item) => [
                'id' => $item->id,
                'name' => $item->name,
                'category' => $item->category?->name,
                'is_featured' => $item->is_featured,
                'is_available' => $item->is_available,
                'updated_at' => $item->updated_at?->toIso8601String(),
            ]);

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentUpdates' => $recentUpdates,
        ]);
    }
}
