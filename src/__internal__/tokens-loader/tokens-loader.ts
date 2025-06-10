type Sizes = "large" | "small";
type Modes = "dark" | "light";

declare global {
  interface Window {
    __SAGE_TOKEN_CSS_LOADER_REGISTRY__?: {
      instance: TokenCSSLoader | null;
      instances: Set<string>;
      instanceCount: number;
    };
  }
}

class TokenCSSLoader {
  private static instance: TokenCSSLoader | null = null;

  private static instanceCount = 0;

  private activeProduct: string = "frozenproduct";

  private currentLink: null | HTMLLinkElement = null;

  private currentSize: Sizes = "large";

  private currentMode: Modes = "light";

  private initialiseRegistry(): void {
    const currentWindow = this.getWindow();

    if (currentWindow && !window.__SAGE_TOKEN_CSS_LOADER_REGISTRY__) {
      window.__SAGE_TOKEN_CSS_LOADER_REGISTRY__ = {
        instance: null,
        instances: new Set(),
        instanceCount: 0,
      };
    }
  }

  getWindow(): Window | null {
    if (typeof window === "undefined") {
      return null;
    }
    return window;
  }

  handleInstanceCountError(count: number) {
    throw new Error(
      `TokenCSSLoader singleton violation: Attempted to create multiple instances. ` +
        `This is not allowed in MFE environments. Current instance count: ${count}`,
    );
  }

  constructor(product = "frozenproduct", projectId = "") {
    this.initialiseRegistry();
    const currentWindow = this.getWindow();

    if (!currentWindow) {
      return;
    }

    const registry = currentWindow.__SAGE_TOKEN_CSS_LOADER_REGISTRY__;

    if (registry) {
      registry.instanceCount += 1;
      registry.instances.add(projectId);

      // Error if multiple instances are detected
      if (registry?.instanceCount > 1) {
        this.handleInstanceCountError(registry.instanceCount);
        return;
      }
      registry.instance = this;
    } else {
      TokenCSSLoader.instanceCount += 1;

      if (TokenCSSLoader.instanceCount > 1) {
        this.handleInstanceCountError(TokenCSSLoader.instanceCount);
        return;
      }
      TokenCSSLoader.instance = this;
    }

    this.activeProduct = product;
    this.currentLink = null;
  }

  // static destroy(): void {
  //   if (TokenCSSLoader.instance) {
  //     // Clean up any active CSS link
  //     const currentLink = TokenCSSLoader.instance.getLink();
  //     if (currentLink && document.head.contains(currentLink)) {
  //       document.head.removeChild(currentLink);
  //     }

  //     TokenCSSLoader.instance = null;
  //     TokenCSSLoader.instanceCount = 0;
  //   }
  // }

  // destroys singleton instance and cleans up any CSS injected
  static destroy(): void {
    const currentWindow = typeof window !== "undefined" ? window : null;
    const registry = currentWindow?.__SAGE_TOKEN_CSS_LOADER_REGISTRY__;
    const instance = registry?.instance || TokenCSSLoader.instance;

    if (instance) {
      // Clean up any active CSS link
      const currentLink = instance.getLink();
      if (currentLink && document.head.contains(currentLink)) {
        document.head.removeChild(currentLink);
      }

      // Clear global registry if it exists
      if (registry) {
        registry.instance = null;
        registry.instances.clear();
        registry.instanceCount = 0;
      }

      // Clear local instance
      TokenCSSLoader.instance = null;
      TokenCSSLoader.instanceCount = 0;
    }
  }

  async loadTokenCSS(size: Sizes = "large", mode: Modes = "light") {
    try {
      const currentLink = this.getLink();

      // Ensures we remove any existing CSS previously injected
      if (currentLink && document.head.contains(currentLink)) {
        document.head.removeChild(currentLink);
      }

      // create the path for the relevant file and add it to the head
      const cssPath = `@sage/design-tokens-fusion/${this.activeProduct}/${size}/${mode}.css`;
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = cssPath;
      link.setAttribute("data-design-tokens-loaded", "true");
      document.head.appendChild(link);
      this.setLink(link);

      return new Promise<void>((resolve, reject) => {
        link.onload = () => {
          this.setSize(size);
          this.setMode(mode);
          resolve();
        };
        link.onerror = (error) => {
          console.error("Failed to load token CSS:", error);

          // remove any injected CSS if error occurs
          if (document.head.contains(link)) {
            document.head.removeChild(link);
          }
          this.setLink(null);

          reject(error);
        };
      });
    } catch (error) {
      console.error("Failed to load token CSS:", error);
      throw error;
    }
  }

  async updateTokens({ size, mode }: { size: Sizes; mode: Modes }) {
    const currentSize = this.getSize();
    const currentMode = this.getMode();

    if (size === currentSize && mode === currentMode) {
      console.warn(
        "No changes detected in size or mode. Skipping token CSS update.",
      );
      return;
    }

    await this.loadTokenCSS(size, mode);
  }

  setLink(link: HTMLLinkElement | null) {
    this.currentLink = link;
  }

  getLink(): HTMLLinkElement | null {
    return this.currentLink;
  }

  setSize(size: Sizes) {
    this.currentSize = size;
  }

  getSize(): Sizes {
    return this.currentSize;
  }

  setMode(mode: Modes) {
    this.currentMode = mode;
  }

  getMode(): Modes {
    return this.currentMode;
  }
}

export default TokenCSSLoader;
