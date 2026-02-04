import { type Template, mario } from '@/core/template';
import { Welcome } from './Welcome';

// Example component function
export function App(): Template {
  return mario({
    as: 'div',
    classes: ['bg-white', 'shadow-lg', 'rounded-lg', 'p-6', 'max-w-sm', 'mx-auto', 'mt-10'],
    slot: mario({
      as: 'div',
      classes: ['space-y-4'],
      slot: [
        mario({
          as: 'h1',
          classes: ['text-2xl', 'font-bold', 'text-gray-800'],
          content: 'Card Title',
        }),
        mario({
          as: 'p',
          classes: ['text-gray-600'],
          content: 'This is a simple card component created using the mario system.',
        }),
        Welcome,
      ],
    }),
  });
}
