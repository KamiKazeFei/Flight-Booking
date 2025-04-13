import { FlightDetails } from "@/components/flight-details"
import { Breadcrumb } from "@/components/breadcrumb"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FlightDetailsPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Flight Search", href: "/flights" },
            { label: "Flight Details", href: `/flights/${params.id}`, active: true },
          ]}
        />
        <h1 className="text-2xl font-bold mb-6">Flight Details</h1>
        <div className="grid grid-cols-1 gap-6">
          <FlightDetails id={params.id} />
          <div className="flex justify-end">
            <Link href={`/flights/${params.id}/seat-selection`}>
              <Button className="bg-rose-600 hover:bg-rose-700 text-white">Continue to Seat Selection</Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
