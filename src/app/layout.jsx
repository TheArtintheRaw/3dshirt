import { Layout } from '%/components/dom/Layout'
import './global.css'

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
    </html>
  )
}
