"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, ArrowRightLeft, Users } from "lucide-react"
import { format } from "date-fns"
import { AirportSelect } from "@/components/search/AirportSelect"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import {
  setOrigin,
  setDestination,
  swapOriginDestination,
  setDepartDate,
  setReturnDate,
  setPassengers,
  setTripType,
} from "@/lib/redux/slices/bookingSlice"
import { airports } from "@/lib/data/airports"

export function SearchForm() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { origin, destination, departDate, returnDate, passengers, tripType } = useAppSelector((state) => state.booking)

  const [departDateObj, setDepartDateObj] = useState<Date | undefined>(departDate ? new Date(departDate) : new Date())
  const [returnDateObj, setReturnDateObj] = useState<Date | undefined>(
    returnDate ? new Date(returnDate) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  )
  const [dateError, setDateError] = useState<string | null>(null)

  // Initialize with default values if not set
  useEffect(() => {
    if (!origin) {
      dispatch(setOrigin(airports.find((a) => a.code === "JFK")!))
    }
    if (!destination) {
      dispatch(setDestination(airports.find((a) => a.code === "HND")!))
    }
  }, [dispatch, origin, destination])

  const handleDepartDateChange = (date: Date | undefined) => {
    if (date) {
      setDepartDateObj(date)
      dispatch(setDepartDate(date.toISOString()))

      // Validate return date is after depart date
      if (returnDateObj && date > returnDateObj) {
        setDateError("Return date must be after departure date")
      } else {
        setDateError(null)
      }
    }
  }

  const handleReturnDateChange = (date: Date | undefined) => {
    if (date) {
      setReturnDateObj(date)
      dispatch(setReturnDate(date.toISOString()))

      // Validate return date is after depart date
      if (departDateObj && date < departDateObj) {
        setDateError("Return date must be after departure date")
      } else {
        setDateError(null)
      }
    }
  }

  const handleSwapLocations = () => {
    dispatch(swapOriginDestination())
  }

  const handleTripTypeChange = (value: string) => {
    dispatch(setTripType(value as "roundTrip" | "oneWay"))
  }

  const handlePassengersChange = (value: string) => {
    dispatch(setPassengers(Number.parseInt(value)))
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form before submission
    if (tripType === "roundTrip" && departDateObj && returnDateObj) {
      if (departDateObj > returnDateObj) {
        setDateError("Return date must be after departure date")
        return
      }
    }

    router.push("/flights")
  }

  return (
    <Card className="mt-[-50px] z-20 relative shadow-lg">
      <CardContent className="p-6">
        <form onSubmit={handleSearch}>
          <div className="mb-4">
            <RadioGroup defaultValue={tripType} className="flex space-x-4" onValueChange={handleTripTypeChange}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="roundTrip" id="roundTrip" />
                <Label htmlFor="roundTrip">Round Trip</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="oneWay" id="oneWay" />
                <Label htmlFor="oneWay">One Way</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="relative">
              <Label htmlFor="from" className="mb-1 block">
                From
              </Label>
              <AirportSelect
                value={origin}
                onChange={(airport) => dispatch(setOrigin(airport))}
                placeholder="Select departure airport"
                excludeAirport={destination}
              />
            </div>
            <div className="relative">
              <Label htmlFor="to" className="mb-1 block">
                To
              </Label>
              <AirportSelect
                value={destination}
                onChange={(airport) => dispatch(setDestination(airport))}
                placeholder="Select arrival airport"
                excludeAirport={origin}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 translate-y-1 rounded-full bg-white md:flex hidden"
                onClick={handleSwapLocations}
              >
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <Label htmlFor="depart" className="mb-1 block">
                Depart
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {departDateObj ? format(departDateObj, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={departDateObj}
                    onSelect={handleDepartDateChange}
                    initialFocus
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  />
                </PopoverContent>
              </Popover>
            </div>
            {tripType === "roundTrip" && (
              <div>
                <Label htmlFor="return" className="mb-1 block">
                  Return
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {returnDateObj ? format(returnDateObj, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={returnDateObj}
                      onSelect={handleReturnDateChange}
                      initialFocus
                      disabled={(date) =>
                        departDateObj ? date < departDateObj : date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
            <div>
              <Label htmlFor="passengers" className="mb-1 block">
                Passengers
              </Label>
              <Select defaultValue={passengers.toString()} onValueChange={handlePassengersChange}>
                <SelectTrigger className="w-full">
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4 text-gray-500" />
                    <SelectValue placeholder="Select" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Passenger</SelectItem>
                  <SelectItem value="2">2 Passengers</SelectItem>
                  <SelectItem value="3">3 Passengers</SelectItem>
                  <SelectItem value="4">4 Passengers</SelectItem>
                  <SelectItem value="5">5+ Passengers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {dateError && <div className="text-red-500 text-sm mb-4">{dateError}</div>}

          <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700 text-white">
            Search Flights
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
