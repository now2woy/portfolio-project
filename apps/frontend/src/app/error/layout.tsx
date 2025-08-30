import '../globals.css'

const RootLayout = async ({
    children
}: Readonly<{ children: React.ReactNode }>) => {
    return (
        <html
            lang="ko"
            suppressHydrationWarning>
            <body>{children}</body>
        </html>
    )
}

export default RootLayout
