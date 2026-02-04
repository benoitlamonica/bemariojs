# MarioJS

A tiny, reactive front-end framework with TypeScript and Tailwind CSS.

## Features

- 🎯 **Reactive State** - Proxy-based reactivity inspired by Vue 3 refs
- 🎨 **Tailwind Integration** - Built-in Tailwind CSS support
- 📦 **Lightweight** - Minimal core framework
- 🧩 **Component-based** - Simple component architecture
- ✨ **Automatic Re-rendering** - Components update when state changes

## Installation

```bash
npm install mariojs
# or
yarn add mariojs
```

## Quick Start

```typescript
import { marioState, mario, mount } from 'mariojs';

// Create reactive state
const count = marioState(0);

// Define a component
const Counter = () => mario({
  as: 'div',
  classes: ['p-4', 'text-center'],
  content: `Count: ${count.value}`,
  click: () => {
    count.value++;
  },
});

// Mount to DOM
mount(Counter, '#app');
```

## API

### `marioState(initialValue)`

Creates reactive state with Proxy-based reactivity.

```typescript
const count = marioState(0);
count.value;     // read
count.value++;   // write (triggers re-render)
```

### `mario(config)`

Creates a template configuration for a DOM element.

```typescript
mario({
  as: 'div',                    // HTML tag
  classes: ['text-center'],     // Tailwind classes
  content: 'Hello World',       // Text content
  click: () => {},              // Click handler
  slot: [...],                  // Child templates
})
```

### `mount(component, target)`

Mounts a component to the DOM.

```typescript
mount(Counter, '#app');  // Mount to selector
mount(Counter, element); // Or to an element
```

### `onStateChange(callback)`

Subscribe to any state changes globally.

```typescript
onStateChange(() => {
  console.log('State changed!');
});
```

## License

MIT
