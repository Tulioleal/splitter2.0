import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Nav from '../components/Nav'
import Footer from '@/components/Footer'
import { Toaster } from 'sonner'
import ReactQueryProvider from '@/context/Query.provider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Splitter',
  description: 'A smarter way to split bills'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Nav />
        <ReactQueryProvider>
          <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">{children}</main>
        </ReactQueryProvider>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
