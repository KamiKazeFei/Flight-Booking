import { Button } from "@/components/ui/button"
import { Calendar, Users } from "lucide-react"

type SearchSummaryProps = {
  origin: string
  destination: string
  departDate: string
  returnDate?: string
  passengers: number
}

export function SearchSummary({ origin, destination, departDate, returnDate, passengers }: SearchSummaryProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-2">
            {origin} to {destination}
          </h2>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {departDate}
              {returnDate && ` - ${returnDate}`}
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {passengers} {passengers === 1 ? "passenger" : "passengers"}
            </div>
          </div>
        </div>
        <Button className="mt-4 md:mt-0" variant="outline">
          Modify Search
        </Button>
      </div>
    </div>
  )
}
