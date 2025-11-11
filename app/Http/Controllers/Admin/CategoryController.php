<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Http\Resources\MenuCategoryResource;
use App\Models\Category;
use App\Models\MenuItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function index(): Response
    {
        $categories = Category::query()
            ->with([
                'items' => fn ($query) => $query->orderBy('display_order')->orderBy('name'),
            ])
            ->orderBy('display_order')
            ->orderBy('name')
            ->get();

        $stats = [
            'total_categories' => $categories->count(),
            'total_items' => MenuItem::count(),
            'available_items' => MenuItem::available()->count(),
        ];

        $activeCategoryId = (int) request()->integer('category') ?: $categories->first()?->id;

        return Inertia::render('Admin/Menu/Index', [
            'categories' => MenuCategoryResource::collection($categories)->resolve(),
            'stats' => $stats,
            'activeCategoryId' => $activeCategoryId,
        ]);
    }

    public function store(CategoryRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $validated['slug'] = $validated['slug'] ?? Str::slug($validated['name']);
        $validated['display_order'] ??= (Category::max('display_order') ?? 0) + 1;
        $validated['is_active'] = $validated['is_active'] ?? true;

        Category::create($validated);

        return redirect()
            ->route('admin.menu.index')
            ->with('flash.banner', 'دسته‌بندی با موفقیت ایجاد شد.');
    }

    public function update(CategoryRequest $request, Category $category): RedirectResponse
    {
        $validated = $request->validated();

        if (blank($validated['slug'] ?? null)) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $category->update($validated);

        return redirect()
            ->route('admin.menu.index')
            ->with('flash.banner', 'تغییرات دسته‌بندی ذخیره شد.');
    }

    public function destroy(Category $category): RedirectResponse
    {
        if ($category->items()->exists()) {
            $category->items()->delete();
        }

        $category->delete();

        return redirect()
            ->route('admin.menu.index')
            ->with('flash.banner', 'دسته‌بندی حذف شد.');
    }
}
