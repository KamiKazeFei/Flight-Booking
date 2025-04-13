"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon, Utensils } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

type MealOptionsProps = {
  flightId: string
}

type MealOption = {
  id: string
  name: string
  description: string
  image: string
  price: number
  tags: string[]
}

type SpecialDietOption = {
  id: string
  name: string
  description: string
  price: number
}

type BeverageOption = {
  id: string
  name: string
  description: string
  price: number
}

const mealOptions: MealOption[] = [
  {
    id: "standard",
    name: "Standard Meal",
    description: "Our regular in-flight meal with a selection of seasonal ingredients",
    image: "/placeholder.svg?height=80&width=120",
    price: 0,
    tags: ["Included"],
  },
  {
    id: "premium",
    name: "Premium Meal",
    description: "Upgraded meal with premium ingredients and a wider selection of sides",
    image: "/placeholder.svg?height=80&width=120",
    price: 15,
    tags: ["Premium", "Chef Selection"],
  },
  {
    id: "gourmet",
    name: "Gourmet Dining",
    description: "Restaurant-quality dining experience with multiple courses and fine ingredients",
    image: "/placeholder.svg?height=80&width=120",
    price: 25,
    tags: ["Gourmet", "Multi-course"],
  },
]

const specialDietOptions: SpecialDietOption[] = [
  {
    id: "vegetarian",
    name: "Vegetarian",
    description: "Meal without meat, fish, or poultry",
    price: 0,
  },
  {
    id: "vegan",
    name: "Vegan",
    description: "Meal without any animal products",
    price: 0,
  },
  {
    id: "gluten_free",
    name: "Gluten-Free",
    description: "Meal without gluten-containing ingredients",
    price: 0,
  },
  {
    id: "kosher",
    name: "Kosher",
    description: "Meal prepared according to Jewish dietary laws",
    price: 5,
  },
  {
    id: "halal",
    name: "Halal",
    description: "Meal prepared according to Islamic dietary laws",
    price: 5,
  },
]

const beverageOptions: BeverageOption[] = [
  {
    id: "standard_beverage",
    name: "Standard Beverages",
    description: "Water, soft drinks, juice, coffee, and tea",
    price: 0,
  },
  {
    id: "premium_beverage",
    name: "Premium Beverage Package",
    description: "Standard beverages plus beer, wine, and select spirits",
    price: 18,
  },
]

export function MealOptions({ flightId }: MealOptionsProps) {
  const [selectedMeal, setSelectedMeal] = useState<string>("standard")
  const [selectedDiet, setSelectedDiet] = useState<string | null>(null)
  const [selectedBeverage, setSelectedBeverage] = useState<string>("standard_beverage")

  const getSelectedMealOption = () => {
    return mealOptions.find((option) => option.id === selectedMeal)
  }

  const getSelectedDietOption = () => {
    return selectedDiet ? specialDietOptions.find((option) => option.id === selectedDiet) : null
  }

  const getSelectedBeverageOption = () => {
    return beverageOptions.find((option) => option.id === selectedBeverage)
  }

  const getTotalPrice = () => {
    const mealPrice = getSelectedMealOption()?.price || 0
    const dietPrice = getSelectedDietOption()?.price || 0
    const beveragePrice = getSelectedBeverageOption()?.price || 0
    return mealPrice + dietPrice + beveragePrice
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Meal Selection</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>
              Select your preferred meal option for your flight. Special dietary requirements can be accommodated.
            </AlertDescription>
          </Alert>

          <RadioGroup value={selectedMeal} onValueChange={setSelectedMeal} className="space-y-4">
            {mealOptions.map((option) => (
              <div key={option.id} className="flex">
                <RadioGroupItem value={option.id} id={`meal-${option.id}`} className="mt-3" />
                <div className="ml-3 flex-1 cursor-pointer" onClick={() => setSelectedMeal(option.id)}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="relative h-20 w-30 flex-shrink-0">
                      <Image
                        src={option.image || "/placeholder.svg"}
                        alt={option.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <Label htmlFor={`meal-${option.id}`} className="text-base font-medium">
                            {option.name}
                          </Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {option.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="font-medium">{option.price === 0 ? "Included" : `+$${option.price}`}</div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </RadioGroup>

          <Separator className="my-6" />

          <div>
            <h3 className="font-medium mb-4">Special Dietary Requirements</h3>
            <RadioGroup value={selectedDiet || ""} onValueChange={setSelectedDiet} className="space-y-3">
              <div className="flex items-center">
                <RadioGroupItem value="" id="no-special-diet" />
                <Label htmlFor="no-special-diet" className="ml-2 text-sm">
                  No special dietary requirements
                </Label>
              </div>

              {specialDietOptions.map((option) => (
                <div key={option.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <RadioGroupItem value={option.id} id={`diet-${option.id}`} />
                    <div className="ml-2">
                      <Label htmlFor={`diet-${option.id}`} className="text-sm font-medium">
                        {option.name}
                      </Label>
                      <p className="text-xs text-gray-500">{option.description}</p>
                    </div>
                  </div>
                  <div className="font-medium text-sm">
                    {option.price === 0 ? "No extra charge" : `+$${option.price}`}
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Separator className="my-6" />

          <div>
            <h3 className="font-medium mb-4">Beverage Options</h3>
            <RadioGroup value={selectedBeverage} onValueChange={setSelectedBeverage} className="space-y-4">
              {beverageOptions.map((option) => (
                <div key={option.id} className="flex">
                  <RadioGroupItem value={option.id} id={`beverage-${option.id}`} className="mt-1" />
                  <div className="ml-3 flex-1 cursor-pointer" onClick={() => setSelectedBeverage(option.id)}>
                    <div className="flex justify-between">
                      <Label htmlFor={`beverage-${option.id}`} className="text-sm font-medium">
                        {option.name}
                      </Label>
                      <div className="font-medium text-sm">{option.price === 0 ? "Included" : `+$${option.price}`}</div>
                    </div>
                    <p className="text-xs text-gray-500">{option.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="mt-6 border-t pt-4">
            <h3 className="font-medium mb-2">Meal Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <div>{getSelectedMealOption()?.name}</div>
                <div>
                  {getSelectedMealOption()?.price === 0 ? "Included" : `$${getSelectedMealOption()?.price.toFixed(2)}`}
                </div>
              </div>

              {selectedDiet && (
                <div className="flex justify-between text-sm">
                  <div>{getSelectedDietOption()?.name} option</div>
                  <div>
                    {getSelectedDietOption()?.price === 0
                      ? "No extra charge"
                      : `$${getSelectedDietOption()?.price.toFixed(2)}`}
                  </div>
                </div>
              )}

              <div className="flex justify-between text-sm">
                <div>{getSelectedBeverageOption()?.name}</div>
                <div>
                  {getSelectedBeverageOption()?.price === 0
                    ? "Included"
                    : `$${getSelectedBeverageOption()?.price.toFixed(2)}`}
                </div>
              </div>

              <div className="flex justify-between font-medium pt-2 border-t">
                <div>Total meal selection:</div>
                <div>${getTotalPrice().toFixed(2)}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="h-5 w-5" />
            <span>Pre-Order Snacks</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-3">
              <div className="relative h-16 w-16 flex-shrink-0">
                <Image
                  src="/placeholder.svg?height=64&width=64"
                  alt="Snack box"
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div>
                <h3 className="font-medium text-sm">Premium Snack Box</h3>
                <p className="text-xs text-gray-500">Assorted premium snacks and treats</p>
                <div className="flex justify-between items-center mt-1">
                  <Badge variant="outline" className="text-xs">
                    Popular
                  </Badge>
                  <span className="text-sm font-medium">$12</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="relative h-16 w-16 flex-shrink-0">
                <Image
                  src="/placeholder.svg?height=64&width=64"
                  alt="Cheese plate"
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div>
                <h3 className="font-medium text-sm">Cheese & Fruit Plate</h3>
                <p className="text-xs text-gray-500">Selection of cheeses with fresh fruit</p>
                <div className="flex justify-between items-center mt-1">
                  <Badge variant="outline" className="text-xs">
                    Vegetarian
                  </Badge>
                  <span className="text-sm font-medium">$15</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
