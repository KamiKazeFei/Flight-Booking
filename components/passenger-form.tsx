"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type PassengerFormProps = {
  flightId?: string
}

export function PassengerForm({ flightId }: PassengerFormProps) {
  const router = useRouter()
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)

    // Simulate form submission
    setTimeout(() => {
      router.push("/confirmation")
    }, 1000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Passenger Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Passenger 1 (Adult)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" required />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Passport Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="passportNumber">Passport Number</Label>
                  <Input id="passportNumber" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="passportCountry">Issuing Country</Label>
                  <Select>
                    <SelectTrigger id="passportCountry">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                      <SelectItem value="jp">Japan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="passportIssue">Issue Date</Label>
                  <Input id="passportIssue" type="date" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="passportExpiry">Expiry Date</Label>
                  <Input id="passportExpiry" type="date" required />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
              <Tabs defaultValue="card">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="card">Credit Card</TabsTrigger>
                  <TabsTrigger value="paypal">PayPal</TabsTrigger>
                  <TabsTrigger value="applepay">Apple Pay</TabsTrigger>
                </TabsList>
                <TabsContent value="card" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="grid gap-2">
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input id="cardName" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cardExpiry">Expiry Date</Label>
                      <Input id="cardExpiry" placeholder="MM/YY" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cardCvc">CVC</Label>
                      <Input id="cardCvc" required />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="paypal">
                  <div className="flex items-center justify-center h-40">
                    <p className="text-muted-foreground">You will be redirected to PayPal to complete payment.</p>
                  </div>
                </TabsContent>
                <TabsContent value="applepay">
                  <div className="flex items-center justify-center h-40">
                    <p className="text-muted-foreground">You will be prompted to pay with Apple Pay.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-sm">
                I agree to the terms and conditions, including the privacy policy and cancellation policy.
              </Label>
            </div>

            <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700 text-white" disabled={formSubmitted}>
              {formSubmitted ? "Processing..." : "Complete Booking"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
