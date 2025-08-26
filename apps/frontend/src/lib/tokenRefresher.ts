let refreshPromise: Promise<string> | null = null;

/**
 * 리프레시 Promise 관리
 * @param refreshFn 
 * @returns 
 */
export async function getAccessToken(refreshFn: () => Promise<string>): Promise<string> {
    if (!refreshPromise) {
        refreshPromise = refreshFn().finally(() => {
            refreshPromise = null;
        });
    }
    return refreshPromise;
}
