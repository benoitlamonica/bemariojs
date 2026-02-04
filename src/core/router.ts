import { marioState, type MarioState } from './reactivity';
import type { Template } from './template';

export interface Route {
  path: string;
  component: () => Template;
}

export function createRouter(routes: Route[], base = '/') {
  const currentRoute: MarioState<string> = marioState(getHashPath());

  function getHashPath(): string {
    return window.location.hash.slice(1) || base;
  }

  function normalizeRoute(route: string): string {
    return route.startsWith(base) ? route : base + route;
  }

  function findRoute(path: string): Route | undefined {
    const normalized = normalizeRoute(path);
    return routes.find((route) => route.path === normalized);
  }

  function push(path: string): void {
    const normalized = normalizeRoute(path);
    const route = findRoute(normalized);

    if (route) {
      window.location.hash = normalized;
      currentRoute.value = normalized;
    } else {
      console.warn(`Route not found: ${normalized}`);
    }
  }

  function replace(path: string): void {
    const normalized = normalizeRoute(path);
    const route = findRoute(normalized);

    if (route) {
      window.history.replaceState(null, '', `#${normalized}`);
      currentRoute.value = normalized;
    } else {
      console.warn(`Route not found: ${normalized}`);
    }
  }

  // Listen for hash changes
  window.addEventListener('hashchange', () => {
    const path = getHashPath();
    const route = findRoute(path);
    if (route) {
      currentRoute.value = path;
    }
  });

  function view(): Template {
    const route = findRoute(currentRoute.value);
    if (!route) {
      return {
        as: 'div',
        content: `Route not found: ${currentRoute.value}`,
      };
    }
    return route.component();
  }

  return {
    push,
    replace,
    view,
    currentPath: () => currentRoute.value,
    routes,
  };
}

export type Router = ReturnType<typeof createRouter>;
