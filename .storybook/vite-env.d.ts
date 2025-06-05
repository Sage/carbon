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
