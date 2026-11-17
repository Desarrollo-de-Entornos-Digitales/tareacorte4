'use client';

import { useEffect, useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CATEGORIES } from '../types';

export function ExerciseFilters() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const q = searchParams.get('q') ?? '';
    const category = searchParams.get('category') ?? '';

    return (
        <FilterControls
            key={JSON.stringify([q, category])}
            q={q}
            category={category}
            pathname={pathname}
            replace={router.replace}
        />
    );
}

interface FilterControlsProps {
    q: string;
    category: string;
    pathname: string;
    replace: ReturnType<typeof useRouter>['replace'];
}

function FilterControls({ q, category, pathname, replace }: FilterControlsProps) {
    const [search, setSearch] = useState(q);
    const [selected, setSelected] = useState(category);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (search.trim() === q && selected === category) {
            return;
        }

        const timer = window.setTimeout(() => {
            const params = new URLSearchParams();

            if (search.trim()) params.set('q', search.trim());
            if (selected) params.set('category', selected);

            const query = params.toString();
            startTransition(() => {
                replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
            });
        }, 300);

        return () => window.clearTimeout(timer);
    }, [search, q, selected, category, pathname, replace]);

    return (
        <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2">
                <span className="sr-only">Buscar ejercicios</span>
                <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Buscar por nombre o músculo"
                    className="input w-full max-w-sm"
                />
                {isPending && (
                    <span className="loading loading-spinner loading-sm" aria-label="Actualizando filtros" />
                )}
            </label>

            <div className="flex flex-wrap gap-2">
                {[{ value: '', label: 'Todos' }, ...CATEGORIES].map(({ value, label }) => (
                    <button
                        key={value}
                        type="button"
                        aria-pressed={selected === value}
                        className={`btn btn-sm ${selected === value ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => setSelected(value)}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
}