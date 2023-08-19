import { Layout } from '%/components/dom/Layout'
import './global.css'
import Script from 'next/script'

export const metadata = {
  title: 'Dope Sh!rt',
  description: 'Dope Sh!rt, that app that help you make dope sh!rt.',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='antialiased'>
      <head />
      <body>
        <Layout>{children}</Layout>
      </body>
      <Script src='https://js.stripe.com/v3/buy-button.js'></Script>
    </html>
  )
}
