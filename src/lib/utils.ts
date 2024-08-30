// tbh uselsess for my  kind of idea and need to write from scratch
// this is for price which is kinda useless for my project haha

import { type ClassValue, clsx } from "clsx"
import { Metadata } from "next/types"
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
// modify it to suit your preference
// fr broo this si shown when you share it as link 
  export function constructMetadata({
    title = 'Uperhaps - the marketplace for digital assets',
    description = 'Unwhispered is an open-source marketplace for high-quality digital goods.',
    image = '/thumbnail.png',
    icons = '/favicon.ico',
    noIndex = false,
  }: {
    title?: string
    description?: string
    image?: string
    icons?: string
    noIndex?: boolean
  } = {}): Metadata {
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [
          {
            url: image,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [image],
        creator: '@bhabuk',
      },
      icons,
      metadataBase: new URL('https://digitalhippo.up.railway.app'),
      ...(noIndex && {
        robots: {
          index: false,
          follow: false,
        },
      }),
    }
  }
  