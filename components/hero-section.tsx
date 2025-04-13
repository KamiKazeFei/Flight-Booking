import Image from "next/image"

export function HeroSection() {
  return (
    <div className="relative h-[600px] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=600&width=1600"
          alt="Airplane flying over a beautiful destination"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Discover the World with SkyJourney</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl">
          Find and book the best flight deals to your dream destinations
        </p>
      </div>
    </div>
  )
}
