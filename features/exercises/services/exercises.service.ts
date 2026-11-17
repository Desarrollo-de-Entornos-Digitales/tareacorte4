import { EXERCISES } from '../data';
import type { Exercise } from '../types';

export interface ExerciseFilters {
    q?: string;
    category?: string;
}

function delay(ms: number) {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export async function getExercises({
    q,
    category,
}: ExerciseFilters = {}): Promise<Exercise[]> {
    await delay(800);

    const search = q?.trim().toLowerCase();

    return EXERCISES.filter((exercise) => {
        const matchesSearch =
            !search ||
            exercise.name.toLowerCase().includes(search) ||
            exercise.muscle.toLowerCase().includes(search);

        const matchesCategory = !category || exercise.category === category;

        return matchesSearch && matchesCategory;
    });
}

export async function getExerciseById(id: number): Promise<Exercise | null> {
    await delay(300);

    return EXERCISES.find((exercise) => exercise.id === id) ?? null;
}