"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon, Luggage, ShoppingBag } from "lucide-react"
import Image from "next/image"

type BaggageOptionsProps = {
  flightId: string
}

type BaggageOption = {
  id: string
  name: string
  description: string
  carryOn: string
  checked: string
  price: number
}

const baggageOptions: BaggageOption[] = [
  {
    id: "basic",
    name: "Basic",
    description: "Perfect for short trips with minimal luggage",
    carryOn: "1 personal item (fits under seat)",
    checked: "No checked bags",
    price: 0,
  },
  {
    id: "standard",
    name: "Standard",
    description: "Our most popular option for most travelers",
    carryOn: "1 carry-on bag + 1 personal item",
    checked: "1 checked bag (up to 23kg)",
    price: 35,
  },
  {
    id: "premium",
    name: "Premium",
    description: "Ideal for longer trips or when you need extra space",
    carryOn: "1 carry-on bag + 1 personal item",
    checked: "2 checked bags (up to 23kg each)",
    price: 65,
  },
]

const extraBaggageOptions = [
  { id: "extra1", name: "Additional checked bag (23kg)", price: 50 },
  { id: "extra2", name: "Overweight bag fee (23-32kg)", price: 75 },
  { id: "extra3", name: "Sports equipment", price: 60 },
  { id: "extra4", name: "Musical instrument", price: 60 },
]

export function BaggageOptions({ flightId }: BaggageOptionsProps) {
  const [selectedOption, setSelectedOption] = useState<string>("standard")
  const [extraBaggage, setExtraBaggage] = useState<string[]>([])

  const handleExtraBaggageChange = (id: string) => {
    if (extraBaggage.includes(id)) {
      setExtraBaggage(extraBaggage.filter((item) => item !== id))
    } else {
      setExtraBaggage([...extraBaggage, id])
    }
  }

  const getSelectedBaggageOption = () => {
    return baggageOptions.find((option) => option.id === selectedOption)
  }

  const getExtraBaggageTotal = () => {
    return extraBaggage.reduce((total, id) => {
      const option = extraBaggageOptions.find((opt) => opt.id === id)
      return total + (option?.price || 0)
    }, 0)
  }

  const getTotalPrice = () => {
    const basePrice = getSelectedBaggageOption()?.price || 0
    const extraPrice = getExtraBaggageTotal()
    return basePrice + extraPrice
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Baggage Options</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>
              Select a baggage option that best fits your travel needs. You can also add extra baggage if needed.
            </AlertDescription>
          </Alert>

          <RadioGroup value={selectedOption} onValueChange={setSelectedOption} className="space-y-4">
            {baggageOptions.map((option) => (
              <div key={option.id} className="flex">
                <RadioGroupItem value={option.id} id={option.id} className="mt-3" />
                <div className="ml-3 flex-1 cursor-pointer" onClick={() => setSelectedOption(option.id)}>
                  <div className="flex justify-between">
                    <Label htmlFor={option.id} className="text-base font-medium">
                      {option.name}
                    </Label>
                    <div className="font-medium">{option.price === 0 ? "Included" : `+$${option.price}`}</div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div className="flex items-start gap-2">
                      <ShoppingBag className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <div className="font-medium text-sm">Carry-on</div>
                        <div className="text-sm text-gray-500">{option.carryOn}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Luggage className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <div className="font-medium text-sm">Checked</div>
                        <div className="text-sm text-gray-500">{option.checked}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </RadioGroup>

          <Separator className="my-6" />

          <div>
            <h3 className="font-medium mb-4">Additional Baggage Options</h3>
            <div className="space-y-4">
              {extraBaggageOptions.map((option) => (
                <div key={option.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={option.id}
                      checked={extraBaggage.includes(option.id)}
                      onChange={() => handleExtraBaggageChange(option.id)}
                      className="h-4 w-4 rounded border-gray-300 text-rose-600 focus:ring-rose-600"
                    />
                    <label htmlFor={option.id} className="ml-2 text-sm">
                      {option.name}
                    </label>
                  </div>
                  <div className="font-medium">+${option.price}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t pt-4">
            <h3 className="font-medium mb-2">Baggage Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <div>{getSelectedBaggageOption()?.name} package</div>
                <div>
                  {getSelectedBaggageOption()?.price === 0
                    ? "Included"
                    : `$${getSelectedBaggageOption()?.price.toFixed(2)}`}
                </div>
              </div>

              {extraBaggage.length > 0 && (
                <>
                  {extraBaggage.map((id) => {
                    const option = extraBaggageOptions.find((opt) => opt.id === id)
                    return (
                      <div key={id} className="flex justify-between text-sm">
                        <div>{option?.name}</div>
                        <div>${option?.price.toFixed(2)}</div>
                      </div>
                    )
                  })}
                </>
              )}

              <div className="flex justify-between font-medium pt-2 border-t">
                <div>Total baggage:</div>
                <div>${getTotalPrice().toFixed(2)}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Baggage Policies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="relative h-16 w-16 flex-shrink-0">
                <Image src="/placeholder.svg?height=64&width=64" alt="Size guide" fill className="object-contain" />
              </div>
              <div>
                <h3 className="font-medium">Size and Weight Restrictions</h3>
                <p className="text-sm text-gray-500">
                  Carry-on: Max 22 x 14 x 9 inches (56 x 36 x 23 cm), up to 10kg
                  <br />
                  Checked: Max 62 linear inches (158 cm), up to 23kg
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="relative h-16 w-16 flex-shrink-0">
                <Image
                  src="/placeholder.svg?height=64&width=64"
                  alt="Prohibited items"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-medium">Prohibited Items</h3>
                <p className="text-sm text-gray-500">
                  Certain items are not allowed in carry-on or checked baggage. Please review our complete list of
                  prohibited items before packing.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
