import { FlightResults } from "@/components/flight-results"
import { FilterSidebar } from "@/components/filter-sidebar"
import { SearchSummary } from "@/components/search-summary"
import { Breadcrumb } from "@/components/breadcrumb"
import { Footer } from "@/components/footer"

export default function FlightsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Flight Search", href: "/flights", active: true },
          ]}
        />
        <SearchSummary
          origin="New York (JFK)"
          destination="Tokyo (HND)"
          departDate="Oct 15, 2023"
          returnDate="Oct 25, 2023"
          passengers={1}
        />
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          <div className="w-full md:w-1/4">
            <FilterSidebar />
          </div>
          <div className="w-full md:w-3/4">
            <FlightResults />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
