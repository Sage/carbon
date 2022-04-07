interface WindowInterface extends Partial<Window> {
  chrome?: Record<string, unknown>;
  sidebar?: Record<string, unknown>;
}

function browserTypeCheck(_window: WindowInterface): boolean {
  return Boolean(_window.chrome || _window.sidebar);
}

export function isSafari(navigator: Navigator): boolean {
  return navigator.vendor.includes("Apple");
}

export default browserTypeCheck;
