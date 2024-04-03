/// <reference types="vite/client" />
declare module '@vue/runtime-core' {
    export interface GlobalComponents {
      LottieAnimation: typeof import('vue3-lottie')['Vue3Lottie']
    }
  }
export {}

interface ImportMetaEnv {
  readonly VITE_AUTH0_DOMAIN: string
  readonly VITE_AUTH0_CLIENTID: string
  readonly VITE_GISTS_TOKEN: string
  readonly VITE_GISTS_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}