"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAppSelector } from "@/lib/redux/hooks"
import { User, LogIn, Menu, X } from "lucide-react"
import { useState } from "react"

export function Header() {
  const { currentUser } = useAppSelector((state) => state.user)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-rose-600">
          SkyJourney
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-700 hover:text-rose-600">
            Home
          </Link>
          <Link href="/flights" className="text-gray-700 hover:text-rose-600">
            Flights
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-rose-600">
            About
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-rose-600">
            Contact
          </Link>
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {currentUser ? (
            <Button variant="outline" className="flex items-center gap-2">
              <User size={16} />
              <span>{currentUser.firstName}</span>
            </Button>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline" className="flex items-center gap-2">
                  <LogIn size={16} />
                  <span>Login</span>
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-rose-600 hover:bg-rose-700 text-white">Register</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link href="/" className="text-gray-700 hover:text-rose-600 py-2" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link
              href="/flights"
              className="text-gray-700 hover:text-rose-600 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Flights
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-rose-600 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-rose-600 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-2 border-t flex flex-col space-y-2">
              {currentUser ? (
                <Button variant="outline" className="flex items-center justify-center gap-2 w-full">
                  <User size={16} />
                  <span>{currentUser.firstName}</span>
                </Button>
              ) : (
                <>
                  <Link href="/login" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="flex items-center justify-center gap-2 w-full">
                      <LogIn size={16} />
                      <span>Login</span>
                    </Button>
                  </Link>
                  <Link href="/register" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="bg-rose-600 hover:bg-rose-700 text-white w-full">Register</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
