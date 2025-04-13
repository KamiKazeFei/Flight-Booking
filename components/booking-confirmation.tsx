import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Check, Download, Calendar, Share2 } from "lucide-react"
import Link from "next/link"

export function BookingConfirmation() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Booking Confirmed!</h1>
        <p className="text-gray-600">
          Your booking has been confirmed. Your confirmation number is <strong>JL5-123456</strong>.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Flight Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4">
              <div>
                <div className="text-xl font-bold">10:30 AM</div>
                <div className="text-sm text-gray-500">Oct 15, 2023</div>
                <div className="font-medium mt-1">JFK</div>
                <div className="text-sm text-gray-500">New York</div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="text-sm text-gray-500 mb-2">14h 00m</div>
                <div className="w-24 h-0.5 bg-gray-300 relative">
                  <div className="absolute -top-1.5 -right-1 w-3 h-3 rounded-full bg-gray-300"></div>
                </div>
                <div className="text-sm text-gray-500 mt-2">Nonstop</div>
              </div>

              <div className="text-right">
                <div className="text-xl font-bold">2:30 PM</div>
                <div className="text-sm text-gray-500">Oct 16, 2023</div>
                <div className="font-medium mt-1">HND</div>
                <div className="text-sm text-gray-500">Tokyo</div>
              </div>
            </div>

            <Separator />

            <div>
              <div className="font-semibold mb-2">Passenger Information</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Passenger</div>
                  <div>John Doe</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Passport</div>
                  <div>US1234567</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Seat</div>
                  <div>23A (Window)</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Class</div>
                  <div>Economy</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Payment Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <div>Base fare</div>
              <div>$799.00</div>
            </div>
            <div className="flex justify-between">
              <div>Taxes & fees</div>
              <div>$100.00</div>
            </div>
            <div className="flex justify-between">
              <div>Travel insurance</div>
              <div>$35.00</div>
            </div>

            <Separator />

            <div className="flex justify-between font-semibold text-lg">
              <div>Total paid</div>
              <div>$934.00</div>
            </div>

            <div className="text-sm text-gray-500">Paid with Visa ending in 4242</div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-4 justify-center">
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Download E-Ticket
        </Button>
        <Button variant="outline" className="gap-2">
          <Calendar className="h-4 w-4" />
          Add to Calendar
        </Button>
        <Button variant="outline" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share Itinerary
        </Button>
      </div>

      <div className="text-center mt-8">
        <Link href="/" className="text-rose-600 hover:text-rose-800 font-medium">
          Return to Home
        </Link>
      </div>
    </div>
  )
}
