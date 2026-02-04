# MarioJS

A tiny, reactive front-end framework with TypeScript and Tailwind CSS.

## Features

- 🎯 **Reactive State** - Proxy-based reactivity inspired by Vue 3 refs
- 🎨 **Tailwind Integration** - Built-in Tailwind CSS support with full autocomplete
- 📦 **Lightweight** - Minimal core framework (~2KB gzipped)
- 🧩 **Component-based** - Simple component architecture
- ✨ **Automatic Re-rendering** - Components update when state changes
- 🛣️ **Hash-based Routing** - Built-in router with navigation
- 📝 **TypeScript First** - Full type safety and IDE support
- 🎭 **Custom Classes** - Mix Tailwind with custom CSS freely

## Installation

```bash
npm install benmariojs
# or
yarn add benmariojs
```

## Quick Start

```typescript
import { marioState, mario, mount } from 'benmariojs';

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
  as: 'div',                           // HTML tag
  classes: ['text-center', 'p-4'],     // Tailwind classes (with autocomplete!)
  content: 'Hello World',              // Text content
  click: () => {},                     // Click handler
  slot: [...],                         // Child templates
  onMount: (el) => {},                 // Lifecycle hook
})
```

**Classes** support both Tailwind's typed classes and custom CSS:
```typescript
classes: ['text-blue-500', 'my-custom-class']
```

### `mount(component, target)`

Mounts a component to the DOM. Automatically triggers re-renders on state changes.

```typescript
mount(Counter, '#app');  // Mount to selector
mount(Counter, element); // Or to an element
```

### Router

Create a hash-based router with built-in navigation:

```typescript
import { createRouter, mario, mount } from 'benmariojs';

const Home = () => mario({
  as: 'div',
  content: 'Home Page',
});

const About = () => mario({
  as: 'div',
  content: 'About Page',
});

const router = createRouter([
  { path: '/', component: Home },
  { path: '/about', component: About },
]);

// Navigate
router.push('/about');
router.replace('/');

// Render current route
const App = () => router.view();

mount(App, '#app');
```

### `onStateChange(callback)`

Subscribe to any state changes globally (used internally for re-renders).

```typescript
onStateChange(() => {
  console.log('State changed!');
});
```

## Example: Counter with Router

```typescript
import { marioState, mario, createRouter, mount } from 'benmariojs';

const count = marioState(0);

const Counter = () => mario({
  as: 'div',
  classes: ['p-8', 'text-center'],
  slot: [
    mario({
      as: 'h1',
      classes: ['text-4xl', 'font-bold'],
      content: `Count: ${count.value}`,
    }),
    mario({
      as: 'button',
      classes: ['mt-4', 'px-4', 'py-2', 'bg-blue-500', 'text-white', 'rounded'],
      content: 'Increment',
      click: () => count.value++,
    }),
  ],
});

const Home = () => mario({
  as: 'div',
  content: 'Welcome!',
});

const router = createRouter([
  { path: '/', component: Home },
  { path: '/counter', component: Counter },
]);

const App = () => mario({
  as: 'div',
  slot: [router.view()],
});

mount(App, '#app');
```

## License

MIT
