'use client';

import { useActionState } from 'react';
import type { Exercise } from '@/features/exercises/types';
import { createRoutineAction } from '../actions';
import { LEVELS } from '../types';

export function RoutineForm({ exercises }: { exercises: Exercise[] }) {
    const [state, formAction, isPending] = useActionState(createRoutineAction, {});
    const { errors, values } = state;

    return (
        <form action={formAction} className="flex flex-col gap-4">
            <div>
                <label htmlFor="routine-name" className="mb-1 block font-medium">
                    Nombre de la rutina
                </label>
                <input
                    id="routine-name"
                    name="name"
                    defaultValue={values?.name}
                    aria-invalid={Boolean(errors?.name)}
                    className="input w-full"
                />
                {errors?.name && (
                    <p className="mt-1 text-sm text-error">{errors.name}</p>
                )}
            </div>

            <div>
                <label htmlFor="routine-description" className="mb-1 block font-medium">
                    Descripción (opcional)
                </label>
                <textarea
                    id="routine-description"
                    name="description"
                    defaultValue={values?.description}
                    className="textarea w-full"
                />
            </div>

            <div>
                <label htmlFor="routine-level" className="mb-1 block font-medium">
                    Nivel
                </label>
                <select
                    id="routine-level"
                    name="level"
                    defaultValue={values?.level ?? ''}
                    aria-invalid={Boolean(errors?.level)}
                    className="select w-full"
                >
                    <option value="">Elige un nivel</option>
                    {LEVELS.map(({ value, label }) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </select>
                {errors?.level && (
                    <p className="mt-1 text-sm text-error">{errors.level}</p>
                )}
            </div>

            <fieldset>
                <legend className="mb-2 font-medium">Ejercicios</legend>

                <div className="grid gap-2 sm:grid-cols-2">
                    {exercises.map((exercise) => (
                        <label
                            key={exercise.id}
                            className="flex cursor-pointer items-center gap-2 rounded-box bg-base-100 p-3"
                        >
                            <input
                                type="checkbox"
                                name="exerciseIds"
                                value={exercise.id}
                                defaultChecked={values?.exerciseIds.includes(exercise.id)}
                                className="checkbox checkbox-primary checkbox-sm"
                            />
                            {exercise.name}
                        </label>
                    ))}
                </div>

                {errors?.exerciseIds && (
                    <p className="mt-1 text-sm text-error">{errors.exerciseIds}</p>
                )}
            </fieldset>

            <button type="submit" disabled={isPending} className="btn btn-primary w-fit">
                {isPending ? 'Guardando...' : 'Guardar rutina'}
            </button>
        </form>
    );
}