'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function toggleThemeAction(): Promise<void> {
    const cookieStore = await cookies();
    const currentTheme = cookieStore.get('theme')?.value;
    const nextTheme = currentTheme === 'icesi-dark' ? 'icesi' : 'icesi-dark';

    cookieStore.set('theme', nextTheme, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        sameSite: 'lax',
        httpOnly: true,
    });

    revalidatePath('/', 'layout');
}