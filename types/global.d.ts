declare global {
  interface Window {
    __CSRF_TOKEN__?: string
  }
}

export {}
