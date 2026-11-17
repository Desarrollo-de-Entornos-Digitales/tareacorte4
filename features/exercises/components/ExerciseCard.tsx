import Image from 'next/image';
import Link from 'next/link';
import { CATEGORIES, type Exercise } from '../types';

interface Props {
    exercise: Exercise;
    priority?: boolean;
}

export function ExerciseCard({ exercise, priority = false }: Props) {
    const category = CATEGORIES.find((item) => item.value === exercise.category);

    return (
        <Link
            href={`/exercises/${exercise.id}`}
            className="card h-full bg-base-100 shadow-sm transition-shadow hover:shadow-md"
        >
            <figure className="relative aspect-[4/3]">
                <Image
                    src={exercise.image}
                    alt={exercise.name}
                    fill
                    sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                    preload={priority}
                />
            </figure>

            <div className="card-body gap-1 p-4">
                <h2 className="card-title text-base">{exercise.name}</h2>
                <p className="text-sm opacity-70">{exercise.muscle}</p>
                <div className="mt-1 flex items-center gap-2">
                    <span className="badge badge-secondary badge-sm">
                        {category?.label}
                    </span>
                    <span className="text-xs opacity-70">
                        {exercise.durationMin} min
                    </span>
                </div>
            </div>
        </Link>
    );
}