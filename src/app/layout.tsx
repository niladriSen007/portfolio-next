import './globals.css'
import { Inter } from 'next/font/google'

// Optimize font loading
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

export const metadata = {
  title: 'NILADRI - Full Stack Developer',
  description: 'Portfolio of NILADRI, a Full Stack Developer with 3+ years of experience',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Add preload hints */}
        <link
          rel="preload"
          href="/icons/javascript.svg"
          as="image"
          type="image/svg+xml"
        />
        <link
          rel="preload"
          href="/icons/react.svg"
          as="image"
          type="image/svg+xml"
        />
        {/* Add more critical assets as needed */}
      </head>
      <body className={`${inter.className} bg-[#0A0A0A] text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}
