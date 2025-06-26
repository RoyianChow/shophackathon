// Stub declarations to satisfy TypeScript for Shopify Mini packages
declare module '@shopify/shop-mini';
// If needed, also stub the React helper package:
declare module '@shopify/shop-minis-react';

// src/global.d.ts
declare interface ImportMetaEnv {
  readonly VITE_OPENAI_API_KEY: string;
  // add other VITE_… keys here if needed
  readonly [key: string]: string | undefined;
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}