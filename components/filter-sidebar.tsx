"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FilterSidebar() {
  const [priceRange, setPriceRange] = useState([200, 1000])

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Filter Results</h3>

      <Accordion type="multiple" defaultValue={["price", "stops", "airlines", "times"]}>
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="py-2">
              <Slider
                defaultValue={priceRange}
                min={100}
                max={2000}
                step={50}
                onValueChange={(value) => setPriceRange(value as number[])}
              />
              <div className="flex justify-between mt-2 text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="stops">
          <AccordionTrigger>Stops</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="nonstop" />
                <Label htmlFor="nonstop">Nonstop</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="1stop" />
                <Label htmlFor="1stop">1 Stop</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="2plusstops" />
                <Label htmlFor="2plusstops">2+ Stops</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="airlines">
          <AccordionTrigger>Airlines</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="airline1" />
                <Label htmlFor="airline1">Japan Airlines</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="airline2" />
                <Label htmlFor="airline2">ANA</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="airline3" />
                <Label htmlFor="airline3">United Airlines</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="airline4" />
                <Label htmlFor="airline4">Delta</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="airline5" />
                <Label htmlFor="airline5">American Airlines</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="times">
          <AccordionTrigger>Departure Times</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="early" />
                <Label htmlFor="early">Early Morning (12am - 6am)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="morning" />
                <Label htmlFor="morning">Morning (6am - 12pm)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="afternoon" />
                <Label htmlFor="afternoon">Afternoon (12pm - 6pm)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="evening" />
                <Label htmlFor="evening">Evening (6pm - 12am)</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button className="w-full mt-6">Apply Filters</Button>
    </div>
  )
}
