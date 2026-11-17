'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { routinesStore } from './store';
import type { RoutineInput } from './types';
import { validateRoutine, type RoutineErrors } from './validation';

interface RoutineFormState {
    errors?: RoutineErrors;
    values?: RoutineInput;
}

export async function createRoutineAction(
    _previousState: RoutineFormState,
    formData: FormData,
): Promise<RoutineFormState> {
    const values: RoutineInput = {
        name: String(formData.get('name') ?? ''),
        description: String(formData.get('description') ?? ''),
        level: String(formData.get('level') ?? ''),
        exerciseIds: formData.getAll('exerciseIds').map(Number),
    };

    const errors = validateRoutine(values);

    if (Object.keys(errors).length > 0) {
        return { errors, values };
    }

    routinesStore.create(values);
    revalidatePath('/routines');
    redirect('/routines');
}

export async function toggleDoneAction(routineId: number, exerciseId: number) {
    await new Promise<void>((resolve) => setTimeout(resolve, 800));

    routinesStore.toggleDone(routineId, exerciseId);
    revalidatePath(`/routines/${routineId}`);
}