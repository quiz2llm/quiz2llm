import { useState, useCallback, useMemo } from 'react'
import { theme } from 'antd'

export type ThemeMode = 'light' | 'dark'

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>('dark')

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  const themeConfig = useMemo(
    () => ({
      algorithm: mode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
      token: {
        colorPrimary: '#000000',
        colorTextTertiary: '#424242',
      },
    }),
    [mode],
  )

  return { mode, toggleTheme, themeConfig }
}
