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
        $firstMenuJson = <<<'JSON'
{
  "menu": {
    "Breakfast": [
      {
        "name": "نیمرو",
        "description": "تخم مرغ تازه، نان تست یا نان سنتی",
        "price": 115000
      },
      {
        "name": "سوسیس و تخم مرغ",
        "description": "تخم مرغ و سوسیس گریل شده، نان تست یا نان سنتی",
        "price": 169000
      },
      {
        "name": "بیکن و تخم مرغ",
        "description": "تخم مرغ نیم‌پز، بیکن، نان تست یا نان سنتی",
        "price": 199000
      },
      {
        "name": "املت اسفناج",
        "description": "تخم مرغ، اسفناج تازه، سیر، پیاز، نان تست یا نان سنتی",
        "price": 199000
      },
      {
        "name": "املت کروچینو",
        "description": "تخم مرغ، بیکن، قارچ، فلفل دلمه، پنیر چدار، نان تست یا نان سنتی",
        "price": 259000
      },
      {
        "name": "املت سوسیس و دیوی",
        "description": "تخم مرغ، سوسیس مخصوص، قارچ، پیاز، نان تست یا نان سنتی",
        "price": 259000
      },
      {
        "name": "املت ایرانی",
        "description": "تخم مرغ، گوجه، پیاز، فلفل، نان سنتی",
        "price": 179000
      },
      {
        "name": "املت زیتون",
        "description": "تخم مرغ، زیتون سبز و سیاه، فلفل دلمه، پیاز، نان تست یا نان سنتی",
        "price": 199000
      },
      {
        "name": "صبحانه انگلیسی",
        "description": "تخم مرغ نیم‌پز، سوسیس، بیکن، لوبیا چیتی، قارچ، گوجه کبابی، نان تست",
        "price": 339000
      },
      {
        "name": "صبحانه پادشاهان کروچینو",
        "description": "املت کروچینو با بیکن دوبل، سوسیس، سیب‌زمینی، نان تست",
        "price": 289000
      },
      {
        "name": "تست نوتلا و موز",
        "description": "نان تست، نوتلا، برش‌های موز تازه",
        "price": 215000
      }
    ],
    "Dessert": [
      { "name": "چیزکیک سن سباستین", "price": 189000 },
      { "name": "کیک سیب", "price": 159000 },
      { "name": "کیک شکلات", "price": 139000 },
      { "name": "کروسان (شکلات - پینات)", "price": 129000 },
      { "name": "کوکی", "price": 69000 }
    ],
    "Drink": [
      { "name": "خیار‌سکنجبین", "price": 189000 },
      { "name": "موهیتو", "price": 181000 },
      { "name": "نوتلا میلک‌شیک", "price": 215000 },
      { "name": "لیموناد", "price": 181000 },
      { "name": "بلو کوراسائو", "price": 199000 },
      { "name": "انبه", "price": 215000 },
      { "name": "پیناکولادا", "price": 181000 },
      { "name": "میکس‌بری", "price": 181000 },
      { "name": "آب پرتقال طبیعی", "price": 211000 },
      { "name": "آب سیب", "price": 117000 },
      { "name": "سودا", "price": 43100 }
    ],
    "Herbal Tea": [
      { "name": "چای سیاه", "description": "چای اصیل ایرانی با عطر طبیعی برگ چای", "price": 139000 },
      { "name": "چای ماسالا", "description": "چای سیاه، شیر، دارچین، هل، زنجبیل، شکر قهوه‌ای", "price": 169000 },
      { "name": "چای سبز", "description": "چای سبز ایرانی، لیمو، عسل", "price": 121000 },
      { "name": "چای ترش", "description": "گل‌چای ترش با عسل و لیمو", "price": 159000 },
      { "name": "چای زنجبیل دارچین", "description": "زنجبیل تازه، چوب دارچین، عسل", "price": 117000 },
      { "name": "چای بابونه", "description": "بابونه خشک، گل گاوزبان، عسل", "price": 111000 },
      { "name": "چای زعفران", "description": "چای سیاه ایرانی دم شده با زعفران", "price": 139000 },
      { "name": "چای سیب و دارچین", "description": "تکه‌های سیب تازه، دارچین، عسل", "price": 149000 },
      { "name": "چای به‌لیمو", "description": "گیاه به‌لیمو خشک‌شده، عسل", "price": 159000 },
      { "name": "دمنوش سرد دوغ و نعناع", "price": 169000 }
    ],
    "Coffee": [
      { "name": "اسپرسو سینگل", "price": 65000 },
      { "name": "اسپرسو دبل", "price": 80000 },
      { "name": "کاپوچینو", "price": 125000 },
      { "name": "کارامل ماکیاتو", "price": 139000 },
      { "name": "آمریکانو (دبل)", "price": 129000 },
      { "name": "کافه لاته", "price": 145000 },
      { "name": "موکا", "price": 155000 },
      { "name": "آفوگاتو", "price": 149000 }
    ],
    "Ice Coffee": [
      { "name": "آیس کارامل ماکیاتو", "price": 139000 },
      { "name": "آیس لاته", "price": 129000 },
      { "name": "آیس آمریکانو (دبل)", "price": 149000 },
      { "name": "آیس موکا", "price": 151000 },
      { "name": "آیس تونیک اسپرسو (دبل)", "price": 161000 }
    ],
    "Ice / Shake": [
      { "name": "شیک شکلات", "price": 239000 },
      { "name": "شیک نوتلا", "price": 259000 },
      { "name": "شیک کارامل", "price": 239000 },
      { "name": "شیک وانیل", "price": 239000 },
      { "name": "شیک نوتلا و بادام‌زمینی", "price": 259000 },
      { "name": "شیک پسته", "price": 319000 },
      { "name": "شیک اوریو", "price": 239000 },
      { "name": "شیک فندق", "price": 259000 }
    ],
    "Hookah": [
      { "name": "دو سیب آلبالو" },
      { "name": "شب‌های مسکو" },
      { "name": "آدامس دارچین" },
      { "name": "پرتقال خامه" },
      { "name": "انبه" },
      { "name": "لئو" }
    ]
  }
}
JSON;

        $secondMenuJson = <<<'JSON'
{
  "menu": {
    "Salad": [
      {
        "name": "سالاد سزار سوخاری (۲ رول)",
        "description": "کاهو، سینه مرغ سوخاری، پنیر پارمزان، کروتون، گوجه، کالبی، سس سزار",
        "price": 399000
      },
      {
        "name": "سالاد سزار سوخاری (۴ رول)",
        "description": "کاهو، سینه مرغ سوخاری، پنیر پارمزان، کروتون، گوجه، کالبی، سس سزار",
        "price": 539000
      },
      {
        "name": "سالاد سزار گریل",
        "description": "کاهو، سینه مرغ گریل شده، پنیر پارمزان، کروتون، گوجه، کالبی، سس سزار",
        "price": 379000
      },
      {
        "name": "سالاد میکس سبز",
        "description": "کاهو، کلم، خیار، گوجه، هویج، ذرت، زیتون، فلفل دلمه، سس سبز",
        "price": 320000
      }
    ],
    "Plates": [
      {
        "name": "بشقاب سوخاری",
        "description": "فیله مرغ سوخاری، پوره سیب‌زمینی، دیپ پنیر، سالاد",
        "price": 499000
      },
      {
        "name": "بشقاب گریل",
        "description": "فیله مرغ گریل شده با سس مخصوص، سبزیجات گریل، سالاد",
        "price": 529000
      },
      {
        "name": "فودپارن",
        "description": "ترکیب فیله مرغ گریل، سیب‌زمینی، سالاد و سس مخصوص",
        "price": 529000
      }
    ],
    "Starters": [
      {
        "name": "فرنج فرایز",
        "description": "سیب‌زمینی سرخ‌شده ساده",
        "price": 339000
      },
      {
        "name": "فرنج فرایز مخصوص",
        "description": "سیب‌زمینی سرخ‌شده با پنیر پیتزا و ژامبون",
        "price": 299000
      },
      {
        "name": "بال مرغ تندوری با سس آلفردو",
        "description": "۶ عدد بال مرغ تند با سس آلفردو",
        "price": 315000
      },
      {
        "name": "بوفالو وینگز",
        "description": "۵ عدد بال مرغ با سس بوفالو",
        "price": 299000
      }
    ],
    "Pizza": [
      {
        "name": "مرغ و پستو",
        "description": "سس پستو، مرغ گریل، قارچ، فلفل دلمه، پنیر، سس خامه‌ای",
        "price": 499000
      },
      {
        "name": "کروچینو",
        "description": "سس قرمز، گوشت چرخ‌کرده، پنیر، فلفل دلمه، قارچ، پیاز، زیتون",
        "price": 489000
      },
      {
        "name": "بیکن",
        "description": "سس قرمز، بیکن گوشت، پنیر، فلفل دلمه، زیتون، قارچ",
        "price": 521000
      },
      {
        "name": "مارگاریتا",
        "description": "سس قرمز، پنیر، گوجه تازه، ریحان",
        "price": 539000
      },
      {
        "name": "پپرونی",
        "description": "سس قرمز، پپرونی، پنیر، زیتون، قارچ",
        "price": 519000
      }
    ],
    "Pasta": [
      {
        "name": "چیکن آلفردو",
        "description": "پاستا با سس آلفردو و فیله مرغ گریل‌شده",
        "price": 389000
      },
      {
        "name": "بیف آلفردو",
        "description": "پاستا با سس آلفردو و گوشت گوساله",
        "price": 449000
      },
      {
        "name": "چیکن پستو",
        "description": "پاستا با سس پستو و مرغ گریل‌شده",
        "price": 415000
      },
      {
        "name": "بیف پستو",
        "description": "پاستا با سس پستو و گوشت گوساله",
        "price": 459000
      },
      {
        "name": "مک اند چیز",
        "description": "پاستا با سس پنیر و ژامبون",
        "price": 349000
      }
    ],
    "Burger": [
      {
        "name": "کلاسیک برگر",
        "description": "۱۵۰ گرم گوشت گوساله، کاهو، گوجه، خیارشور، سس مخصوص",
        "price": 339000
      },
      {
        "name": "چیز برگر",
        "description": "۱۵۰ گرم گوشت گوساله، پنیر چدار، کاهو، گوجه، سس مخصوص",
        "price": 359000
      },
      {
        "name": "مشروم برگر",
        "description": "۱۵۰ گرم گوشت گوساله، قارچ، پنیر چدار، سس مخصوص",
        "price": 369000
      },
      {
        "name": "بیکن برگر",
        "description": "۱۵۰ گرم گوشت گوساله، بیکن، پنیر چدار، سس مخصوص",
        "price": 399000
      }
    ],
    "Panini": [
      {
        "name": "پانینی مرغ پستو",
        "description": "مرغ گریل‌شده، سس پستو، نان ساندویچی",
        "price": 399000
      },
      {
        "name": "پانینی چیز استیک",
        "description": "استیک گوساله، فلفل دلمه، پیاز، پنیر چدار",
        "price": 411000
      },
      {
        "name": "پانینی بیکن",
        "description": "بیکن گوشت، پنیر چدار، سس مخصوص، نان تست",
        "price": 399000
      },
      {
        "name": "پانینی ژامبون",
        "description": "ژامبون مرغ و پنیر گودا، نان تست",
        "price": 299000
      }
    ],
    "Hotdog": [
      {
        "name": "هات‌داگ کلاسیک",
        "description": "هات‌داگ گوشت، کاهو، گوجه، خیارشور، نان",
        "price": 339000
      },
      {
        "name": "هات‌داگ کروچینو",
        "description": "هات‌داگ گوشت، سس قارچ، فلفل دلمه، پنیر پیتزا",
        "price": 359000
      },
      {
        "name": "هات‌داگ بیکن",
        "description": "هات‌داگ گوشت و بیکن، پنیر چدار، نان تست",
        "price": 289000
      }
    ]
  }
}
JSON;

        $menus = [];
        foreach ([$firstMenuJson, $secondMenuJson] as $menuJson) {
            $decoded = json_decode($menuJson, true, 512, JSON_THROW_ON_ERROR);
            foreach ($decoded['menu'] as $categoryName => $items) {
                $menus[] = [
                    'name' => $categoryName,
                    'items' => $items,
                ];
            }
        }

        DB::transaction(function () use ($menus) {
            foreach ($menus as $categoryOrder => $categoryData) {
                $categorySlug = Str::slug($categoryData['name']);
                if (blank($categorySlug)) {
                    $categorySlug = Str::slug('category-' . $categoryOrder . '-' . Str::random(6));
                }

                $category = Category::updateOrCreate(
                    ['slug' => $categorySlug],
                    [
                        'name' => $categoryData['name'],
                        'description' => null,
                        'hero_image_url' => null,
                        'is_active' => true,
                        'display_order' => $categoryOrder,
                    ],
                );

                foreach ($categoryData['items'] as $itemOrder => $itemData) {
                    $slugBase = Str::slug($itemData['name'] . '-' . $category->id);
                    if (blank($slugBase)) {
                        $slugBase = Str::slug($category->slug . '-' . $itemOrder . '-' . Str::random(6));
                    }

                    MenuItem::updateOrCreate(
                        ['slug' => $slugBase],
                        [
                            'category_id' => $category->id,
                            'name' => $itemData['name'],
                            'subtitle' => $itemData['subtitle'] ?? null,
                            'description' => $itemData['description'] ?? null,
                            'price' => $itemData['price'] ?? 0,
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
