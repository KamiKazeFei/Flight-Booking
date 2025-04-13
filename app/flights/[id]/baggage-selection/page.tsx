"use client"

import { useState } from "react"
import { BaggageOptions } from "@/components/baggage-options"
import { Breadcrumb } from "@/components/breadcrumb"
import { PriceBreakdown } from "@/components/booking/PriceBreakdown"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function BaggageSelectionPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [showExitDialog, setShowExitDialog] = useState(false)
  const [exitTarget, setExitTarget] = useState("")

  // Handle navigation away from the page
  const handleNavigation = (path: string) => {
    setExitTarget(path)
    setShowExitDialog(true)
  }

  // Confirm navigation
  const confirmNavigation = () => {
    router.push(exitTarget)
    setShowExitDialog(false)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Flight Search", href: "/flights" },
            { label: "Flight Details", href: `/flights/${params.id}` },
            { label: "Seat Selection", href: `/flights/${params.id}/seat-selection` },
            { label: "Baggage Selection", href: `/flights/${params.id}/baggage-selection`, active: true },
          ]}
        />
        <h1 className="text-2xl font-bold mb-6">Select Your Baggage</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <BaggageOptions flightId={params.id} />
            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={() => handleNavigation(`/flights/${params.id}/seat-selection`)}>
                Back to Seat Selection
              </Button>
              <Button
                className="bg-rose-600 hover:bg-rose-700 text-white"
                onClick={() => handleNavigation(`/flights/${params.id}/meal-selection`)}
              >
                Continue to Meal Selection
              </Button>
            </div>
          </div>
          <div className="lg:col-span-1">
            <PriceBreakdown showSeats={true} showBaggage={true} />
          </div>
        </div>
      </div>

      {/* Exit confirmation dialog */}
      <Dialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leave this page?</DialogTitle>
            <DialogDescription>
              You have unsaved changes. Are you sure you want to leave this page? Your baggage selection may be lost.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExitDialog(false)}>
              Stay on this page
            </Button>
            <Button className="bg-rose-600 hover:bg-rose-700" onClick={confirmNavigation}>
              Leave anyway
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
