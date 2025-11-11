import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start rounded-2xl px-4 py-2 ${
                active
                    ? 'bg-cocoa-900 text-latte-50 shadow-menu-card'
                    : 'text-cocoa-600 hover:bg-white/70 hover:text-cocoa-900'
            } text-base font-semibold transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
