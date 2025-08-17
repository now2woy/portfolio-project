import { cookies } from 'next/headers';

export async function getAuthenticationToken(){
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value || '';
    const refreshToken = cookieStore.get('refreshToken')?.value || '';

    return {accessToken, refreshToken};
}