export type MarioState<T> = { value: T };

const subscribers = new Set<() => void>();

function marioState<T>(initialValue: T): MarioState<T> {
  let internalValue = initialValue;
  const stateSubscribers: Set<(newValue: T) => void> = new Set();

  const state = new Proxy({ value: initialValue }, {
    get(target, prop) {
      if (prop === 'value') {
        return internalValue;
      }
      return target[prop as keyof typeof target];
    },
    set(target, prop, newValue) {
      if (prop === 'value' && newValue !== internalValue) {
        internalValue = newValue;
        target.value = newValue;
        stateSubscribers.forEach((callback) => callback(newValue));
        subscribers.forEach((callback) => callback());
      }
      return true;
    },
  });

  return state as MarioState<T>;
}

function marioComputed<T>(computeFn: () => T): MarioState<T> {
  const state = marioState<T>(computeFn());

  // Re-compute value when dependencies change
  onStateChange(() => {
    state.value = computeFn();
  });

  return state;
}

export function onStateChange(callback: () => void) {
  subscribers.add(callback);
  return () => {
    subscribers.delete(callback);
  };
}

export { marioState, marioComputed };

