import type { Category, Exercise } from './types';

const colors: Record<Category, string> = {
    fuerza: '5454e9',
    cardio: 'e9683b',
    movilidad: '4cb979',
};

function image(category: Category, name: string) {
    return `https://placehold.co/800x600/${colors[category]}/ffffff/png?text=${encodeURIComponent(name)}`;
}

export const EXERCISES: Exercise[] = [
    {
        id: 1,
        name: 'Sentadilla',
        category: 'fuerza',
        muscle: 'Piernas',
        durationMin: 10,
        description: 'Baja la cadera como si te sentaras, con la espalda recta y las rodillas alineadas con los pies.',
        image: image('fuerza', 'Sentadilla'),
    },
    {
        id: 2,
        name: 'Flexiones',
        category: 'fuerza',
        muscle: 'Pecho y brazos',
        durationMin: 8,
        description: 'Apoya manos y puntas de los pies, baja el pecho al suelo y empuja hasta estirar los brazos.',
        image: image('fuerza', 'Flexiones'),
    },
    {
        id: 3,
        name: 'Plancha',
        category: 'fuerza',
        muscle: 'Abdomen',
        durationMin: 5,
        description: 'Mantén el cuerpo en línea recta apoyado en antebrazos y puntas de los pies.',
        image: image('fuerza', 'Plancha'),
    },
    {
        id: 4,
        name: 'Zancadas',
        category: 'fuerza',
        muscle: 'Piernas y glúteos',
        durationMin: 10,
        description: 'Da un paso largo al frente y baja hasta que ambas rodillas formen un ángulo de 90 grados.',
        image: image('fuerza', 'Zancadas'),
    },
    {
        id: 5,
        name: 'Saltos de tijera',
        category: 'cardio',
        muscle: 'Cuerpo completo',
        durationMin: 6,
        description: 'Salta abriendo piernas y brazos a la vez, y vuelve a la posición inicial.',
        image: image('cardio', 'Saltos de tijera'),
    },
    {
        id: 6,
        name: 'Trote suave',
        category: 'cardio',
        muscle: 'Piernas y corazón',
        durationMin: 20,
        description: 'Mantén un ritmo constante en el que puedas conversar sin quedarte sin aire.',
        image: image('cardio', 'Trote suave'),
    },
    {
        id: 7,
        name: 'Estiramiento de isquiotibiales',
        category: 'movilidad',
        muscle: 'Parte trasera del muslo',
        durationMin: 5,
        description: 'Sentado con una pierna estirada, inclínate hacia el pie sin rebotar.',
        image: image('movilidad', 'Isquiotibiales'),
    },
    {
        id: 8,
        name: 'Postura del gato y la vaca',
        category: 'movilidad',
        muscle: 'Columna',
        durationMin: 5,
        description: 'En cuatro apoyos, alterna entre arquear y redondear la espalda al ritmo de la respiración.',
        image: image('movilidad', 'Gato y vaca'),
    },
];