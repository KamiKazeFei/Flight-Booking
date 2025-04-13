"use client"

import type React from "react"

import { Inter } from "next/font/google"
import "./globals.css"
import { Provider } from "react-redux"
import { store } from "@/lib/redux/store"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  // Add navigation warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Only show warning if in the booking flow
      if (pathname && pathname.includes("/flights/") && !pathname.includes("/confirmation")) {
        e.preventDefault()
        e.returnValue = "You have unsaved changes. Are you sure you want to leave?"
        return e.returnValue
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [pathname])

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <Header />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
