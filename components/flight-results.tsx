import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Clock, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const flights = [
  {
    id: "1",
    airline: "Japan Airlines",
    airlineLogo: "/placeholder.svg?height=40&width=40",
    flightNumber: "JL5",
    departureTime: "10:30 AM",
    departureAirport: "JFK",
    arrivalTime: "2:30 PM",
    arrivalAirport: "HND",
    duration: "14h 00m",
    stops: 0,
    price: 899,
    bestDeal: true,
  },
  {
    id: "2",
    airline: "ANA",
    airlineLogo: "/placeholder.svg?height=40&width=40",
    flightNumber: "NH10",
    departureTime: "1:45 PM",
    departureAirport: "JFK",
    arrivalTime: "5:15 PM",
    arrivalAirport: "HND",
    duration: "13h 30m",
    stops: 0,
    price: 949,
    bestDeal: false,
  },
  {
    id: "3",
    airline: "United Airlines",
    airlineLogo: "/placeholder.svg?height=40&width=40",
    flightNumber: "UA79",
    departureTime: "11:15 AM",
    departureAirport: "JFK",
    arrivalTime: "4:45 PM",
    arrivalAirport: "HND",
    duration: "15h 30m",
    stops: 1,
    stopAirport: "SFO",
    price: 799,
    bestDeal: false,
  },
  {
    id: "4",
    airline: "Delta",
    airlineLogo: "/placeholder.svg?height=40&width=40",
    flightNumber: "DL167",
    departureTime: "9:00 AM",
    departureAirport: "JFK",
    arrivalTime: "1:30 PM",
    arrivalAirport: "HND",
    duration: "14h 30m",
    stops: 1,
    stopAirport: "SEA",
    price: 849,
    bestDeal: false,
  },
]

export function FlightResults() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">4 flights found</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <Tabs defaultValue="price">
            <TabsList>
              <TabsTrigger value="price">Price</TabsTrigger>
              <TabsTrigger value="duration">Duration</TabsTrigger>
              <TabsTrigger value="departure">Departure</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="space-y-4">
        {flights.map((flight) => (
          <Card key={flight.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] border-b border-gray-200">
                <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 items-center">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10">
                      <Image
                        src={flight.airlineLogo || "/placeholder.svg"}
                        alt={flight.airline}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{flight.airline}</div>
                      <div className="text-sm text-gray-500">{flight.flightNumber}</div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between md:justify-center gap-2 md:gap-8">
                    <div className="text-center">
                      <div className="text-lg font-semibold">{flight.departureTime}</div>
                      <div className="text-sm text-gray-500">{flight.departureAirport}</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-xs text-gray-500 mb-1">{flight.duration}</div>
                      <div className="relative w-24 md:w-32">
                        <div className="border-t border-gray-300 absolute w-full top-1/2"></div>
                        <ArrowRight className="h-4 w-4 text-gray-400 absolute right-0 top-1/2 transform -translate-y-1/2" />
                      </div>
                      {flight.stops > 0 && (
                        <div className="text-xs text-gray-500 mt-1">
                          {flight.stops} stop ({flight.stopAirport})
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold">{flight.arrivalTime}</div>
                      <div className="text-sm text-gray-500">{flight.arrivalAirport}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {flight.stops === 0 && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Nonstop
                      </Badge>
                    )}
                    {flight.bestDeal && <Badge className="bg-rose-100 text-rose-700 border-rose-200">Best Deal</Badge>}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 md:p-6 flex flex-col justify-between">
                  <div className="text-right">
                    <div className="text-2xl font-bold">${flight.price}</div>
                    <div className="text-sm text-gray-500">Round trip / person</div>
                  </div>
                  <Link href={`/flights/${flight.id}`}>
                    <Button className="mt-4 w-full bg-rose-600 hover:bg-rose-700 text-white">Select</Button>
                  </Link>
                </div>
              </div>

              <div className="p-4 flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  Flight details
                </div>
                <div className="text-rose-600">Baggage included</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
