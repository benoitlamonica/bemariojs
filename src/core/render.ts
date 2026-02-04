import { Template } from '@/core/template';
import { onStateChange } from '@/core/reactivity';

/**
 * Renders a template to a DOM element
 * @param tmpl - The template to render
 * @returns The created DOM element
 */
export function render(tmpl: Template): HTMLElement {
  const element = document.createElement(tmpl.as);

  // Add classes if provided
  if (tmpl.classes && tmpl.classes.length > 0) {
    element.classList.add(...tmpl.classes);
  }

  // Recursively render slot if provided
  if (tmpl.slot && !Array.isArray(tmpl.slot)) {
    tmpl.slot = [tmpl.slot];
  }

  // Clicks handler
  if (tmpl.click) {
    element.addEventListener('click', tmpl.click);
  }

  // Call onMount hook if provided
  if (tmpl.onMount) {
    tmpl.onMount(element);
  }

  // Set innerHTML if provided and skip other content
  if (tmpl.innerHTML) {
    element.innerHTML = tmpl.innerHTML;
    return element;
  }

  if (tmpl.slot?.length) {
    for (const childTemplate of tmpl.slot) {
      const childElement = render(typeof childTemplate === 'function' ? childTemplate() : childTemplate);
      element.appendChild(childElement);
    }
  }

  // Set content if provided
  if (tmpl.content) {
    const textNode = document.createTextNode(tmpl.content);
    element.appendChild(textNode);
  }

  return element;
}

/**
 * Mounts a rendered template to a target element in the DOM
 * @param tmpl - The template to mount
 * @param target - The target element selector or element
 */
export function mount(tmpl: Template | (() => Template), target: string | HTMLElement): void {
  const targetElement = typeof target === 'string'
    ? document.querySelector(target)
    : target;

  if (!targetElement) {
    throw new Error(`Target element not found: ${target}`);
  }

  const componentFn = typeof tmpl === 'function' ? tmpl : () => tmpl;
  let currentElement = render(componentFn());
  targetElement.appendChild(currentElement);

  // Auto-rerender entire tree when reactive state changes
  onStateChange(() => {
    // Clear the entire tree
    targetElement.innerHTML = '';
    // Re-render from root
    const newElement = render(componentFn());
    targetElement.appendChild(newElement);
    currentElement = newElement;
  });
}
