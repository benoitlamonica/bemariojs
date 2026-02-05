// Core API
export { render, mount } from '@/core/render';

// Template
export { mario } from '@/core/template';
export type { Template } from '@/core/template';

// Reactivity
export { marioState, onStateChange } from '@/core/reactivity';
export type { MarioState } from '@/core/reactivity';

// Router
export { createRouter } from '@/core/router';
export type { Router, Route } from '@/core/router';

// API Utilities
export { createApi, marioFetch } from '@/utils/api';
export type { ApiOptions } from '@/utils/api';
