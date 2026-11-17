'use client';

import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

export function Modal({ children }: { children: ReactNode }) {
    const router = useRouter();

    return (
        <div
            className="modal modal-open"
            role="dialog"
            aria-modal="true"
            aria-label="Detalle del ejercicio"
        >
            <div className="modal-box max-w-2xl">
                <button
                    type="button"
                    className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2 z-10"
                    aria-label="Cerrar"
                    onClick={() => router.back()}
                >
                    ✕
                </button>
                {children}
            </div>

            <div className="modal-backdrop">
                <button type="button" onClick={() => router.back()}>
                    Cerrar
                </button>
            </div>
        </div>
    );
}