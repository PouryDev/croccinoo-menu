import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, router } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';

const initialCategoryForm = {
    name: '',
    description: '',
    hero_image_url: '',
    is_active: true,
    display_order: '',
    slug: '',
};

const initialItemForm = {
    name: '',
    subtitle: '',
    description: '',
    price: '',
    currency: 'تومان',
    is_available: true,
    is_featured: false,
    image_url: '',
    tags: [],
    display_order: '',
    slug: '',
};

export default function MenuIndex({ auth, categories = [], stats = {}, activeCategoryId = null }) {
    const [selectedCategoryId, setSelectedCategoryId] = useState(
        activeCategoryId || categories[0]?.id || null,
    );
    const [editingCategory, setEditingCategory] = useState(null);
    const [editingItem, setEditingItem] = useState(null);
    const [tagsDraft, setTagsDraft] = useState('');

    const categoryForm = useForm(initialCategoryForm);
    const categoryEditForm = useForm(initialCategoryForm);
    const itemForm = useForm({
        ...initialItemForm,
        category_id: selectedCategoryId,
    });
    const itemEditForm = useForm(initialItemForm);

    const selectedCategory = useMemo(
        () => categories.find((category) => category.id === selectedCategoryId) ?? categories[0],
        [categories, selectedCategoryId],
    );

    useEffect(() => {
        if (!selectedCategory) {
            setSelectedCategoryId(categories[0]?.id ?? null);
        } else {
            itemForm.setData('category_id', selectedCategory.id);
        }
    }, [selectedCategory, categories, itemForm]);

    useEffect(() => {
        if (editingCategory) {
            categoryEditForm.setData({
                name: editingCategory.name ?? '',
                description: editingCategory.description ?? '',
                hero_image_url: editingCategory.hero_image_url ?? '',
                is_active: editingCategory.is_active ?? true,
                display_order: editingCategory.display_order ?? '',
                slug: editingCategory.slug ?? '',
            });
        }
    }, [editingCategory]);

    useEffect(() => {
        if (editingItem) {
            itemEditForm.setData({
                name: editingItem.name ?? '',
                subtitle: editingItem.subtitle ?? '',
                description: editingItem.description ?? '',
                price: editingItem.price ?? '',
                currency: editingItem.currency ?? 'تومان',
                is_available: editingItem.is_available ?? true,
                is_featured: editingItem.is_featured ?? false,
                image_url: editingItem.image_url ?? '',
                tags: editingItem.tags ?? [],
                display_order: editingItem.display_order ?? '',
                slug: editingItem.slug ?? '',
            });
            setTagsDraft((editingItem.tags ?? []).join(', '));
        }
    }, [editingItem]);

    const handleCreateCategory = (event) => {
        event.preventDefault();
        categoryForm.post(route('admin.categories.store', undefined, false), {
            preserveScroll: true,
            onSuccess: () => {
                categoryForm.reset();
            },
        });
    };

    const handleUpdateCategory = (event) => {
        event.preventDefault();
        if (!editingCategory) return;

        categoryEditForm.put(route('admin.categories.update', editingCategory.id, false), {
            preserveScroll: true,
            onSuccess: () => {
                setEditingCategory(null);
            },
        });
    };

    const handleCreateItem = (event) => {
        event.preventDefault();
        if (!selectedCategory) return;

        const tags = tagsDraft
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean);

        itemForm.setData('tags', tags);
        itemForm.post(route('admin.items.store', selectedCategory.id, false), {
            preserveScroll: true,
            onSuccess: () => {
                itemForm.reset();
                setTagsDraft('');
            },
        });
    };

    const handleUpdateItem = (event) => {
        event.preventDefault();
        if (!editingItem) return;

        const tags = tagsDraft
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean);

        itemEditForm.setData('tags', tags);
        itemEditForm.put(route('admin.items.update', editingItem.id, false), {
            preserveScroll: true,
            onSuccess: () => {
                setEditingItem(null);
                setTagsDraft('');
            },
        });
    };

    const toggleAvailability = (item) => {
        router.patch(route('admin.items.toggle', item.id, false), undefined, {
            preserveScroll: true,
        });
    };

    const deleteCategory = (category) => {
        if (
            confirm(
                `حذف "${category.name}" تمام آیتم‌های مرتبط را هم حذف می‌کند. آیا مطمئن هستید؟`,
            )
        ) {
            router.delete(route('admin.categories.destroy', category.id, false), {
                preserveScroll: true,
                onSuccess: () => {
                    if (selectedCategoryId === category.id) {
                        setSelectedCategoryId(categories[0]?.id ?? null);
                    }
                },
            });
        }
    };

    const deleteItem = (item) => {
        if (confirm(`"${item.name}" حذف شود؟`)) {
            router.delete(route('admin.items.destroy', item.id, false), {
                preserveScroll: true,
            });
        }
    };

    const startEditingItem = (item) => {
        setEditingItem(item);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col gap-2 text-cocoa-900">
                    <h2 className="text-2xl font-display sm:text-3xl">مدیریت منوی کروچینو</h2>
                    <p className="text-sm text-cocoa-600 sm:text-base">
                        دسته‌بندی‌ها را سازماندهی کنید، آیتم‌های جدید بسازید و قیمت‌ها را به‌روز نگه
                        دارید.
                    </p>
                </div>
            }
        >
            <Head title="مدیریت منو" />

            <div className="space-y-8">
                <section className="grid gap-4 sm:grid-cols-3">
                    <StatCard
                        title="دسته‌بندی‌ها"
                        value={stats.total_categories ?? 0}
                        description="سفارش‌سازی مجموعه نوشیدنی و خوراکی"
                    />
                    <StatCard
                        title="آیتم‌های منو"
                        value={stats.total_items ?? 0}
                        description="عطر کروسان و کاپوچینو در یک نگاه"
                    />
                    <StatCard
                        title="قابل سرو"
                        value={stats.available_items ?? 0}
                        description="آیتم‌هایی که همین حالا آماده سرو هستند"
                    />
                </section>

                <section className="glass-panel p-6">
                    <h3 className="text-lg font-semibold text-cocoa-900 sm:text-xl">اضافه کردن دسته‌بندی جدید</h3>
                    <p className="text-sm text-cocoa-600">
                        برای مجموعه‌ جدیدی از طعم‌ها آماده‌اید؟ این فرم را پر کنید و دسته‌بندی را بسازید.
                    </p>

                    <form onSubmit={handleCreateCategory} className="mt-4 grid gap-4 md:grid-cols-2">
                        <div className="md:col-span-1">
                            <InputLabel htmlFor="category-name" value="عنوان" />
                            <TextInput
                                id="category-name"
                                value={categoryForm.data.name}
                                onChange={(event) => categoryForm.setData('name', event.target.value)}
                                placeholder="مثلاً: کروسان‌های ویژه"
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={categoryForm.errors.name} className="mt-2" />
                        </div>
                        <div className="md:col-span-1">
                            <InputLabel htmlFor="category-slug" value="اسلاگ (اختیاری)" />
                            <TextInput
                                id="category-slug"
                                value={categoryForm.data.slug}
                                onChange={(event) => categoryForm.setData('slug', event.target.value)}
                                placeholder="signature-croissants"
                                className="mt-1 block w-full"
                            />
                            <InputError message={categoryForm.errors.slug} className="mt-2" />
                        </div>
                        <div className="md:col-span-2">
                            <InputLabel htmlFor="category-description" value="توضیحات" />
                            <textarea
                                id="category-description"
                                value={categoryForm.data.description}
                                onChange={(event) =>
                                    categoryForm.setData('description', event.target.value)
                                }
                                placeholder="توضیح کوتاه درباره آنچه این دسته‌بندی را خاص می‌کند."
                                className="mt-1 w-full rounded-2xl border border-cocoa-200/60 bg-white/80 px-4 py-3 text-sm shadow-inner focus:border-cocoa-400 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
                                rows={3}
                            />
                            <InputError message={categoryForm.errors.description} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="category-hero" value="تصویر شاخص (اختیاری)" />
                            <TextInput
                                id="category-hero"
                                value={categoryForm.data.hero_image_url}
                                onChange={(event) =>
                                    categoryForm.setData('hero_image_url', event.target.value)
                                }
                                placeholder="https://..."
                                className="mt-1 block w-full"
                            />
                            <InputError message={categoryForm.errors.hero_image_url} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="category-order" value="ترتیب نمایش" />
                            <TextInput
                                id="category-order"
                                value={categoryForm.data.display_order}
                                onChange={(event) =>
                                    categoryForm.setData('display_order', event.target.value)
                                }
                                placeholder="مثلاً 1"
                                className="mt-1 block w-full"
                                type="number"
                                min="0"
                            />
                            <InputError message={categoryForm.errors.display_order} className="mt-2" />
                        </div>
                        <div className="md:col-span-2 flex justify-end gap-3">
                            <SecondaryButton type="button" onClick={() => categoryForm.reset()}>
                                پاک کردن
                            </SecondaryButton>
                            <PrimaryButton disabled={categoryForm.processing}>
                                {categoryForm.processing ? 'در حال ذخیره...' : 'ساخت دسته‌بندی'}
                            </PrimaryButton>
                        </div>
                    </form>
                </section>

        <section className="glass-panel p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h3 className="text-lg font-semibold text-cocoa-900 sm:text-xl">دسته‌بندی‌ها</h3>
                            <p className="text-sm text-cocoa-600">
                                یک دسته را انتخاب کنید تا آیتم‌های آن را مدیریت کنید.
                            </p>
                        </div>
                        <div className="floating-tabbar">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    type="button"
                                    onClick={() => setSelectedCategoryId(category.id)}
                                    className={`rounded-full px-3 py-1.5 text-sm transition ${
                                        selectedCategoryId === category.id
                                            ? 'bg-cocoa-900 text-latte-50 shadow-menu-card'
                                            : 'text-cocoa-600 hover:bg-white/70'
                                    }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {selectedCategory ? (
                        <div className="mt-6 space-y-6">
                            <CategoryHeader
                                category={selectedCategory}
                                onEdit={() => setEditingCategory(selectedCategory)}
                                onDelete={() => deleteCategory(selectedCategory)}
                            />

                            <div className="rounded-3xl border border-white/60 bg-white/70 p-5 shadow-menu-card">
                                <h4 className="text-base font-semibold text-cocoa-900 sm:text-lg">
                                    افزودن آیتم به {selectedCategory.name}
                                </h4>
                                <form onSubmit={handleCreateItem} className="mt-4 grid gap-4 md:grid-cols-2">
                                    <div>
                                        <InputLabel htmlFor="item-name" value="عنوان" />
                                        <TextInput
                                            id="item-name"
                                            value={itemForm.data.name}
                                            onChange={(event) =>
                                                itemForm.setData('name', event.target.value)
                                            }
                                            placeholder="مثلاً: Croccinoo Classic"
                                            className="mt-1 block w-full"
                                            required
                                        />
                                        <InputError message={itemForm.errors.name} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="item-subtitle" value="زیرعنوان" />
                                        <TextInput
                                            id="item-subtitle"
                                            value={itemForm.data.subtitle}
                                            onChange={(event) =>
                                                itemForm.setData('subtitle', event.target.value)
                                            }
                                            placeholder="توضیح کوتاه جذاب"
                                            className="mt-1 block w-full"
                                        />
                                        <InputError message={itemForm.errors.subtitle} className="mt-2" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <InputLabel htmlFor="item-description" value="توضیحات" />
                                        <textarea
                                            id="item-description"
                                            value={itemForm.data.description}
                                            onChange={(event) =>
                                                itemForm.setData('description', event.target.value)
                                            }
                                            placeholder="مواد، حس و طعم و هرآنچه مشتری باید بداند."
                                            className="mt-1 w-full rounded-2xl border border-cocoa-200/60 bg-white/80 px-4 py-3 text-sm shadow-inner focus:border-cocoa-400 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
                                            rows={3}
                                        />
                                        <InputError
                                            message={itemForm.errors.description}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="item-price" value="قیمت" />
                                        <TextInput
                                            id="item-price"
                                            type="number"
                                            min="0"
                                            value={itemForm.data.price}
                                            onChange={(event) => itemForm.setData('price', event.target.value)}
                                            placeholder="مثلاً 145000"
                                            className="mt-1 block w-full"
                                            required
                                        />
                                        <InputError message={itemForm.errors.price} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="item-currency" value="واحد قیمت" />
                                        <TextInput
                                            id="item-currency"
                                            value={itemForm.data.currency}
                                            onChange={(event) =>
                                                itemForm.setData('currency', event.target.value)
                                            }
                                            placeholder="تومان"
                                            className="mt-1 block w-full"
                                            required
                                        />
                                        <InputError message={itemForm.errors.currency} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="item-image" value="تصویر (اختیاری)" />
                                        <TextInput
                                            id="item-image"
                                            value={itemForm.data.image_url}
                                            onChange={(event) =>
                                                itemForm.setData('image_url', event.target.value)
                                            }
                                            placeholder="https://..."
                                            className="mt-1 block w-full"
                                        />
                                        <InputError message={itemForm.errors.image_url} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="item-tags" value="تگ‌ها" />
                                        <TextInput
                                            id="item-tags"
                                            value={tagsDraft}
                                            onChange={(event) => setTagsDraft(event.target.value)}
                                            placeholder="با کاما جدا کنید: croissant, sweet"
                                            className="mt-1 block w-full"
                                        />
                                        <InputError message={itemForm.errors.tags} className="mt-2" />
                                    </div>
                                    <div>
                                        <label className="flex items-center gap-2 text-sm text-cocoa-700">
                                            <input
                                                type="checkbox"
                                                checked={itemForm.data.is_available}
                                                onChange={(event) =>
                                                    itemForm.setData('is_available', event.target.checked)
                                                }
                                                className="h-4 w-4 rounded border-cocoa-300 text-cocoa-800 focus:ring-cocoa-400"
                                            />
                                            قابل سرو
                                        </label>
                                        <label className="mt-3 flex items-center gap-2 text-sm text-cocoa-700">
                                            <input
                                                type="checkbox"
                                                checked={itemForm.data.is_featured}
                                                onChange={(event) =>
                                                    itemForm.setData('is_featured', event.target.checked)
                                                }
                                                className="h-4 w-4 rounded border-cocoa-300 text-cocoa-800 focus:ring-cocoa-400"
                                            />
                                            آیتم ویژه
                                        </label>
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="item-order" value="ترتیب نمایش" />
                                        <TextInput
                                            id="item-order"
                                            value={itemForm.data.display_order}
                                            onChange={(event) =>
                                                itemForm.setData('display_order', event.target.value)
                                            }
                                            placeholder="مثلاً 1"
                                            className="mt-1 block w-full"
                                            type="number"
                                            min="0"
                                        />
                                        <InputError message={itemForm.errors.display_order} className="mt-2" />
                                    </div>
                                    <div className="md:col-span-2 flex justify-end gap-3">
                                        <SecondaryButton type="button" onClick={() => itemForm.reset()}>
                                            پاک کردن
                                        </SecondaryButton>
                                        <PrimaryButton disabled={itemForm.processing}>
                                            {itemForm.processing ? 'در حال افزودن...' : 'افزودن آیتم'}
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>

                            <div className="space-y-4">
                                {selectedCategory.items?.length ? (
                                    selectedCategory.items.map((item) => (
                                        <MenuItemCard
                                            key={item.id}
                                            item={item}
                                            onToggleAvailability={() => toggleAvailability(item)}
                                            onEdit={() => startEditingItem(item)}
                                            onDelete={() => deleteItem(item)}
                                        />
                                    ))
                                ) : (
                                    <div className="rounded-3xl border border-dashed border-cocoa-200 py-12 text-center text-sm text-cocoa-600">
                                        هنوز آیتمی اضافه نکرده‌اید. از فرم بالا استفاده کنید.
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="mt-6 rounded-3xl border border-dashed border-cocoa-200 py-12 text-center text-sm text-cocoa-600">
                            دسته‌ای برای نمایش وجود ندارد.
                        </div>
                    )}
                </section>
            </div>

            {editingCategory && (
                <Dialog onClose={() => setEditingCategory(null)}>
                    <form onSubmit={handleUpdateCategory} className="space-y-4">
                        <h3 className="text-xl font-semibold text-cocoa-900">ویرایش دسته‌بندی</h3>

                        <div>
                            <InputLabel htmlFor="edit-category-name" value="عنوان" />
                            <TextInput
                                id="edit-category-name"
                                value={categoryEditForm.data.name}
                                onChange={(event) =>
                                    categoryEditForm.setData('name', event.target.value)
                                }
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={categoryEditForm.errors.name} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="edit-category-slug" value="اسلاگ" />
                            <TextInput
                                id="edit-category-slug"
                                value={categoryEditForm.data.slug}
                                onChange={(event) =>
                                    categoryEditForm.setData('slug', event.target.value)
                                }
                                className="mt-1 block w-full"
                            />
                            <InputError message={categoryEditForm.errors.slug} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="edit-category-description" value="توضیحات" />
                            <textarea
                                id="edit-category-description"
                                value={categoryEditForm.data.description}
                                onChange={(event) =>
                                    categoryEditForm.setData('description', event.target.value)
                                }
                                className="mt-1 w-full rounded-2xl border border-cocoa-200/60 bg-white/80 px-4 py-3 text-sm shadow-inner focus:border-cocoa-400 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
                                rows={3}
                            />
                            <InputError
                                message={categoryEditForm.errors.description}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="edit-category-hero" value="تصویر شاخص" />
                            <TextInput
                                id="edit-category-hero"
                                value={categoryEditForm.data.hero_image_url}
                                onChange={(event) =>
                                    categoryEditForm.setData('hero_image_url', event.target.value)
                                }
                                className="mt-1 block w-full"
                            />
                            <InputError
                                message={categoryEditForm.errors.hero_image_url}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="edit-category-order" value="ترتیب" />
                            <TextInput
                                id="edit-category-order"
                                type="number"
                                min="0"
                                value={categoryEditForm.data.display_order}
                                onChange={(event) =>
                                    categoryEditForm.setData('display_order', event.target.value)
                                }
                                className="mt-1 block w-full"
                            />
                            <InputError
                                message={categoryEditForm.errors.display_order}
                                className="mt-2"
                            />
                        </div>
                        <label className="flex items-center gap-2 text-sm text-cocoa-700">
                            <input
                                type="checkbox"
                                checked={Boolean(categoryEditForm.data.is_active)}
                                onChange={(event) =>
                                    categoryEditForm.setData('is_active', event.target.checked)
                                }
                                className="h-4 w-4 rounded border-cocoa-300 text-cocoa-800 focus:ring-cocoa-400"
                            />
                            فعال برای نمایش
                        </label>

                        <div className="flex justify-end gap-3 pt-2">
                            <SecondaryButton type="button" onClick={() => setEditingCategory(null)}>
                                انصراف
                            </SecondaryButton>
                            <PrimaryButton disabled={categoryEditForm.processing}>
                                ذخیره تغییرات
                            </PrimaryButton>
                        </div>
                    </form>
                </Dialog>
            )}

            {editingItem && (
                <Dialog onClose={() => setEditingItem(null)}>
                    <form onSubmit={handleUpdateItem} className="space-y-4">
                        <h3 className="text-xl font-semibold text-cocoa-900">ویرایش آیتم</h3>
                        <div>
                            <InputLabel htmlFor="edit-item-name" value="عنوان" />
                            <TextInput
                                id="edit-item-name"
                                value={itemEditForm.data.name}
                                onChange={(event) => itemEditForm.setData('name', event.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={itemEditForm.errors.name} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="edit-item-slug" value="اسلاگ" />
                            <TextInput
                                id="edit-item-slug"
                                value={itemEditForm.data.slug}
                                onChange={(event) => itemEditForm.setData('slug', event.target.value)}
                                className="mt-1 block w-full"
                            />
                            <InputError message={itemEditForm.errors.slug} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="edit-item-subtitle" value="زیرعنوان" />
                            <TextInput
                                id="edit-item-subtitle"
                                value={itemEditForm.data.subtitle ?? ''}
                                onChange={(event) =>
                                    itemEditForm.setData('subtitle', event.target.value)
                                }
                                className="mt-1 block w-full"
                            />
                            <InputError message={itemEditForm.errors.subtitle} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="edit-item-description" value="توضیحات" />
                            <textarea
                                id="edit-item-description"
                                value={itemEditForm.data.description ?? ''}
                                onChange={(event) =>
                                    itemEditForm.setData('description', event.target.value)
                                }
                                className="mt-1 w-full rounded-2xl border border-cocoa-200/60 bg-white/80 px-4 py-3 text-sm shadow-inner focus:border-cocoa-400 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
                                rows={3}
                            />
                            <InputError
                                message={itemEditForm.errors.description}
                                className="mt-2"
                            />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <InputLabel htmlFor="edit-item-price" value="قیمت" />
                                <TextInput
                                    id="edit-item-price"
                                    type="number"
                                    min="0"
                                    value={itemEditForm.data.price}
                                    onChange={(event) =>
                                        itemEditForm.setData('price', event.target.value)
                                    }
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={itemEditForm.errors.price} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="edit-item-currency" value="واحد قیمت" />
                                <TextInput
                                    id="edit-item-currency"
                                    value={itemEditForm.data.currency}
                                    onChange={(event) =>
                                        itemEditForm.setData('currency', event.target.value)
                                    }
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={itemEditForm.errors.currency} className="mt-2" />
                            </div>
                        </div>
                        <div>
                            <InputLabel htmlFor="edit-item-image" value="تصویر" />
                            <TextInput
                                id="edit-item-image"
                                value={itemEditForm.data.image_url ?? ''}
                                onChange={(event) =>
                                    itemEditForm.setData('image_url', event.target.value)
                                }
                                className="mt-1 block w-full"
                            />
                            <InputError message={itemEditForm.errors.image_url} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="edit-item-tags" value="تگ‌ها" />
                            <TextInput
                                id="edit-item-tags"
                                value={tagsDraft}
                                onChange={(event) => setTagsDraft(event.target.value)}
                                className="mt-1 block w-full"
                            />
                            <InputError message={itemEditForm.errors.tags} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="edit-item-order" value="ترتیب" />
                            <TextInput
                                id="edit-item-order"
                                type="number"
                                min="0"
                                value={itemEditForm.data.display_order}
                                onChange={(event) =>
                                    itemEditForm.setData('display_order', event.target.value)
                                }
                                className="mt-1 block w-full"
                            />
                            <InputError message={itemEditForm.errors.display_order} className="mt-2" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="flex items-center gap-2 text-sm text-cocoa-700">
                                <input
                                    type="checkbox"
                                    checked={Boolean(itemEditForm.data.is_available)}
                                    onChange={(event) =>
                                        itemEditForm.setData('is_available', event.target.checked)
                                    }
                                    className="h-4 w-4 rounded border-cocoa-300 text-cocoa-800 focus:ring-cocoa-400"
                                />
                                قابل سرو
                            </label>
                            <label className="flex items-center gap-2 text-sm text-cocoa-700">
                                <input
                                    type="checkbox"
                                    checked={Boolean(itemEditForm.data.is_featured)}
                                    onChange={(event) =>
                                        itemEditForm.setData('is_featured', event.target.checked)
                                    }
                                    className="h-4 w-4 rounded border-cocoa-300 text-cocoa-800 focus:ring-cocoa-400"
                                />
                                آیتم ویژه
                            </label>
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                            <SecondaryButton type="button" onClick={() => setEditingItem(null)}>
                                انصراف
                            </SecondaryButton>
                            <PrimaryButton disabled={itemEditForm.processing}>
                                ذخیره آیتم
                            </PrimaryButton>
                        </div>
                    </form>
                </Dialog>
            )}
        </AuthenticatedLayout>
    );
}

function StatCard({ title, value, description }) {
    return (
        <div className="rounded-3xl border border-white/40 bg-white/70 p-5 shadow-menu-card">
            <p className="text-sm text-cocoa-600">{description}</p>
            <p className="mt-3 text-2xl font-display text-cocoa-900 sm:text-3xl">{value}</p>
            <p className="mt-1 text-sm font-semibold text-cocoa-500">{title}</p>
        </div>
    );
}

function CategoryHeader({ category, onEdit, onDelete }) {
    return (
        <div className="rounded-3xl border border-white/60 bg-croissant-gradient p-6 shadow-menu-card">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="text-xl font-display text-cocoa-900 sm:text-2xl">
                            {category.name}
                        </h3>
                        {!category.is_active && (
                            <span className="rounded-full bg-cocoa-200/80 px-3 py-1 text-xs font-semibold text-cocoa-800">
                                غیرفعال
                            </span>
                        )}
                    </div>
                    {category.description && (
                        <p className="mt-2 max-w-2xl text-sm text-cocoa-700">{category.description}</p>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <SecondaryButton type="button" onClick={onEdit}>
                        ویرایش
                    </SecondaryButton>
                    <button
                        type="button"
                        onClick={onDelete}
                        className="rounded-full border border-cocoa-300/70 bg-white/70 px-4 py-2 text-sm font-semibold text-cocoa-600 transition hover:border-cocoa-400 hover:text-cocoa-800"
                    >
                        حذف
                    </button>
                </div>
            </div>
        </div>
    );
}

function MenuItemCard({ item, onToggleAvailability, onEdit, onDelete }) {
    return (
        <div className="menu-card flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 flex-col gap-2">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <h4 className="text-lg font-semibold text-cocoa-900">{item.name}</h4>
                        {item.subtitle && (
                            <p className="text-sm text-cocoa-600">{item.subtitle}</p>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={onToggleAvailability}
                            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                                item.is_available
                                    ? 'bg-foam-100 text-foam-700 hover:bg-foam-200'
                                    : 'bg-cocoa-100 text-cocoa-700 hover:bg-cocoa-200'
                            }`}
                        >
                            {item.is_available ? 'قابل سرو' : 'ناموجود'}
                        </button>
                        {item.is_featured && (
                            <span className="rounded-full bg-latte-200 px-3 py-1 text-xs font-semibold text-cocoa-800">
                                ویژه
                            </span>
                        )}
                    </div>
                </div>

                {item.description && (
                    <p className="max-w-2xl text-sm leading-relaxed text-cocoa-700">{item.description}</p>
                )}

                <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-white/60 px-3 py-1 text-sm font-semibold text-cocoa-900">
                        {new Intl.NumberFormat('fa-IR').format(item.price)} تومان
                    </span>
                    {item.tags?.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-cocoa-600"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3">
                <SecondaryButton type="button" onClick={onEdit}>
                    ویرایش
                </SecondaryButton>
                <button
                    type="button"
                    onClick={onDelete}
                    className="rounded-full border border-cocoa-300/70 bg-white/70 px-4 py-2 text-sm font-semibold text-cocoa-600 transition hover:border-cocoa-400 hover:text-cocoa-800"
                >
                    حذف
                </button>
            </div>
        </div>
    );
}

function Dialog({ children, onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-cocoa-900/30 px-4 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl rounded-3xl border border-white/60 bg-white/95 p-6 shadow-menu-card">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 text-cocoa-500 transition hover:text-cocoa-700"
                >
                    ✕
                </button>
                <div className="mt-2">{children}</div>
            </div>
        </div>
    );
}

