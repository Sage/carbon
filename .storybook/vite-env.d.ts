/// <reference types="vite/client" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Add types for global variables here:
declare const __APP_ENV__: string;

interface ImportMetaEnv {
  // add types of custom env variables here:
  readonly STORYBOOK_VIEW_MODE: "docs" | "story";
}

// Storybook does not ship a .d.ts for this subpath, but preview.ts imports the
// default `extractArgTypes` from it to reuse the framework's docgen extraction.
declare module "@storybook/react/entry-preview-argtypes" {
  export const parameters: {
    docs?: {
      extractArgTypes?: (component: unknown) => Record<string, unknown> | null;
    };
  };
  export const argTypesEnhancers: unknown[];
}
