import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ChaserAI',
  description: 'Chaser',
  generator: 'wali',
  icons: {
    icon :'/favicon.ico'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
