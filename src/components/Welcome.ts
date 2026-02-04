import { marioState } from '@/core/reactivity';
import { mario } from '@/core/template';

const count = marioState(1);

export const Welcome = () => mario({
  as: 'div',
  classes: ['text-center'],
  slot: mario({
    as: 'button',
    classes: ['mt-4', 'px-4', 'py-2', 'bg-blue-500', 'text-white', 'rounded-sm'],
    content: `Increment Count: ${count.value}`,
    click: () => {
      count.value += 1;
    },
  }),
});

