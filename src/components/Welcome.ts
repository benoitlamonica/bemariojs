import { marioState } from '@/core/reactivity';
import { mario } from '@/core/template';

const count = marioState(1);

export const Welcome = () => mario({
  as: 'div',
  classes: ['text-center', 'mt-10'],
  content: `Welcome to MarioJS! Count: ${count.value}`,
  click: () => {
    console.log('Welcome component clicked!');
    count.value++;
  },
});

