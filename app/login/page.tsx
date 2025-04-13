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
import { loginStart, loginSuccess, loginFailure } from "@/lib/redux/slices/userSlice"
import { isEmailValid } from "@/lib/utils/validation"

export default function LoginPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate form
    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    if (!isEmailValid(email)) {
      setError("Please enter a valid email address")
      return
    }

    // Simulate login process
    setIsLoading(true)
    dispatch(loginStart())

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful login
      if (email === "user@example.com" && password === "password") {
        dispatch(
          loginSuccess({
            id: "1",
            email,
            firstName: "John",
            lastName: "Doe",
            isAuthenticated: true,
          }),
        )
        router.push("/")
      } else {
        throw new Error("Invalid email or password")
      }
    } catch (error) {
      dispatch(loginFailure(error instanceof Error ? error.message : "Login failed"))
      setError(error instanceof Error ? error.message : "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login to SkyJourney</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-sm text-rose-600 hover:text-rose-800">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                />
                <Label htmlFor="remember" className="text-sm">
                  Remember me
                </Label>
              </div>
              <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link href="/register" className="text-rose-600 hover:text-rose-800 font-medium">
              Register
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
