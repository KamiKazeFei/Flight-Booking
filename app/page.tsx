import { SearchForm } from "@/components/search/SearchForm"
import { HeroSection } from "@/components/hero-section"
import { FeaturedDestinations } from "@/components/featured-destinations"
import { WhyChooseUs } from "@/components/why-choose-us"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <div className="container mx-auto px-4 py-8">
        <SearchForm />
        <FeaturedDestinations />
        <WhyChooseUs />
      </div>
    </main>
  )
}
