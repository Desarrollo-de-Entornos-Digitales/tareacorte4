'use client';

import { useOptimistic, useTransition } from 'react';
import type { Exercise } from '@/features/exercises/types';
import { toggleDoneAction } from '../actions';

interface Props {
    routineId: number;
    exercises: Exercise[];
    doneIds: number[];
}

export function ExerciseChecklist({ routineId, exercises, doneIds }: Props) {
    const [isPending, startTransition] = useTransition();
    const [optimisticDone, toggleOptimistic] = useOptimistic(
        doneIds,
        (current: number[], exerciseId: number) =>
            current.includes(exerciseId)
                ? current.filter((id) => id !== exerciseId)
                : [...current, exerciseId],
    );

    function handleToggle(exerciseId: number) {
        startTransition(async () => {
            toggleOptimistic(exerciseId);
            await toggleDoneAction(routineId, exerciseId);
        });
    }

    return (
        <div className="flex flex-col gap-3">
            <progress
                className="progress progress-primary"
                value={optimisticDone.length}
                max={exercises.length}
                aria-label="Progreso de la rutina"
            />

            <p className="text-sm opacity-70" aria-live="polite">
                {optimisticDone.length} de {exercises.length} ejercicios hechos
            </p>

            <ul className="flex flex-col gap-2">
                {exercises.map((exercise) => {
                    const isDone = optimisticDone.includes(exercise.id);

                    return (
                        <li key={exercise.id}>
                            <label className="flex items-center gap-3 rounded-box bg-base-100 p-3 shadow-sm">
                                <input
                                    type="checkbox"
                                    checked={isDone}
                                    disabled={isPending}
                                    onChange={() => handleToggle(exercise.id)}
                                    className="checkbox checkbox-primary"
                                />
                                <span className={isDone ? 'line-through opacity-60' : ''}>
                                    {exercise.name}
                                </span>
                                <span className="ml-auto text-xs opacity-60">
                                    {exercise.durationMin} min
                                </span>
                            </label>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}