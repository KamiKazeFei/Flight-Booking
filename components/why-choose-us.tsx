import { Shield, CreditCard, HeadphonesIcon, Plane } from "lucide-react"

const features = [
  {
    icon: <Shield className="h-10 w-10 text-rose-600" />,
    title: "Secure Booking",
    description: "Your payment and personal information are always protected",
  },
  {
    icon: <CreditCard className="h-10 w-10 text-rose-600" />,
    title: "Best Price Guarantee",
    description: "Find a lower price? We'll match it plus give you 10% off",
  },
  {
    icon: <HeadphonesIcon className="h-10 w-10 text-rose-600" />,
    title: "24/7 Support",
    description: "Our customer service team is always ready to help you",
  },
  {
    icon: <Plane className="h-10 w-10 text-rose-600" />,
    title: "Wide Selection",
    description: "Over 500 airlines and 100,000 routes worldwide",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
