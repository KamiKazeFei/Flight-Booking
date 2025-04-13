import { MealOptions } from "@/components/meal-options"
import { Breadcrumb } from "@/components/breadcrumb"
import { PriceBreakdown } from "@/components/price-breakdown"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function MealSelectionPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Flight Search", href: "/flights" },
            { label: "Flight Details", href: `/flights/${params.id}` },
            { label: "Seat Selection", href: `/flights/${params.id}/seat-selection` },
            { label: "Baggage Selection", href: `/flights/${params.id}/baggage-selection` },
            { label: "Meal Selection", href: `/flights/${params.id}/meal-selection`, active: true },
          ]}
        />
        <h1 className="text-2xl font-bold mb-6">Select Your Meals</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MealOptions flightId={params.id} />
            <div className="mt-6 flex justify-between">
              <Link href={`/flights/${params.id}/baggage-selection`}>
                <Button variant="outline">Back to Baggage Selection</Button>
              </Link>
              <Link href={`/flights/${params.id}/insurance-selection`}>
                <Button className="bg-rose-600 hover:bg-rose-700 text-white">Continue to Insurance Selection</Button>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-1">
            <PriceBreakdown showSeats={true} showBaggage={true} showMeals={true} />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
