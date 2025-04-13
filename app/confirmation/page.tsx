import { BookingConfirmation } from "@/components/booking-confirmation"
import { Breadcrumb } from "@/components/breadcrumb"
import { Footer } from "@/components/footer"

export default function ConfirmationPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Flight Search", href: "/flights" },
            { label: "Flight Details", href: "/flights/123" },
            { label: "Confirmation", href: "/confirmation", active: true },
          ]}
        />
        <BookingConfirmation />
      </div>
      <Footer />
    </main>
  )
}
