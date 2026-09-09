import type { ComponentType } from 'react'
import type { IconProps } from '../components/ui/icons'
import { IconContrast, IconMoon, IconSun } from '../components/ui/icons'
import type { ThemeMode } from '../context/ThemeContext'

export interface ThemeOption {
  value: ThemeMode | 'dark'
  label: string
  icon: ComponentType<IconProps>
  // The app only implements 'light' and 'default' (see ThemeContext) — a
  // real 'dark' mode doesn't exist yet, so this option is shown for
  // visual completeness against the reference design but stays disabled
  // rather than silently doing nothing when picked.
  comingSoon?: boolean
}

export const themeOptions: ThemeOption[] = [
  { value: 'light', label: 'Light', icon: IconSun },
  { value: 'default', label: 'Default', icon: IconContrast },
  { value: 'dark', label: 'Dark', icon: IconMoon, comingSoon: true },
]
