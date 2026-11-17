'use client';

import { useEffect, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AuthGuard } from '@/features/auth/components/AuthGuard';
import { authService } from '@/features/auth/services/auth.service';
import { NotificationBell } from '@/features/notifications/components/NotificationBell';
import { toggleThemeAction } from '@/shared/actions/theme';
import { useSessionStore } from '@/shared/store/session.store';

const LINKS = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/exercises', label: 'Ejercicios' },
    { href: '/routines', label: 'Rutinas' },
];

interface AppLayoutProps {
    children: ReactNode;
    modal: ReactNode;
}

export default function AppLayout({ children, modal }: AppLayoutProps) {
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        useSessionStore.persist.rehydrate();
    }, []);

    function handleLogout() {
        authService.logout();
        router.replace('/login');
    }

    return (
        <AuthGuard>
            <div className="min-h-screen bg-base-200">
                <header className="navbar flex-wrap justify-between gap-2 border-b border-base-300 bg-base-100 px-6 shadow-sm">
                    <nav className="flex flex-wrap items-center gap-2">
                        {LINKS.map(({ href, label }) => {
                            const isActive =
                                pathname === href || pathname.startsWith(`${href}/`);

                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    className={`btn btn-ghost btn-sm ${isActive ? 'btn-active font-bold' : ''}`}
                                >
                                    {label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="flex flex-wrap items-center gap-3">
                        <NotificationBell />

                        <form action={toggleThemeAction}>
                            <button type="submit" className="btn btn-ghost btn-sm">
                                Cambiar tema
                            </button>
                        </form>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="btn btn-outline btn-error btn-sm"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </header>

                <main className="mx-auto max-w-4xl p-6">{children}</main>
                {modal}
            </div>
        </AuthGuard>
    );
}