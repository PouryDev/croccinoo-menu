import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { withAppUrl } from '@/utils/appUrl';

export default function Dashboard({ auth, stats = {}, recentUpdates = [] }) {
    const statCards = [
        {
            id: 'categories',
            label: 'دسته‌بندی‌ها',
            value: stats.total_categories ?? stats.categories ?? 0,
            accent: 'from-latte-200 via-latte-100 to-white',
        },
        {
            id: 'items',
            label: 'کل آیتم‌ها',
            value: stats.menu_items ?? stats.total_items ?? 0,
            accent: 'from-foam-200/70 via-foam-100/80 to-white',
        },
        {
            id: 'available',
            label: 'قابل سرو',
            value: stats.available_items ?? 0,
            accent: 'from-latte-300/80 via-white to-white',
        },
        {
            id: 'featured',
            label: 'ویژه‌ها',
            value: stats.featured_items ?? 0,
            accent: 'from-cocoa-200/60 via-white to-white',
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col gap-2 text-cocoa-900">
                    <h2 className="text-2xl font-display sm:text-3xl">سلام {auth.user?.name?.split(' ')[0] ?? 'دوست عزیز'} 👋</h2>
                    <p className="text-sm text-cocoa-600 sm:text-base">
                        به پنل مدیریت کروچینو خوش آمدید. منو را تازه کنید، آیتم‌های ویژه را هایلایت کنید و یک تجربه صبحگاهی متفاوت بسازید.
                    </p>
                </div>
            }
        >
            <Head title="داشبورد مدیریت" />

            <div className="space-y-8">
                <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {statCards.map((card) => (
                        <div
                            key={card.id}
                            className={`rounded-3xl border border-white/40 bg-gradient-to-br ${card.accent} p-5 shadow-menu-card`}
                        >
                            <p className="text-sm font-medium text-cocoa-500">{card.label}</p>
                            <p className="mt-3 text-3xl font-display text-cocoa-900 sm:text-4xl">{card.value}</p>
                        </div>
                    ))}
                </section>

                <section className="glass-panel p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h3 className="text-xl font-display text-cocoa-900 sm:text-2xl">به‌روزرسانی‌های اخیر</h3>
                            <p className="text-sm text-cocoa-600">
                                آخرین تغییرات در آیتم‌های منو را در یک نگاه ببینید و سریع واکنش نشان دهید.
                            </p>
                        </div>
                        <Link
                            href={withAppUrl('/admin/menu')}
                            className="inline-flex items-center gap-2 rounded-full bg-cocoa-900 px-4 py-2 text-sm font-semibold text-latte-50 shadow-menu-card transition hover:bg-cocoa-800"
                        >
                            مدیریت منو
                        </Link>
                    </div>

                    <div className="mt-6 space-y-4">
                        {recentUpdates.length === 0 && (
                            <div className="rounded-3xl border border-dashed border-cocoa-200 bg-white/60 px-4 py-12 text-center text-sm text-cocoa-500">
                                هنوز آیتمی ایجاد نشده است. از بخش «مدیریت منو» شروع کنید.
                            </div>
                        )}

                        {recentUpdates.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col gap-3 rounded-3xl border border-white/60 bg-white/80 px-4 py-4 shadow-menu-card/60 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div>
                                    <p className="text-base font-semibold text-cocoa-900">{item.name}</p>
                                    <p className="text-sm text-cocoa-600">{item.category}</p>
                                </div>
                                <div className="flex flex-wrap items-center gap-3">
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                            item.is_available
                                                ? 'bg-foam-100 text-foam-700'
                                                : 'bg-cocoa-100 text-cocoa-700'
                                        }`}
                                    >
                                        {item.is_available ? 'قابل سرو' : 'ناموجود'}
                                    </span>
                                    {item.is_featured && (
                                        <span className="rounded-full bg-latte-200 px-3 py-1 text-xs font-semibold text-cocoa-800">
                                            آیتم ویژه
                                        </span>
                                    )}
                                    <span className="text-xs text-cocoa-500">
                                        {item.updated_at
                                            ? new Intl.DateTimeFormat('fa-IR', {
                                                  dateStyle: 'medium',
                                                  timeStyle: 'short',
                                              }).format(new Date(item.updated_at))
                                            : '—'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}

