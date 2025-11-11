import { Head } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

const formatPrice = (value) => `${new Intl.NumberFormat('fa-IR').format(value)} تومان`;

export default function MenuIndex({ categories = [], featured = [] }) {
    const [activeCategorySlug, setActiveCategorySlug] = useState(categories[0]?.slug ?? null);

    const [searchTerm, setSearchTerm] = useState('');
    const normalizedSearch = searchTerm.trim();
    const filteredCategories = useMemo(() => {
        if (!normalizedSearch) {
            return categories;
        }

        const term = normalizedSearch.toLowerCase();

        return categories
            .map((category) => {
                const matchedItems = category.items.filter((item) => {
                    if (normalizedSearch && !item.is_available) {
                        return false;
                    }

                    const haystack = [
                        item.name,
                        ...(item.tags ?? []),
                    ]
                        .filter(Boolean)
                        .join(' ')
                        .toLowerCase();

                    return haystack.includes(term);
                });

                if (matchedItems.length === 0) {
                    return null;
                }

                return {
                    ...category,
                    items: matchedItems,
                };
            })
            .filter(Boolean);
    }, [categories, normalizedSearch]);

    const activeCollection = normalizedSearch ? filteredCategories : categories;

    const activeCategory = useMemo(() => {
        if (!activeCollection.length) {
            return null;
        }

        return (
            activeCollection.find((category) => category.slug === activeCategorySlug) ??
            activeCollection[0]
        );
    }, [activeCollection, activeCategorySlug]);

    useEffect(() => {
        if (!activeCollection.length) {
            return;
        }

        const exists = activeCollection.some((category) => category.slug === activeCategorySlug);

        if (!exists) {
            setActiveCategorySlug(activeCollection[0].slug);
        }
    }, [activeCollection, activeCategorySlug]);

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-transparent pb-32">
            <Head title="منوی کروچینو" />

            <BackgroundAura />

            <header className="relative px-5 pt-16 pb-12 sm:px-6">
                <div className="space-y-6 text-center text-cocoa-900">
                    <motion.h1
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-5xl font-display leading-tight tracking-[0.1em] text-transparent sm:text-6xl"
                        style={{
                            backgroundImage:
                                'linear-gradient(135deg, rgb(126, 80, 42) 0%, rgb(126, 80, 42) 40%, rgb(126, 80, 42) 100%)',
                            WebkitBackgroundClip: 'text',
                        }}
                    >
                        Croccinoo
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="text-sm font-medium text-cocoa-600 sm:text-base"
                    >
                        ترکیب کره‌ی اروپایی و فوم ابری برای لحظه‌های آرامش
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="mx-auto flex max-w-xl items-center rounded-full border border-white/60 bg-white/80 px-4 py-3 text-right shadow-menu-card backdrop-blur"
                    >
                        <svg
                            className="ms-3 h-5 w-5 text-cocoa-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 105.25 5.25a7.5 7.5 0 0011.4 11.4z"
                            />
                        </svg>
                        <label htmlFor="menu-search" className="sr-only">
                            جستجوی منو
                        </label>
                        <input
                            id="menu-search"
                            type="search"
                            className="w-full border-none bg-transparent text-sm text-cocoa-800 placeholder:text-cocoa-400 focus:outline-none focus:ring-0 sm:text-base"
                            placeholder="کروسان بادام، کاپوچینو شکلاتی، برانچ..."
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />
                        {searchTerm && (
                            <button
                                type="button"
                                onClick={() => setSearchTerm('')}
                                className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-cocoa-100 text-cocoa-600 transition hover:bg-cocoa-200 hover:text-cocoa-800 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
                                aria-label="پاک کردن جستجو"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-3.5 w-3.5"
                                >
                                    <path d="M18 6L6 18" />
                                    <path d="M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </motion.div>
                </div>
            </header>

            <main className="relative space-y-12 px-5 sm:px-6">
                {featured.length > 0 && <FeaturedSlider items={featured} />}

                {activeCollection.length > 0 ? (
                    <>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="sticky top-0 z-30 -mx-5 mb-6 bg-transparent px-5 pb-3 backdrop-blur-md sm:-mx-6 sm:px-6"
                        >
                            <nav className="overflow-x-auto no-scrollbar">
                                <ul className="flex gap-3">
                                    {activeCollection.map((category) => (
                                        <li key={category.id}>
                                            <button
                                                type="button"
                                                onClick={() => setActiveCategorySlug(category.slug)}
                                                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                                                    activeCategory?.slug === category.slug
                                                        ? 'bg-cocoa-900 text-latte-50 shadow-menu-card'
                                                        : 'bg-white/80 text-cocoa-600 hover:bg-white'
                                                }`}
                                            >
                                                {category.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </motion.div>

                        <section>
                            <AnimatePresence mode="wait">
                                {activeCategory && (
                                    <motion.div
                                        key={activeCategory.id}
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-5"
                                    >
                                        <div className="rounded-3xl border border-white/50 bg-white/80 p-6 shadow-menu-card">
                                            <h2 className="text-2xl font-display text-cocoa-900">
                                                {activeCategory.name}
                                            </h2>
                                            {activeCategory.description && (
                                                <p className="mt-2 text-sm text-cocoa-600">
                                                    {activeCategory.description}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-4">
                                            {activeCategory.items?.map((item) => (
                                                <MenuItemCard key={item.id} item={item} />
                                            ))}

                                            {!activeCategory.items?.length && (
                                                <div className="rounded-3xl border border-dashed border-cocoa-200 py-12 text-center text-sm text-cocoa-500">
                                                    به زودی آیتم‌های جدید اضافه می‌شود.
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </section>
                    </>
                ) : (
                    <div className="rounded-3xl border border-dashed border-cocoa-200 py-16 text-center text-sm text-cocoa-500">
                        نتیجه‌ای با «{searchTerm}» پیدا نکردیم؛ طعم دیگری را امتحان کنید.
                    </div>
                )}
            </main>
        </div>
    );
}

function BackgroundAura() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -left-10 h-72 w-72 rounded-full bg-latte-200/70 blur-3xl" />
            <div className="absolute -top-32 right-0 h-80 w-80 rounded-full bg-foam-200/50 blur-3xl" />
            <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cocoa-200/30 blur-[140px]" />
        </div>
    );
}

function FeaturedSlider({ items }) {
    return (
        <section>
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-display text-cocoa-900">انتخاب‌های ویژه کروچینو</h2>
                    <p className="text-sm text-cocoa-600">
                        امضای Croccinoo با ترکیب عطر کره و فوم کاپوچینو.
                    </p>
                </div>
            </div>

            <div className="-mx-5 flex gap-4 overflow-x-auto no-scrollbar px-1 pb-2 sm:-mx-6 sm:px-2">
                {items.map((item, index) => (
                    <motion.article
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: index * 0.08 }}
                        className="min-w-[240px] max-w-[260px] flex-1 rounded-3xl border border-white/60 bg-white/80 p-5 shadow-menu-card"
                    >
                        <span className="inline-flex rounded-full bg-latte-200/80 px-3 py-1 text-xs font-semibold text-cocoa-800">
                            {item.category?.name ?? 'ویژه'}
                        </span>
                        <h3 className="mt-3 text-lg font-semibold text-cocoa-900">{item.name}</h3>
                        {item.subtitle && (
                            <p className="text-sm text-cocoa-600">{item.subtitle}</p>
                        )}
                        <p className="mt-4 text-sm text-cocoa-700">{item.formatted_price}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {item.tags?.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-cocoa-600"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </motion.article>
                ))}
            </div>
        </section>
    );
}

function MenuItemCard({ item }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.35 }}
            className="menu-card p-4"
        >
            <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                        <h3 className="text-base font-semibold text-cocoa-900 sm:text-lg">{item.name}</h3>
                        {item.subtitle && (
                            <p className="text-sm text-cocoa-600 sm:text-base">{item.subtitle}</p>
                        )}
                    </div>
                    <div className="flex min-w-[84px] flex-col items-end text-right">
                        <span className="whitespace-nowrap rounded-full bg-white/85 px-3 py-1 text-sm font-semibold text-cocoa-900 shadow-inner">
                            {formatPrice(item.price)}
                        </span>
                    </div>
                </div>

                {item.description && (
                    <p className="text-sm leading-relaxed text-cocoa-700 sm:text-base">
                        {item.description}
                    </p>
                )}

                {item.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-cocoa-600"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </motion.article>
    );
}

