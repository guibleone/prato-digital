import type { Metadata } from 'next'
import './globals.css'
import { inter, barlow } from './fonts'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AuthProvider from './components/SessionProvider'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: 'Prato Digital',
  description: 'Crie rceitas e compartilhe com o mundo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
    <html lang="pt-BR">
      <body suppressHydrationWarning={true} className={inter.className}>
        <Navbar />
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
    </AuthProvider>
  )
}
