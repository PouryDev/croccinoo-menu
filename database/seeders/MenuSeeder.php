<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\MenuItem;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $menu = [
            [
                'name' => 'کروسان‌های امضایی',
                'description' => 'لایه‌های کره‌ای و ترد که هر صبح در کارگاه کروچینو با کره‌ی فرانسوی و پرکننده‌های فصلی آماده می‌شوند.',
                'hero_image_url' => 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1600&q=80',
                'items' => [
                    [
                        'name' => 'کروسان بادام پاریسی',
                        'subtitle' => 'کرم بادام برشته، پوست مرکبات کاراملی',
                        'description' => 'کروسان دولایه با کرم بادام خانگی، پوشیده از شکر کاراملی و پودر پسته.',
                        'price' => 235_000,
                        'tags' => ['کروسان', 'شیرین', 'پرفروش'],
                        'is_featured' => true,
                        'image_url' => 'https://images.unsplash.com/photo-1542838686-73e7d57c09b6?auto=format&fit=crop&w=1200&q=80',
                    ],
                    [
                        'name' => 'کروسان ترافل و قارچ',
                        'subtitle' => 'کرم قارچ جنگلی، لایه پنیر تالجو',
                        'description' => 'طعم لذیذ قارچ‌های کنفی و کرم ترافل سیاه در دل یک کروسان کره‌ای.',
                        'price' => 265_000,
                        'tags' => ['کروسان', 'شور', 'برانچ'],
                        'image_url' => 'https://images.unsplash.com/photo-1589308078055-6f1c684e3391?auto=format&fit=crop&w=1200&q=80',
                    ],
                    [
                        'name' => 'پیچ پسته طلایی',
                        'subtitle' => 'کرم پسته، گلیز گلاب',
                        'description' => 'کروسان پیچ‌خورده با مغز کرم پسته و گلیز گلاب، تزئین شده با پسته برشته.',
                        'price' => 248_000,
                        'tags' => ['کروسان', 'فصلی', 'خاص'],
                        'image_url' => 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=1200&q=80',
                    ],
                ],
            ],
            [
                'name' => 'آتلـیه کاپوچینو',
                'description' => 'اسپرسو تک‌خاستگاه و فوم مخملی شیر که با امضاهای کروچینو ترکیب شده‌اند.',
                'hero_image_url' => 'https://images.unsplash.com/photo-1507914372361-74c1bb9afb0c?auto=format&fit=crop&w=1600&q=80',
                'items' => [
                    [
                        'name' => 'کاپوچینوی کروچینو',
                        'subtitle' => 'بلند اختصاصی کروچینو، فوم مخملی',
                        'description' => 'اسپرسو کاراملی با فوم ابری و پودر وانیل‌کارامل؛ امضای کافه.',
                        'price' => 145_000,
                        'tags' => ['قهوه', 'گرم', 'کلاسیک'],
                        'is_featured' => true,
                        'image_url' => 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80',
                    ],
                    [
                        'name' => 'کاپوچینوی مخمل کاکائو',
                        'subtitle' => 'کاکائو تک‌خاستگاه، نمک دودی',
                        'description' => 'کاکائو تلخ با فوم دودی و کرم نمک؛ تجربه‌ای شکلاتی و متفاوت.',
                        'price' => 158_000,
                        'tags' => ['قهوه', 'شکلاتی', 'ویژه'],
                        'image_url' => 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
                    ],
                    [
                        'name' => 'کولد فوم افرا',
                        'subtitle' => 'کولد برو، فوم خامه افرا',
                        'description' => 'کولد برو ۲۴ ساعته با فوم خامه افرا و عطر دارچین دودی.',
                        'price' => 162_000,
                        'tags' => ['قهوه', 'سرد'],
                        'is_available' => true,
                        'image_url' => 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80',
                    ],
                ],
            ],
            [
                'name' => 'برانچ‌های کروچینو',
                'description' => 'چاشت‌های طولانی با نان‌های کره‌ای، مزه‌های محلی و محصولات فصلی باغ.',
                'hero_image_url' => 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80',
                'items' => [
                    [
                        'name' => 'پلیت پیک‌نیک نیمروز',
                        'subtitle' => 'کروسان مینی، لبنه پنیری، سبزیجات پیکل',
                        'description' => 'پلیت اشتراکی با کروسان‌های مینی، لبنه سبزیجات، انگور ترش و عسل دوددیده.',
                        'price' => 320_000,
                        'tags' => ['برانچ', 'اشتراکی'],
                        'image_url' => 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=1200&q=80',
                    ],
                    [
                        'name' => 'شاکشوکا گوجه آفتاب‌خشک',
                        'subtitle' => 'لبنه سبزیجات، کروسان استیک',
                        'description' => 'گوجه آفتاب‌خشک با فلفل کبابی و تخم‌مرغ نرم، سرو شده با استیک‌های کروسان.',
                        'price' => 298_000,
                        'tags' => ['برانچ', 'شور', 'امضایی'],
                        'image_url' => 'https://images.unsplash.com/photo-1505575967455-40e256f73376?auto=format&fit=crop&w=1200&q=80',
                    ],
                    [
                        'name' => 'پارفه عسل کهربایی',
                        'subtitle' => 'ماست یونانی، گرانولا، کرامبل کروسان',
                        'description' => 'ماست وانیلی با گرانولای بادام برشته و کرامبل کروسان، مزین به عسل زعفرانی.',
                        'price' => 210_000,
                        'tags' => ['برانچ', 'شیرین'],
                        'image_url' => 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80',
                    ],
                ],
            ],
        ];

        DB::transaction(function () use ($menu) {
            foreach ($menu as $categoryOrder => $categoryData) {
                $category = Category::updateOrCreate(
                    ['slug' => Str::slug($categoryData['name'])],
                    [
                        'name' => $categoryData['name'],
                        'description' => $categoryData['description'],
                        'hero_image_url' => $categoryData['hero_image_url'],
                        'is_active' => true,
                        'display_order' => $categoryOrder,
                    ],
                );

                foreach ($categoryData['items'] as $itemOrder => $itemData) {
                    $slug = Str::slug($itemData['name'] . '-' . $category->id);

                    MenuItem::updateOrCreate(
                        ['slug' => $slug],
                        [
                            'category_id' => $category->id,
                            'name' => $itemData['name'],
                            'subtitle' => $itemData['subtitle'] ?? null,
                            'description' => $itemData['description'] ?? null,
                            'price' => $itemData['price'],
                            'currency' => $itemData['currency'] ?? 'تومان',
                            'is_available' => $itemData['is_available'] ?? true,
                            'is_featured' => $itemData['is_featured'] ?? false,
                            'image_url' => $itemData['image_url'] ?? null,
                            'tags' => $itemData['tags'] ?? [],
                            'display_order' => $itemOrder,
                        ],
                    );
                }
            }
        });
    }
}
