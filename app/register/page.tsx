"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAppDispatch } from "@/lib/redux/hooks"
import { registerStart, registerSuccess, registerFailure } from "@/lib/redux/slices/userSlice"
import { isEmailValid, isPasswordValid } from "@/lib/utils/validation"

export default function RegisterPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate form
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (!isEmailValid(email)) {
      setError("Please enter a valid email address")
      return
    }

    if (!isPasswordValid(password)) {
      setError("Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!agreeTerms) {
      setError("You must agree to the terms and conditions")
      return
    }

    // Simulate registration process
    setIsLoading(true)
    dispatch(registerStart())

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful registration
      dispatch(
        registerSuccess({
          id: "1",
          email,
          firstName,
          lastName,
          isAuthenticated: true,
        }),
      )
      router.push("/")
    } catch (error) {
      dispatch(registerFailure(error instanceof Error ? error.message : "Registration failed"))
      setError(error instanceof Error ? error.message : "Registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
          <CardDescription className="text-center">Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500">
                  Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked === true)}
                  required
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <Link href="/terms" className="text-rose-600 hover:text-rose-800">
                    terms and conditions
                  </Link>
                </Label>
              </div>
              <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Register"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-rose-600 hover:text-rose-800 font-medium">
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
