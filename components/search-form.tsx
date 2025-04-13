"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Plane, ArrowRightLeft, Users } from "lucide-react"
import { format } from "date-fns"

export function SearchForm() {
  const router = useRouter()
  const [tripType, setTripType] = useState("roundTrip")
  const [departDate, setDepartDate] = useState<Date | undefined>(new Date())
  const [returnDate, setReturnDate] = useState<Date | undefined>(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
  const [passengers, setPassengers] = useState("1")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/flights")
  }

  return (
    <Card className="mt-[-50px] z-20 relative shadow-lg">
      <CardContent className="p-6">
        <form onSubmit={handleSearch}>
          <div className="mb-4">
            <RadioGroup defaultValue="roundTrip" className="flex space-x-4" onValueChange={setTripType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="roundTrip" id="roundTrip" />
                <Label htmlFor="roundTrip">Round Trip</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="oneWay" id="oneWay" />
                <Label htmlFor="oneWay">One Way</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="multiCity" id="multiCity" />
                <Label htmlFor="multiCity">Multi-City</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="relative">
              <Label htmlFor="from">From</Label>
              <div className="relative">
                <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input id="from" placeholder="City or Airport" className="pl-10" defaultValue="New York (JFK)" />
              </div>
            </div>
            <div className="relative">
              <Label htmlFor="to">To</Label>
              <div className="relative">
                <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input id="to" placeholder="City or Airport" className="pl-10" defaultValue="Tokyo (HND)" />
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-white md:flex hidden"
              >
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <Label htmlFor="depart">Depart</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {departDate ? format(departDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={departDate} onSelect={setDepartDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            {tripType === "roundTrip" && (
              <div>
                <Label htmlFor="return">Return</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {returnDate ? format(returnDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={returnDate} onSelect={setReturnDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            )}
            <div>
              <Label htmlFor="passengers">Passengers</Label>
              <Select defaultValue="1" onValueChange={setPassengers}>
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

          <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700 text-white">
            Search Flights
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
