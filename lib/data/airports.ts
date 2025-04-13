export type Airport = {
  code: string
  name: string
  city: string
  country: string
}

export const airports: Airport[] = [
  // North America
  { code: "JFK", name: "John F. Kennedy International Airport", city: "New York", country: "United States" },
  { code: "LAX", name: "Los Angeles International Airport", city: "Los Angeles", country: "United States" },
  { code: "ORD", name: "O'Hare International Airport", city: "Chicago", country: "United States" },
  { code: "DFW", name: "Dallas/Fort Worth International Airport", city: "Dallas", country: "United States" },
  { code: "DEN", name: "Denver International Airport", city: "Denver", country: "United States" },
  { code: "ATL", name: "Hartsfield-Jackson Atlanta International Airport", city: "Atlanta", country: "United States" },
  { code: "SFO", name: "San Francisco International Airport", city: "San Francisco", country: "United States" },
  { code: "SEA", name: "Seattle-Tacoma International Airport", city: "Seattle", country: "United States" },
  { code: "MIA", name: "Miami International Airport", city: "Miami", country: "United States" },
  { code: "YYZ", name: "Toronto Pearson International Airport", city: "Toronto", country: "Canada" },
  { code: "YVR", name: "Vancouver International Airport", city: "Vancouver", country: "Canada" },
  { code: "YUL", name: "Montréal-Pierre Elliott Trudeau International Airport", city: "Montreal", country: "Canada" },
  { code: "MEX", name: "Mexico City International Airport", city: "Mexico City", country: "Mexico" },

  // Europe
  { code: "LHR", name: "London Heathrow Airport", city: "London", country: "United Kingdom" },
  { code: "CDG", name: "Charles de Gaulle Airport", city: "Paris", country: "France" },
  { code: "FRA", name: "Frankfurt Airport", city: "Frankfurt", country: "Germany" },
  { code: "AMS", name: "Amsterdam Airport Schiphol", city: "Amsterdam", country: "Netherlands" },
  { code: "MAD", name: "Adolfo Suárez Madrid–Barajas Airport", city: "Madrid", country: "Spain" },
  { code: "FCO", name: "Leonardo da Vinci–Fiumicino Airport", city: "Rome", country: "Italy" },
  { code: "IST", name: "Istanbul Airport", city: "Istanbul", country: "Turkey" },
  { code: "ZRH", name: "Zurich Airport", city: "Zurich", country: "Switzerland" },
  { code: "MUC", name: "Munich Airport", city: "Munich", country: "Germany" },
  { code: "ARN", name: "Stockholm Arlanda Airport", city: "Stockholm", country: "Sweden" },

  // Asia
  { code: "HND", name: "Tokyo Haneda Airport", city: "Tokyo", country: "Japan" },
  { code: "NRT", name: "Narita International Airport", city: "Tokyo", country: "Japan" },
  { code: "PEK", name: "Beijing Capital International Airport", city: "Beijing", country: "China" },
  { code: "PVG", name: "Shanghai Pudong International Airport", city: "Shanghai", country: "China" },
  { code: "HKG", name: "Hong Kong International Airport", city: "Hong Kong", country: "China" },
  { code: "ICN", name: "Incheon International Airport", city: "Seoul", country: "South Korea" },
  { code: "SIN", name: "Singapore Changi Airport", city: "Singapore", country: "Singapore" },
  { code: "BKK", name: "Suvarnabhumi Airport", city: "Bangkok", country: "Thailand" },
  { code: "DEL", name: "Indira Gandhi International Airport", city: "Delhi", country: "India" },
  { code: "DXB", name: "Dubai International Airport", city: "Dubai", country: "United Arab Emirates" },

  // Australia & Oceania
  { code: "SYD", name: "Sydney Airport", city: "Sydney", country: "Australia" },
  { code: "MEL", name: "Melbourne Airport", city: "Melbourne", country: "Australia" },
  { code: "BNE", name: "Brisbane Airport", city: "Brisbane", country: "Australia" },
  { code: "PER", name: "Perth Airport", city: "Perth", country: "Australia" },
  { code: "AKL", name: "Auckland Airport", city: "Auckland", country: "New Zealand" },

  // South America
  { code: "GRU", name: "São Paulo–Guarulhos International Airport", city: "São Paulo", country: "Brazil" },
  { code: "EZE", name: "Ministro Pistarini International Airport", city: "Buenos Aires", country: "Argentina" },
  { code: "SCL", name: "Santiago International Airport", city: "Santiago", country: "Chile" },
  { code: "BOG", name: "El Dorado International Airport", city: "Bogotá", country: "Colombia" },
  { code: "LIM", name: "Jorge Chávez International Airport", city: "Lima", country: "Peru" },

  // Africa
  { code: "JNB", name: "O.R. Tambo International Airport", city: "Johannesburg", country: "South Africa" },
  { code: "CAI", name: "Cairo International Airport", city: "Cairo", country: "Egypt" },
  { code: "CPT", name: "Cape Town International Airport", city: "Cape Town", country: "South Africa" },
  { code: "ADD", name: "Addis Ababa Bole International Airport", city: "Addis Ababa", country: "Ethiopia" },
  { code: "NBO", name: "Jomo Kenyatta International Airport", city: "Nairobi", country: "Kenya" },
]

// Group airports by country
export const airportsByCountry = airports.reduce<Record<string, Airport[]>>((acc, airport) => {
  if (!acc[airport.country]) {
    acc[airport.country] = []
  }
  acc[airport.country].push(airport)
  return acc
}, {})

// Get countries list
export const countries = Object.keys(airportsByCountry).sort()
