import type { Metadata } from 'next'
import { Nunito_Sans } from 'next/font/google'
import './globals.css'

const nunito = Nunito_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'web Analytics',
  description: 'Rooted in your data.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={nunito.className}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}