import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type Seat = {
  id: string
  number: string
  type: "standard" | "extra_legroom" | "premium" | "unavailable"
  price: number
  flightType: "outbound" | "return"
}

export type BaggageOption = {
  id: string
  name: string
  price: number
}

export type MealOption = {
  id: string
  name: string
  price: number
}

export type InsuranceOption = {
  id: string
  name: string
  price: number
}

export type Airport = {
  code: string
  name: string
  city: string
  country: string
}

interface BookingState {
  origin: Airport | null
  destination: Airport | null
  departDate: string | null
  returnDate: string | null
  passengers: number
  tripType: "roundTrip" | "oneWay"
  selectedSeats: Record<string, Seat>
  selectedBaggage: BaggageOption | null
  selectedMeal: MealOption | null
  selectedInsurance: InsuranceOption | null
  totalPrice: number
  baseFare: number
  taxesAndFees: number
}

const initialState: BookingState = {
  origin: null,
  destination: null,
  departDate: null,
  returnDate: null,
  passengers: 1,
  tripType: "roundTrip",
  selectedSeats: {},
  selectedBaggage: null,
  selectedMeal: null,
  selectedInsurance: null,
  totalPrice: 0,
  baseFare: 799,
  taxesAndFees: 100,
}

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setOrigin: (state, action: PayloadAction<Airport>) => {
      state.origin = action.payload
    },
    setDestination: (state, action: PayloadAction<Airport>) => {
      state.destination = action.payload
    },
    swapOriginDestination: (state) => {
      const temp = state.origin
      state.origin = state.destination
      state.destination = temp
    },
    setDepartDate: (state, action: PayloadAction<string>) => {
      state.departDate = action.payload
    },
    setReturnDate: (state, action: PayloadAction<string>) => {
      state.returnDate = action.payload
    },
    setPassengers: (state, action: PayloadAction<number>) => {
      state.passengers = action.payload
    },
    setTripType: (state, action: PayloadAction<"roundTrip" | "oneWay">) => {
      state.tripType = action.payload
      if (action.payload === "oneWay") {
        state.returnDate = null
      }
    },
    addSeat: (state, action: PayloadAction<{ passengerId: string; seat: Seat }>) => {
      const { passengerId, seat } = action.payload
      state.selectedSeats[passengerId] = seat
      state.totalPrice = calculateTotalPrice(state)
    },
    removeSeat: (state, action: PayloadAction<string>) => {
      const passengerId = action.payload
      delete state.selectedSeats[passengerId]
      state.totalPrice = calculateTotalPrice(state)
    },
    setBaggage: (state, action: PayloadAction<BaggageOption>) => {
      state.selectedBaggage = action.payload
      state.totalPrice = calculateTotalPrice(state)
    },
    setMeal: (state, action: PayloadAction<MealOption>) => {
      state.selectedMeal = action.payload
      state.totalPrice = calculateTotalPrice(state)
    },
    setInsurance: (state, action: PayloadAction<InsuranceOption>) => {
      state.selectedInsurance = action.payload
      state.totalPrice = calculateTotalPrice(state)
    },
    resetBooking: () => initialState,
  },
})

// Helper function to calculate total price
const calculateTotalPrice = (state: BookingState): number => {
  let total = state.baseFare + state.taxesAndFees

  // Add seat prices
  Object.values(state.selectedSeats).forEach((seat) => {
    total += seat.price
  })

  // Add baggage price
  if (state.selectedBaggage) {
    total += state.selectedBaggage.price
  }

  // Add meal price
  if (state.selectedMeal) {
    total += state.selectedMeal.price
  }

  // Add insurance price
  if (state.selectedInsurance) {
    total += state.selectedInsurance.price
  }

  return total
}

export const {
  setOrigin,
  setDestination,
  swapOriginDestination,
  setDepartDate,
  setReturnDate,
  setPassengers,
  setTripType,
  addSeat,
  removeSeat,
  setBaggage,
  setMeal,
  setInsurance,
  resetBooking,
} = bookingSlice.actions

export default bookingSlice.reducer
