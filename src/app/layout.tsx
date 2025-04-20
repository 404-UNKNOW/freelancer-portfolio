import './globals.css'
import type { Metadata } from 'next'
// Remove Google font import
// import { Inter } from 'next/font/google'
// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Professional Freelancer | High-Quality Development Services',
  description: 'Providing professional website development, mobile app, and UI/UX design services. Years of experience delivering high-quality solutions for your projects.',
  keywords: 'freelancer, web development, frontend development, mobile app development, UI/UX design, React development',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        {children}
      </body>
    </html>
  )
}
