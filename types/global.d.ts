export {}

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    staticFn: any
  }
}

declare module 'core-js/stable'
