import { cookies } from 'next/headers'
import { authenticationProps } from '@/types/CommonType'

export async function getAuthenticationToken() {
    const cookieStore = await cookies()
    const authentication: authenticationProps = {
        accessToken: cookieStore.get('accessToken')?.value || '',
        refreshToken: cookieStore.get('refreshToken')?.value || ''
    }

    return authentication
}
