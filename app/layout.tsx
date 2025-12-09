import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'sqlink',
  description: 'sqlink application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="m-0 p-0">{children}</body>
    </html>
  )
}
