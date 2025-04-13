"use client"

import { useState, useEffect, useRef } from "react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown, Plane } from "lucide-react"
import { cn } from "@/lib/utils"
import { airports } from "@/lib/data/airports"
import type { Airport } from "@/lib/redux/slices/bookingSlice"

interface AirportSelectProps {
  value: Airport | null
  onChange: (airport: Airport) => void
  placeholder: string
  excludeAirport?: Airport | null
}

export function AirportSelect({ value, onChange, placeholder, excludeAirport }: AirportSelectProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  // Filter out the excluded airport
  const filteredAirports = excludeAirport
    ? airports.filter((airport) => airport.code !== excludeAirport.code)
    : airports

  // Filter airports based on search query
  const getFilteredAirports = () => {
    if (!searchQuery) return filteredAirports

    const query = searchQuery.toLowerCase()
    return filteredAirports.filter(
      (airport) =>
        airport.code.toLowerCase().includes(query) ||
        airport.name.toLowerCase().includes(query) ||
        airport.city.toLowerCase().includes(query) ||
        airport.country.toLowerCase().includes(query),
    )
  }

  // Group filtered airports by country
  const getGroupedAirports = () => {
    const filtered = getFilteredAirports()
    return filtered.reduce<Record<string, Airport[]>>((acc, airport) => {
      if (!acc[airport.country]) {
        acc[airport.country] = []
      }
      acc[airport.country].push(airport)
      return acc
    }, {})
  }

  const groupedAirports = getGroupedAirports()
  const groupedCountries = Object.keys(groupedAirports).sort()

  // Focus input when popover opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [open])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-auto py-2 px-3 text-left font-normal"
        >
          <div className="flex items-center gap-2">
            <Plane className="h-4 w-4 text-gray-500" />
            {value ? (
              <div className="flex flex-col">
                <span className="font-medium">
                  {value.city} ({value.code})
                </span>
                <span className="text-xs text-gray-500">{value.name}</span>
              </div>
            ) : (
              <span className="text-gray-500">{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Search airport..."
            ref={inputRef}
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>No airports found.</CommandEmpty>
            {groupedCountries.map((country) => (
              <CommandGroup key={country} heading={country}>
                {groupedAirports[country].map((airport) => (
                  <CommandItem
                    key={airport.code}
                    value={`${airport.code}-${airport.city}`}
                    onSelect={() => {
                      onChange(airport)
                      setOpen(false)
                      setSearchQuery("")
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", value?.code === airport.code ? "opacity-100" : "opacity-0")} />
                    <div className="flex flex-col">
                      <span>
                        {airport.city} ({airport.code})
                      </span>
                      <span className="text-xs text-gray-500 truncate">{airport.name}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
