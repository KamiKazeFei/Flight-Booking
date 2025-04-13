import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Clock, Luggage, Utensils, Wifi, Monitor } from "lucide-react"
import Image from "next/image"

type FlightDetailsProps = {
  id: string
}

export function FlightDetails({ id }: FlightDetailsProps) {
  // In a real app, you would fetch flight details based on the ID
  const flight = {
    id,
    airline: "Japan Airlines",
    airlineLogo: "/placeholder.svg?height=40&width=40",
    flightNumber: "JL5",
    aircraft: "Boeing 777-300ER",
    departureDate: "Oct 15, 2023",
    departureTime: "10:30 AM",
    departureAirport: "JFK",
    departureCity: "New York",
    arrivalDate: "Oct 16, 2023",
    arrivalTime: "2:30 PM",
    arrivalAirport: "HND",
    arrivalCity: "Tokyo",
    duration: "14h 00m",
    stops: 0,
    price: 899,
    amenities: ["Wi-Fi", "Power Outlets", "In-flight Entertainment", "Meals"],
    baggage: "2 checked bags included",
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Flight Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-6">
          <div className="relative h-12 w-12">
            <Image
              src={flight.airlineLogo || "/placeholder.svg"}
              alt={flight.airline}
              fill
              className="object-contain"
            />
          </div>
          <div>
            <div className="font-semibold text-lg">{flight.airline}</div>
            <div className="text-sm text-gray-500">
              {flight.flightNumber} · {flight.aircraft}
            </div>
          </div>
          {flight.stops === 0 && (
            <Badge variant="outline" className="ml-auto bg-green-50 text-green-700 border-green-200">
              Nonstop
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 mb-8">
          <div>
            <div className="text-2xl font-bold">{flight.departureTime}</div>
            <div className="text-sm text-gray-500">{flight.departureDate}</div>
            <div className="font-medium mt-1">{flight.departureAirport}</div>
            <div className="text-sm text-gray-500">{flight.departureCity}</div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="text-sm text-gray-500 mb-2">{flight.duration}</div>
            <div className="w-24 h-0.5 bg-gray-300 relative">
              <div className="absolute -top-1.5 -right-1 w-3 h-3 rounded-full bg-gray-300"></div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold">{flight.arrivalTime}</div>
            <div className="text-sm text-gray-500">{flight.arrivalDate}</div>
            <div className="font-medium mt-1">{flight.arrivalAirport}</div>
            <div className="text-sm text-gray-500">{flight.arrivalCity}</div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Amenities</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Wi-Fi</span>
              </div>
              <div className="flex items-center gap-2">
                <Monitor className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Entertainment</span>
              </div>
              <div className="flex items-center gap-2">
                <Utensils className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Meals</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Power Outlets</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Baggage</h3>
            <div className="flex items-center gap-2">
              <Luggage className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{flight.baggage}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
