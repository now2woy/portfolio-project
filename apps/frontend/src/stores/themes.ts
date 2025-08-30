import { create } from 'zustand'

/**
 * Theme 상태 정의
 */
interface ThemeState {
    theme: 'light' | 'dark'
    toggleTheme: () => void
}

/**
 * Theme Store
 */
export const useThemeStore = create<ThemeState>(set => ({
    theme: 'light', // 초기 상태
    toggleTheme: () =>
        set(state => ({ theme: state.theme === 'light' ? 'dark' : 'light' }))
}))
