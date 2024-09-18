import Header from '@/components/Header'
import { Montserrat } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const font = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'MPGS test',
  description: 'Mastercard Payment Gateway Services'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Header />
        <main className="max-w-7xl mx-auto p-6 lg:px-8">{children}</main>
        <Script src="https://mtf.gateway.mastercard.com/static/checkout/checkout.min.js" />
      </body>
    </html>
  )
}
