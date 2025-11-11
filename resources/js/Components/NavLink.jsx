import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                `inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition duration-150 ease-in-out focus:outline-none ${
                    active
                        ? 'bg-cocoa-900 text-latte-50 shadow-menu-card'
                        : 'text-cocoa-600 hover:bg-white/80 hover:text-cocoa-900'
                } ` + className
            }
        >
            {children}
        </Link>
    );
}
