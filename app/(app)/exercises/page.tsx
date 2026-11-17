import { Suspense } from 'react';
import { ExerciseFilters } from '@/features/exercises/components/ExerciseFilters';
import { ExerciseGrid } from '@/features/exercises/components/ExerciseGrid';
import { ExerciseGridSkeleton } from '@/features/exercises/components/ExerciseGridSkeleton';

export const metadata = { title: 'Ejercicios' };

interface PageProps {
    searchParams: Promise<{
        q?: string | string[];
        category?: string | string[];
    }>;
}

export default async function ExercisesPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const q = Array.isArray(params.q) ? params.q[0] : params.q;
    const category = Array.isArray(params.category)
        ? params.category[0]
        : params.category;

    return (
        <div className="flex flex-col gap-6">
            <header>
                <h1 className="text-2xl font-bold">Ejercicios</h1>
                <p className="text-sm opacity-70">
                    Elige un ejercicio para ver cómo se hace.
                </p>
            </header>

            <Suspense>
                <ExerciseFilters />
            </Suspense>

            <Suspense
                key={JSON.stringify([q, category])}
                fallback={<ExerciseGridSkeleton />}
            >
                <ExerciseGrid q={q} category={category} />
            </Suspense>
        </div>
    );
}