export const isDateValid = (date: string): boolean => {
  const dateObj = new Date(date)
  return !isNaN(dateObj.getTime())
}

export const isReturnDateValid = (departDate: string, returnDate: string): boolean => {
  if (!departDate || !returnDate) return false

  const depart = new Date(departDate)
  const returnD = new Date(returnDate)

  return returnD >= depart
}

export const isEmailValid = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isPasswordValid = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  return passwordRegex.test(password)
}
