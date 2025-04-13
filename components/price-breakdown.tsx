"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { InfoIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

type PriceBreakdownProps = {
  showSeats?: boolean
  showBaggage?: boolean
  showMeals?: boolean
  showInsurance?: boolean
}

export function PriceBreakdown({
  showSeats = false,
  showBaggage = false,
  showMeals = false,
  showInsurance = false,
}: PriceBreakdownProps) {
  const [total, setTotal] = useState(934)
  const pathname = usePathname()

  // Check if we're on the passenger info page (final page before payment)
  const isPassengerInfoPage = pathname?.includes("/passenger-info")

  // In a real app, these would come from a context or state management
  const baseFare = 799
  const taxesAndFees = 100
  const seatSelectionFee = showSeats ? 45 : 0
  const baggageFee = showBaggage ? 35 : 0
  const mealSelectionFee = showMeals ? 15 : 0
  const insuranceFee = showInsurance ? 35 : 0

  useEffect(() => {
    // Calculate total based on selected options
    const newTotal = baseFare + taxesAndFees + seatSelectionFee + baggageFee + mealSelectionFee + insuranceFee
    setTotal(newTotal)
  }, [
    showSeats,
    showBaggage,
    showMeals,
    showInsurance,
    baseFare,
    taxesAndFees,
    seatSelectionFee,
    baggageFee,
    mealSelectionFee,
    insuranceFee,
  ])

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle>Price Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <div>Base fare</div>
            <div>${baseFare.toFixed(2)}</div>
          </div>
          <div className="flex justify-between">
            <div>Taxes & fees</div>
            <div>${taxesAndFees.toFixed(2)}</div>
          </div>

          {showSeats && (
            <div className="flex justify-between">
              <div>Seat selection</div>
              <div>${seatSelectionFee.toFixed(2)}</div>
            </div>
          )}

          {showBaggage && (
            <div className="flex justify-between">
              <div>Baggage</div>
              <div>${baggageFee.toFixed(2)}</div>
            </div>
          )}

          {showMeals && (
            <div className="flex justify-between">
              <div>Meal selection</div>
              <div>${mealSelectionFee.toFixed(2)}</div>
            </div>
          )}

          {showInsurance && (
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span>Travel insurance</span>
                <InfoIcon className="h-4 w-4 ml-1 text-gray-500" />
              </div>
              <div>${insuranceFee.toFixed(2)}</div>
            </div>
          )}

          {!showInsurance && (
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span>Travel insurance</span>
                <InfoIcon className="h-4 w-4 ml-1 text-gray-500" />
              </div>
              <div>$35.00</div>
            </div>
          )}

          <Separator />

          <div className="flex justify-between font-semibold text-lg">
            <div>Total</div>
            <div>${total.toFixed(2)}</div>
          </div>

          <div className="text-sm text-gray-500">Price shown is per person</div>

          <div className="bg-green-50 p-3 rounded-md text-sm text-green-700 flex items-start space-x-2">
            <div className="font-medium">Price Guarantee:</div>
            <div>The price you see is the price you pay. We don't charge any hidden fees.</div>
          </div>

          {isPassengerInfoPage && (
            <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white">Continue to Payment</Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
