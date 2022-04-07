interface Global {
  document: Document;
  window: Window;
}

const globalNode: Global = {
  window,
  document: window.document,
  ...global,
};

/**
 * Browser provides helper methods for working with Browser behavior.
 */
const Browser = {
  isDomAvailable: (): boolean => {
    const _window = Browser.getWindow();
    const _document = Browser.getDocument();
    return !!(
      typeof _window !== "undefined" &&
      _document &&
      _document.createElement
    );
  },

  /**
   * Get the current window
   */
  getWindow: (): Window | undefined => {
    return globalNode.window;
  },

  /**
   * Get the current document
   */
  getDocument: (): Document | undefined => {
    return globalNode.document;
  },
};

export default Browser;
