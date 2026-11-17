import type { MetadataRoute } from 'next';
import { EXERCISES } from '@/features/exercises/data';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: new URL('/exercises', siteUrl).href,
            changeFrequency: 'weekly',
            priority: 1,
        },
        ...EXERCISES.map((exercise) => ({
            url: new URL(`/exercises/${exercise.id}`, siteUrl).href,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        })),
    ];
}