import Link from 'next/link'

const ErrorPage = async ({ params }: { params: { statusCode: string } }) => {
    const { statusCode } = await Promise.resolve(params)

    console.log(statusCode)

    const messages: Record<string, string> = {
        '403': '접근 권한이 없습니다.',
        '404': '페이지를 찾을 수 없습니다.',
        '500': '서버에서 오류가 발생했습니다.'
    }

    const message = messages[statusCode] || '알 수 없는 오류가 발생했습니다.'

    return (
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-base font-semibold text-indigo-600">
                    {statusCode}
                </p>
                <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
                    {message}
                </h1>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link
                        href="/"
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Go back home
                    </Link>
                    <Link
                        href="/"
                        className="text-sm font-semibold text-gray-900">
                        Contact support <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
            </div>
        </main>
    )
}

export default ErrorPage
