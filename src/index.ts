// Core API
import '@/style/index.css';
export { marioState, onStateChange } from '@/core/reactivity';
export type { MarioState } from '@/core/reactivity';

export { mario } from '@/core/template';
export type { Template } from '@/core/template';
// Re-export render utilities
export { render, mount } from '@/core/render';
