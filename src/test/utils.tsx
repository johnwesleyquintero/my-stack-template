import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { ThemeProvider } from 'next-themes'

function render(
  ui: React.ReactElement,
  { 
    theme = 'light',
    route = '/',
    ...options 
  } = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <ThemeProvider
        attribute="class"
        defaultTheme={theme}
        enableSystem={false}
        value={{ theme, setTheme: () => null }}
      >
        {children}
      </ThemeProvider>
    )
  }

  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...options }),
  }
}

export * from '@testing-library/react'
export { render }
