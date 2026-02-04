import { Tailwind } from '@/utils/tailwind';

// Need to take all values from all keys of Tailwind
type TailwindClasses = Tailwind[keyof Tailwind];

/**
 * Template configuration for creating DOM elements
 */
export interface Template {
  as: string;
  classes?: TailwindClasses[];
  slot?: (Template | (() => Template)) | (Template | (() => Template))[];
  content?: string;
  click?: () => void;
  onMount?: (element: HTMLElement) => void;
}

/**
 * Creates a template configuration for a DOM element
 * @param config - The template configuration object
 * @returns The template configuration
 */
export function mario(config: Template): Template {
  return {
    as: config.as,
    classes: config.classes,
    slot: typeof config.slot === 'function' ? config.slot() : config.slot,
    content: config.content,
    click: config.click,
    onMount: config.onMount,
  };
}
