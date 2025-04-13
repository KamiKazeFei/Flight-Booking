import { PassengerForm } from "@/components/passenger-form"
import { PriceBreakdown } from "@/components/price-breakdown"
import { Breadcrumb } from "@/components/breadcrumb"
import { Footer } from "@/components/footer"

export default function PassengerInfoPage({ params }: { params: { id: string } }) {
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
            { label: "Meal Selection", href: `/flights/${params.id}/meal-selection` },
            { label: "Insurance Selection", href: `/flights/${params.id}/insurance-selection` },
            { label: "Passenger Information", href: `/flights/${params.id}/passenger-info`, active: true },
          ]}
        />
        <h1 className="text-2xl font-bold mb-6">Passenger Information</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PassengerForm flightId={params.id} />
          </div>
          <div className="lg:col-span-1">
            <PriceBreakdown showSeats={true} showBaggage={true} showMeals={true} showInsurance={true} />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
