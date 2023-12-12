import { inter } from './fonts';
import ClientLayout from './layout.client';
import './globals.css'

export const metadata = {
  title: 'DB Støjsensor',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout navn={metadata.title}>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}