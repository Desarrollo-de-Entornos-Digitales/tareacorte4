import { NextResponse } from 'next/server';
import { routinesStore } from '@/features/routines/store';
import type { RoutineInput } from '@/features/routines/types';
import { validateRoutine } from '@/features/routines/validation';

export async function GET() {
    return NextResponse.json(routinesStore.list());
}

export async function POST(request: Request) {
    const body = await request.json().catch(() => null);

    const input: RoutineInput = {
        name: typeof body?.name === 'string' ? body.name : '',
        description: typeof body?.description === 'string' ? body.description : '',
        level: typeof body?.level === 'string' ? body.level : '',
        exerciseIds: Array.isArray(body?.exerciseIds)
            ? body.exerciseIds.map((id: unknown) => typeof id === 'number' ? id : NaN)
            : [],
    };

    const errors = validateRoutine(input);

    if (Object.keys(errors).length > 0) {
        return NextResponse.json({ errors }, { status: 400 });
    }

    const routine = routinesStore.create(input);
    return NextResponse.json(routine, { status: 201 });
}