import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

/**
 * 사용자 상태 정의
 */
interface AuthState {
    userId: string | null
    userNm: string | null
    setUserInfo: (userId: string, userNm: string) => void
    clearUserInfo: () => void
}

/**
 * 사용자 Store
 */
export const useAuthStore = create<AuthState>()(
    persist(
        set => ({
            userId: null,
            userNm: null,
            setUserInfo: (userId, userNm) => set({ userId, userNm }),
            clearUserInfo: () => set({ userId: null, userNm: null })
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage)
        }
    )
)
