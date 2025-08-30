'use client'
import { useTheme } from 'next-themes'

import { Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useThemeStore } from '@/stores'

export const HeaderTheme = () => {
    // next-themes의 setTheme과 Recoil의 themeState를 함께 사용합니다.
    const { setTheme } = useTheme()
    const { theme, toggleTheme } = useThemeStore()

    // 테마를 토글하는 함수입니다.
    const handleToggle = () => {
        // Zustand 스토어의 toggleTheme 함수를 호출합니다.
        toggleTheme()

        // next-themes에도 새 테마를 적용합니다.
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
    }

    return (
        <div className="px-4">
            <Button
                variant="outline"
                size="icon"
                onClick={handleToggle}>
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span className="sr-only">Toggle theme</span>
            </Button>
        </div>
    )
}
