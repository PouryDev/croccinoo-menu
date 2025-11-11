<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\MenuItemRequest;
use App\Models\Category;
use App\Models\MenuItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;

class MenuItemController extends Controller
{
    public function store(Category $category, MenuItemRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $validated['category_id'] = $category->id;
        $validated['slug'] = $validated['slug']
            ?? Str::slug($validated['name'] . '-' . now()->format('His'));
        $validated['currency'] = $validated['currency'] ?? 'تومان';
        $validated['display_order'] = $validated['display_order']
            ?? (MenuItem::where('category_id', $category->id)->max('display_order') ?? 0) + 1;

        MenuItem::create($validated);

        return redirect()
            ->route('admin.menu.index', ['category' => $category->id])
            ->with('flash.banner', 'محصول جدید به منو اضافه شد.');
    }

    public function update(MenuItemRequest $request, MenuItem $menuItem): RedirectResponse
    {
        $validated = $request->validated();

        if (blank($validated['slug'] ?? null)) {
            $validated['slug'] = Str::slug($validated['name'] . '-' . $menuItem->id);
        }

        if (! array_key_exists('display_order', $validated) || $validated['display_order'] === null) {
            $validated['display_order'] = $menuItem->display_order ?? 0;
        }

        $validated['currency'] = $validated['currency'] ?? 'تومان';

        $menuItem->update($validated);

        return redirect()
            ->route('admin.menu.index', ['category' => $menuItem->category_id])
            ->with('flash.banner', 'تغییرات آیتم ذخیره شد.');
    }

    public function destroy(MenuItem $menuItem): RedirectResponse
    {
        $menuItem->delete();

        return redirect()
            ->route('admin.menu.index', ['category' => $menuItem->category_id])
            ->with('flash.banner', 'آیتم از منو حذف شد.');
    }

    public function toggleAvailability(MenuItem $menuItem): RedirectResponse
    {
        $menuItem->update([
            'is_available' => ! $menuItem->is_available,
        ]);

        return redirect()
            ->route('admin.menu.index', ['category' => $menuItem->category_id])
            ->with('flash.banner', 'وضعیت سرویس آیتم به‌روزرسانی شد.');
    }
}
