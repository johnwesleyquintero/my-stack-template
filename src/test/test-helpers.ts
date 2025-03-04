import { ReactElement } from 'react'
import { RenderOptions, render } from '@testing-library/react'

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { ...options })

export * from '@testing-library/react'
export { customRender as render }

export function createMockRouter(overrides = {}) {
  return {
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    basePath: '',
    back: jest.fn(),
    forward: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    ...overrides,
  }
}

export function createMockTheme(overrides = {}) {
  return {
    theme: 'light',
    setTheme: jest.fn(),
    resolvedTheme: 'light',
    systemTheme: 'light',
    ...overrides,
  }
}
