<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\MenuItem;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminMenuTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_is_redirected_from_admin_routes(): void
    {
        $this->get(route('admin.dashboard'))->assertRedirect(route('login'));
        $this->get(route('admin.menu.index'))->assertRedirect(route('login'));
    }

    public function test_authenticated_user_can_view_admin_menu_index(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get(route('admin.menu.index'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page->component('Admin/Menu/Index'));
    }

    public function test_admin_can_create_category(): void
    {
        $user = User::factory()->create();

        $payload = [
            'name' => 'Seasonal Croissants',
            'description' => 'Limited edition buttery layers with seasonal flavors.',
            'display_order' => 1,
        ];

        $response = $this->actingAs($user)->post(route('admin.categories.store'), $payload);

        $response->assertRedirect(route('admin.menu.index'));

        $this->assertDatabaseHas('categories', [
            'name' => 'Seasonal Croissants',
            'slug' => 'seasonal-croissants',
            'is_active' => true,
        ]);
    }

    public function test_admin_can_update_category(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create([
            'name' => 'Brunch',
            'slug' => 'brunch',
            'display_order' => 3,
        ]);

        $payload = [
            'name' => 'Weekend Brunch',
            'slug' => 'weekend-brunch',
            'description' => 'Lazy mornings with butter and foam.',
            'display_order' => 2,
            'is_active' => false,
        ];

        $response = $this->actingAs($user)->put(route('admin.categories.update', $category), $payload);

        $response->assertRedirect(route('admin.menu.index'));

        $this->assertDatabaseHas('categories', [
            'id' => $category->id,
            'name' => 'Weekend Brunch',
            'slug' => 'weekend-brunch',
            'is_active' => false,
        ]);
    }

    public function test_admin_can_create_menu_item(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();

        $payload = [
            'name' => 'Croccinoo Classic',
            'subtitle' => 'Signature cappuccino foam, espresso core',
            'price' => 155_000,
            'currency' => 'IRR',
            'is_available' => true,
            'is_featured' => true,
            'tags' => ['coffee', 'signature'],
        ];

        $response = $this->actingAs($user)->post(
            route('admin.items.store', $category),
            $payload,
        );

        $response->assertRedirect(route('admin.menu.index', ['category' => $category->id]));

        $this->assertDatabaseHas('menu_items', [
            'name' => 'Croccinoo Classic',
            'category_id' => $category->id,
            'is_featured' => true,
            'is_available' => true,
        ]);
    }

    public function test_admin_can_update_menu_item_and_toggle_availability(): void
    {
        $user = User::factory()->create();
        $menuItem = MenuItem::factory()->create([
            'is_available' => true,
            'is_featured' => false,
        ]);

        $updatePayload = [
            'name' => 'Almond Cloud Cappuccino',
            'price' => 178_000,
            'currency' => 'IRR',
            'is_available' => true,
            'is_featured' => true,
            'tags' => ['coffee', 'almond'],
        ];

        $response = $this->actingAs($user)->put(
            route('admin.items.update', $menuItem),
            $updatePayload,
        );

        $response->assertRedirect(route('admin.menu.index', ['category' => $menuItem->category_id]));

        $this->assertDatabaseHas('menu_items', [
            'id' => $menuItem->id,
            'name' => 'Almond Cloud Cappuccino',
            'is_featured' => true,
        ]);

        $toggleResponse = $this->actingAs($user)->patch(
            route('admin.items.toggle', $menuItem),
        );

        $toggleResponse->assertRedirect(route('admin.menu.index', ['category' => $menuItem->category_id]));

        $this->assertDatabaseHas('menu_items', [
            'id' => $menuItem->id,
            'is_available' => false,
        ]);
    }

    public function test_admin_can_delete_category_and_items(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()
            ->has(MenuItem::factory()->count(2), 'items')
            ->create();

        $response = $this->actingAs($user)->delete(route('admin.categories.destroy', $category));

        $response->assertRedirect(route('admin.menu.index'));

        $this->assertSoftDeleted('categories', ['id' => $category->id]);
        $category->items->each(fn ($item) => $this->assertSoftDeleted('menu_items', ['id' => $item->id]));
    }
}

