// tbh uselsess for my  kind of idea and need to write from scratch
// this is for price which is kinda useless for my project haha
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice (
  price: number | string,
  options: {
    currency?: "USD" | "EUR"|"GBP"|"BTD",
    notation?: Intl.NumberFormatOptions["notation"]
  } = {}
) {
  const {currency = "USD", notation="compact "} = options

  const numericPrice =
   typeof price == "string" ? parseFloat(price): price

  return new Intl.NumberFormat("en-US", {
    style: 'currency' ,
    currency,
    // notation,
    maximumFractionDigits: 2,
  }).format(numericPrice)
  }
