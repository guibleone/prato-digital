import type { Metadata } from 'next'
import './globals.css'
import { inter, barlow } from './fonts'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

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
    <html lang="pt-BR">
      <body suppressHydrationWarning={true} className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
