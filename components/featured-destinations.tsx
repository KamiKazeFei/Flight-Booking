import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

type Destination = {
  id: number
  name: string
  image: string
  price: number
}

const destinations: Destination[] = [
  {
    id: 1,
    name: "Tokyo, Japan",
    image: "/placeholder.svg?height=300&width=400",
    price: 899,
  },
  {
    id: 2,
    name: "Paris, France",
    image: "/placeholder.svg?height=300&width=400",
    price: 749,
  },
  {
    id: 3,
    name: "New York, USA",
    image: "/placeholder.svg?height=300&width=400",
    price: 599,
  },
  {
    id: 4,
    name: "Sydney, Australia",
    image: "/placeholder.svg?height=300&width=400",
    price: 1099,
  },
]

export function FeaturedDestinations() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Featured Destinations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((destination) => (
          <Link href="/flights" key={destination.id}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">{destination.name}</h3>
                <p className="text-rose-600 font-medium">From ${destination.price}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
