"use client"

import { useState } from "react"
import { SeatMap } from "@/components/seat/SeatMap"
import { Breadcrumb } from "@/components/breadcrumb"
import { PriceBreakdown } from "@/components/booking/PriceBreakdown"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAppSelector } from "@/lib/redux/hooks"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function SeatSelectionPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("outbound")
  const [showExitDialog, setShowExitDialog] = useState(false)
  const [exitTarget, setExitTarget] = useState("")

  const { tripType } = useAppSelector((state) => state.booking)

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
            { label: "Seat Selection", href: `/flights/${params.id}/seat-selection`, active: true },
          ]}
        />
        <h1 className="text-2xl font-bold mb-6">Select Your Seats</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {tripType === "roundTrip" ? (
              <Tabs defaultValue="outbound" onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="outbound">Outbound Flight</TabsTrigger>
                  <TabsTrigger value="return">Return Flight</TabsTrigger>
                </TabsList>
                <TabsContent value="outbound">
                  <SeatMap flightId={params.id} flightType="outbound" />
                </TabsContent>
                <TabsContent value="return">
                  <SeatMap flightId={params.id} flightType="return" />
                </TabsContent>
              </Tabs>
            ) : (
              <SeatMap flightId={params.id} flightType="outbound" />
            )}
            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={() => handleNavigation(`/flights/${params.id}`)}>
                Back to Flight Details
              </Button>
              <Button
                className="bg-rose-600 hover:bg-rose-700 text-white"
                onClick={() => handleNavigation(`/flights/${params.id}/baggage-selection`)}
              >
                Continue to Baggage Selection
              </Button>
            </div>
          </div>
          <div className="lg:col-span-1">
            <PriceBreakdown showSeats={true} />
          </div>
        </div>
      </div>

      {/* Exit confirmation dialog */}
      <Dialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leave this page?</DialogTitle>
            <DialogDescription>
              You have unsaved changes. Are you sure you want to leave this page? Your seat selection may be lost.
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
