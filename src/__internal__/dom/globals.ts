/**
 * Returns the global `window` object in a way that is friendly to SSR.
 * This check can be avoided if you are sure that the code will only run in the browser.
 * Some examples where you can ignore this:
 * - `useEffect` hooks
 * - `useLayoutEffect` hooks
 * - Callbacks for event listeners
 * - Files with the `"use-client"` directive
 *
 * Primarily, this is necessary when attempting to access the `window` object during rendering of components.
 * However, even still, where possible, it is recommended to avoid accessing the `window` object during rendering
 * because it can lead to hydration mismatches. This happens when the server-rendered HTML differs from what the
 * client renders due to missing environment-specific data (e.g., `window.innerWidth` being undefined on the server).
 *
 * @returns The global `window` object, if it exists.
 */
export function getWindow(): (Window & typeof globalThis) | undefined {
  return typeof window !== "undefined" ? window : undefined;
}

/**
 * Returns the global `document` object in a way that is friendly to SSR.
 * This check can be avoided if you are sure that the code will only run in the browser.
 * Some examples where you can ignore this:
 * - `useEffect` hooks
 * - `useLayoutEffect` hooks
 * - Callbacks for event listeners
 * - Files with the `"use-client"` directive
 *
 * Primarily, this is necessary when attempting to access the `document` object during rendering of components.
 * However, even still, where possible, it is recommended to avoid accessing the `document` object during rendering
 * because it can lead to hydration mismatches. This happens when the server-rendered HTML differs from what the
 * client renders due to missing environment-specific data (e.g., `document.children` being undefined on the server).
 *
 * @returns The global `document` object, if it exists.
 */
export function getDocument(): Document | undefined {
  return typeof document !== "undefined" ? document : undefined;
}

/**
 * Returns the global `navigator` object in a way that is friendly to SSR.
 * This check can be avoided if you are sure that the code will only run in the browser.
 * Some examples where you can ignore this:
 * - `useEffect` hooks
 * - `useLayoutEffect` hooks
 * - Callbacks for event listeners
 * - Files with the `"use-client"` directive
 *
 * Primarily, this is necessary when attempting to access the `navigator` object during rendering of components.
 * However, even still, where possible, it is recommended to avoid accessing the `navigator` object during rendering
 * because it can lead to hydration mismatches. This happens when the server-rendered HTML differs from what the
 * client renders due to missing environment-specific data (e.g., `navigator.userAgent` being undefined on the server).
 *
 * @returns The global `navigator` object, if it exists.
 */
export function getNavigator(): Navigator | undefined {
  return typeof navigator !== "undefined" ? navigator : undefined;
}
