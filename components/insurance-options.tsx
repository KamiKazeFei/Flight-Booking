"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon, ShieldCheck, ShieldAlert, ShieldQuestion } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

type InsuranceOptionsProps = {
  flightId: string
}

type InsurancePlan = {
  id: string
  name: string
  description: string
  price: number
  coverage: {
    tripCancellation: string
    medicalExpenses: string
    baggageLoss: string
    travelDelay: string
    additionalBenefits: string[]
  }
}

const insurancePlans: InsurancePlan[] = [
  {
    id: "none",
    name: "No Insurance",
    description: "Continue without travel insurance coverage",
    price: 0,
    coverage: {
      tripCancellation: "Not covered",
      medicalExpenses: "Not covered",
      baggageLoss: "Not covered",
      travelDelay: "Not covered",
      additionalBenefits: [],
    },
  },
  {
    id: "basic",
    name: "Basic Protection",
    description: "Essential coverage for your trip",
    price: 35,
    coverage: {
      tripCancellation: "Up to $1,500",
      medicalExpenses: "Up to $10,000",
      baggageLoss: "Up to $500",
      travelDelay: "$100 per day (max $500)",
      additionalBenefits: ["24/7 travel assistance", "Emergency medical evacuation"],
    },
  },
  {
    id: "premium",
    name: "Premium Protection",
    description: "Comprehensive coverage with higher limits",
    price: 65,
    coverage: {
      tripCancellation: "Up to $3,000",
      medicalExpenses: "Up to $50,000",
      baggageLoss: "Up to $1,000",
      travelDelay: "$200 per day (max $1,000)",
      additionalBenefits: [
        "24/7 travel assistance",
        "Emergency medical evacuation",
        "Trip interruption coverage",
        "Rental car damage coverage",
      ],
    },
  },
  {
    id: "deluxe",
    name: "Deluxe Protection",
    description: "Maximum coverage for complete peace of mind",
    price: 95,
    coverage: {
      tripCancellation: "Up to $5,000",
      medicalExpenses: "Up to $100,000",
      baggageLoss: "Up to $2,500",
      travelDelay: "$300 per day (max $1,500)",
      additionalBenefits: [
        "24/7 travel assistance",
        "Emergency medical evacuation",
        "Trip interruption coverage",
        "Rental car damage coverage",
        "Cancel for any reason (75% reimbursement)",
        "Concierge services",
      ],
    },
  },
]

export function InsuranceOptions({ flightId }: InsuranceOptionsProps) {
  const [selectedPlan, setSelectedPlan] = useState<string>("basic")

  const getSelectedPlan = () => {
    return insurancePlans.find((plan) => plan.id === selectedPlan)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Travel Insurance</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>
              Protect your trip with travel insurance. We recommend adding insurance for unexpected events.
            </AlertDescription>
          </Alert>

          <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="space-y-4">
            {insurancePlans.map((plan) => (
              <div key={plan.id} className="flex">
                <RadioGroupItem value={plan.id} id={`plan-${plan.id}`} className="mt-3" />
                <div className="ml-3 flex-1 cursor-pointer" onClick={() => setSelectedPlan(plan.id)}>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`plan-${plan.id}`} className="text-base font-medium">
                        {plan.name}
                      </Label>
                      {plan.id === "premium" && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">Recommended</span>
                      )}
                    </div>
                    <div className="font-medium">{plan.price === 0 ? "No charge" : `$${plan.price}`}</div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{plan.description}</p>

                  {plan.id !== "none" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mt-3">
                      <div className="flex items-center gap-2 text-sm">
                        <ShieldCheck className="h-4 w-4 text-green-600" />
                        <span>Trip Cancellation: {plan.coverage.tripCancellation}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <ShieldCheck className="h-4 w-4 text-green-600" />
                        <span>Medical Expenses: {plan.coverage.medicalExpenses}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <ShieldCheck className="h-4 w-4 text-green-600" />
                        <span>Baggage Loss: {plan.coverage.baggageLoss}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <ShieldCheck className="h-4 w-4 text-green-600" />
                        <span>Travel Delay: {plan.coverage.travelDelay}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </RadioGroup>

          {selectedPlan !== "none" && (
            <>
              <Separator className="my-6" />

              <div>
                <h3 className="font-medium mb-3">Coverage Details</h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="trip-cancellation">
                    <AccordionTrigger className="text-sm">Trip Cancellation Coverage</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-gray-600">
                        Trip cancellation insurance reimburses you for prepaid, nonrefundable trip expenses if you need
                        to cancel your trip for a covered reason, such as:
                      </p>
                      <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 space-y-1">
                        <li>Illness, injury, or death of you, a traveling companion, or a family member</li>
                        <li>Severe weather or natural disaster</li>
                        <li>Bankruptcy or financial default of travel supplier</li>
                        <li>Terrorism or mandatory evacuation at destination</li>
                        <li>Jury duty or court subpoena that cannot be postponed</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="medical-coverage">
                    <AccordionTrigger className="text-sm">Medical Coverage</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-gray-600">
                        Medical expense coverage provides benefits for medical and dental emergencies that occur during
                        your trip. This includes:
                      </p>
                      <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 space-y-1">
                        <li>Emergency medical treatment</li>
                        <li>Hospital room and board</li>
                        <li>Ambulance services</li>
                        <li>Medications and prescribed drugs</li>
                        <li>Emergency dental treatment</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="baggage-coverage">
                    <AccordionTrigger className="text-sm">Baggage Coverage</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-gray-600">
                        Baggage coverage reimburses you for lost, stolen, or damaged baggage and personal items during
                        your trip. Coverage includes:
                      </p>
                      <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 space-y-1">
                        <li>Personal belongings and luggage</li>
                        <li>Travel documents</li>
                        <li>Baggage delay benefits for essential items</li>
                        <li>Coverage for both checked and carry-on items</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="additional-benefits">
                    <AccordionTrigger className="text-sm">Additional Benefits</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                        {getSelectedPlan()?.coverage.additionalBenefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </>
          )}

          <div className="mt-6 border-t pt-4">
            <h3 className="font-medium mb-2">Insurance Summary</h3>
            <div className="flex justify-between">
              <div>{getSelectedPlan()?.name}</div>
              <div>{getSelectedPlan()?.price === 0 ? "No charge" : `$${getSelectedPlan()?.price.toFixed(2)}`}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldQuestion className="h-5 w-5" />
            <span>Why Get Travel Insurance?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-3 items-start">
              <ShieldAlert className="h-5 w-5 text-rose-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-sm">Trip Cancellation Protection</h3>
                <p className="text-sm text-gray-500">
                  Get reimbursed for prepaid, non-refundable expenses if you need to cancel your trip for a covered
                  reason.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <ShieldAlert className="h-5 w-5 text-rose-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-sm">Medical Emergencies Abroad</h3>
                <p className="text-sm text-gray-500">
                  Your domestic health insurance may not cover international medical expenses. Travel insurance provides
                  coverage for emergency medical treatment.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <ShieldAlert className="h-5 w-5 text-rose-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-sm">Baggage Protection</h3>
                <p className="text-sm text-gray-500">
                  Get reimbursed if your baggage is lost, stolen, or damaged during your trip.
                </p>
              </div>
            </div>

            <Button variant="link" className="text-rose-600 p-0 h-auto">
              View full policy details
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
