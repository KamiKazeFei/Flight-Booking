"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

type SeatMapProps = {
  flightId: string
  flightType?: "outbound" | "return"
}

type SeatType = "standard" | "extra_legroom" | "premium" | "unavailable"

type Seat = {
  id: string
  number: string
  type: SeatType
  price: number
  available: boolean
}

// Generate a grid of seats
const generateSeats = (rows: number, cols: number, offset = 0, flightId: string, flightType: string): Seat[][] => {
  const letters = ["A", "B", "C", "D", "E", "F"]
  const seats: Seat[][] = []

  for (let row = 1; row <= rows; row++) {
    const currentRow: Seat[] = []
    const actualRow = row + offset

    // Determine seat type based on row
    let type: SeatType = "standard"
    let price = 0

    if (actualRow <= 5) {
      type = "premium"
      price = 45
    } else if (actualRow >= 14 && actualRow <= 16) {
      type = "extra_legroom"
      price = 25
    }

    // Make some seats unavailable randomly but consistently
    const unavailableSeats = new Set<number>()
    if (actualRow !== 1) {
      // Keep first row all available
      // Use a deterministic approach based on row and flight
      const seed = actualRow * flightId.charCodeAt(0) + (flightType === "return" ? 100 : 0)
      const numUnavailable = seed % 3 // 0, 1, or 2 seats unavailable

      for (let i = 0; i < numUnavailable; i++) {
        unavailableSeats.add((seed + i * 7) % cols)
      }
    }

    for (let col = 0; col < cols; col++) {
      const seatNumber = `${actualRow}${letters[col]}`
      currentRow.push({
        id: `${flightId}-${flightType}-${seatNumber}`,
        number: seatNumber,
        type,
        price,
        available: !unavailableSeats.has(col),
      })
    }
    seats.push(currentRow)
  }

  return seats
}

export function SeatMap({ flightId, flightType = "outbound" }: SeatMapProps) {
  const [selectedSeats, setSelectedSeats] = useState<Record<string, Seat>>({})
  const [currentPassenger, setCurrentPassenger] = useState<number>(1)
  const totalPassengers = 1 // This would come from context in a real app

  // Generate seats for different sections of the plane
  const frontSeats = generateSeats(5, 6, 0, flightId, flightType) // Premium seats (rows 1-5)
  const middleSeats = generateSeats(8, 6, 5, flightId, flightType) // Standard seats (rows 6-13)
  const exitRowSeats = generateSeats(3, 6, 13, flightId, flightType) // Exit row seats with extra legroom (rows 14-16)
  const backSeats = generateSeats(10, 6, 16, flightId, flightType) // Standard seats (rows 17-26)

  const handleSeatSelect = (seat: Seat) => {
    if (!seat.available) return

    // Check if this seat is already selected
    const existingPassenger = Object.entries(selectedSeats).find(([_, s]) => s.id === seat.id)?.[0]

    if (existingPassenger) {
      // If clicking on a seat that's already selected, deselect it
      const newSelectedSeats = { ...selectedSeats }
      delete newSelectedSeats[existingPassenger]
      setSelectedSeats(newSelectedSeats)

      // If we're deselecting the current passenger's seat, don't change the current passenger
      if (existingPassenger === `passenger-${currentPassenger}`) {
        // Do nothing to currentPassenger
      } else {
        // If we're deselecting a different passenger's seat, set current passenger to that one
        const passengerNumber = Number.parseInt(existingPassenger.split("-")[1])
        setCurrentPassenger(passengerNumber)
      }
    } else {
      // If selecting a new seat
      const passengerKey = `passenger-${currentPassenger}`

      // If this passenger already has a seat, replace it
      const newSelectedSeats = { ...selectedSeats }

      // Check if current passenger already has a seat
      const currentPassengerSeatEntry = Object.entries(newSelectedSeats).find(([key, _]) => key === passengerKey)

      if (currentPassengerSeatEntry) {
        // Replace the current passenger's seat
        delete newSelectedSeats[passengerKey]
      }

      newSelectedSeats[passengerKey] = seat
      setSelectedSeats(newSelectedSeats)

      // Move to next passenger if there are more and all current passengers have seats
      if (currentPassenger < totalPassengers && Object.keys(newSelectedSeats).length >= currentPassenger) {
        setCurrentPassenger(currentPassenger + 1)
      }
    }
  }

  const isSeatSelected = (seat: Seat) => {
    return Object.values(selectedSeats).some((s) => s.id === seat.id)
  }

  const getSeatColor = (seat: Seat) => {
    if (!seat.available) return "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
    if (isSeatSelected(seat)) return "bg-rose-600 text-white cursor-pointer"

    switch (seat.type) {
      case "premium":
        return "bg-purple-100 hover:bg-purple-200 text-purple-800 cursor-pointer"
      case "extra_legroom":
        return "bg-blue-100 hover:bg-blue-200 text-blue-800 cursor-pointer"
      default:
        return "bg-gray-100 hover:bg-gray-200 text-gray-800 cursor-pointer"
    }
  }

  const renderSeatGrid = (seats: Seat[][]) => {
    return (
      <div className="flex flex-col items-center space-y-2">
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="flex items-center">
            <div className="w-8 text-center text-sm text-gray-500">{row[0].number.replace(/[A-Z]/, "")}</div>
            <div className="flex space-x-1">{row.slice(0, 3).map((seat) => renderSeat(seat))}</div>
            <div className="w-6"></div> {/* Aisle */}
            <div className="flex space-x-1">{row.slice(3).map((seat) => renderSeat(seat))}</div>
          </div>
        ))}
      </div>
    )
  }

  const renderSeat = (seat: Seat) => {
    return (
      <button
        key={seat.id}
        className={`w-8 h-8 flex items-center justify-center text-xs font-medium rounded ${getSeatColor(seat)}`}
        onClick={() => handleSeatSelect(seat)}
        disabled={!seat.available}
        title={`Seat ${seat.number}${seat.price > 0 ? ` (+$${seat.price})` : ""}`}
      >
        {seat.number.replace(/[0-9]+/, "")}
      </button>
    )
  }

  const getTotalSeatPrice = () => {
    return Object.values(selectedSeats).reduce((total, seat) => total + seat.price, 0)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>
              Select Seats for {flightType === "outbound" ? "Outbound" : "Return"} Flight - Passenger {currentPassenger}
            </span>
            <div className="text-sm font-normal">
              Selected: {Object.keys(selectedSeats).length}/{totalPassengers}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>Click on an available seat to select it. Click again to deselect.</AlertDescription>
          </Alert>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gray-100"></div>
              <span className="text-sm">Standard</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-100"></div>
              <span className="text-sm">Extra Legroom (+$25)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-purple-100"></div>
              <span className="text-sm">Premium (+$45)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gray-300 opacity-50"></div>
              <span className="text-sm">Unavailable</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-rose-600"></div>
              <span className="text-sm">Selected</span>
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Seats</TabsTrigger>
              <TabsTrigger value="premium">Premium</TabsTrigger>
              <TabsTrigger value="extra_legroom">Extra Legroom</TabsTrigger>
              <TabsTrigger value="standard">Standard</TabsTrigger>
            </TabsList>

            <div className="overflow-x-auto pb-4">
              <div className="min-w-[300px]">
                <TabsContent value="all" className="mt-0">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-sm font-medium mb-2 text-center">Front (Premium)</h3>
                      {renderSeatGrid(frontSeats)}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2 text-center">Middle</h3>
                      {renderSeatGrid(middleSeats)}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2 text-center">Exit Rows (Extra Legroom)</h3>
                      {renderSeatGrid(exitRowSeats)}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2 text-center">Back</h3>
                      {renderSeatGrid(backSeats)}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="premium" className="mt-0">
                  <div>
                    <h3 className="text-sm font-medium mb-2 text-center">Front (Premium)</h3>
                    {renderSeatGrid(frontSeats)}
                  </div>
                </TabsContent>

                <TabsContent value="extra_legroom" className="mt-0">
                  <div>
                    <h3 className="text-sm font-medium mb-2 text-center">Exit Rows (Extra Legroom)</h3>
                    {renderSeatGrid(exitRowSeats)}
                  </div>
                </TabsContent>

                <TabsContent value="standard" className="mt-0">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-sm font-medium mb-2 text-center">Middle</h3>
                      {renderSeatGrid(middleSeats)}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2 text-center">Back</h3>
                      {renderSeatGrid(backSeats)}
                    </div>
                  </div>
                </TabsContent>
              </div>
            </div>
          </Tabs>

          <div className="mt-6 border-t pt-4">
            <h3 className="font-medium mb-2">Selected Seats</h3>
            {Object.keys(selectedSeats).length > 0 ? (
              <div className="space-y-2">
                {Object.entries(selectedSeats).map(([passenger, seat]) => (
                  <div key={passenger} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getSeatColor(seat)}>
                        {seat.number}
                      </Badge>
                      <span>
                        {passenger.replace("-", " ")} -{" "}
                        {seat.type.replace("_", " ").charAt(0).toUpperCase() + seat.type.replace("_", " ").slice(1)}
                      </span>
                    </div>
                    <div>{seat.price > 0 ? `+$${seat.price.toFixed(2)}` : "Included"}</div>
                  </div>
                ))}
                <div className="flex justify-between font-medium pt-2 border-t">
                  <div>Total seat selection:</div>
                  <div>${getTotalSeatPrice().toFixed(2)}</div>
                </div>
              </div>
            ) : (
              <div className="text-gray-500">No seats selected yet</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
