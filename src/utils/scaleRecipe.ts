import { BRINE_VARIANTS } from '../data/brineVariants'

export type JarSize = 'small' | 'medium' | 'large' | 'custom'
export type InputMode = 'weight' | 'jarsize'

export const JAR_SIZES: Record<JarSize, { label: string; ml: number; grams: number }> = {
  small:  { label: 'Small (500ml)',  ml: 500,  grams: 400  },
  medium: { label: 'Medium (1L)',    ml: 1000, grams: 800  },
  large:  { label: 'Large (2L)',     ml: 2000, grams: 1500 },
  custom: { label: 'Custom weight',  ml: 0,    grams: 0    },
}

// Base quantity all recipes are written for (1kg = 1000g)
const BASE_GRAMS = 1000

function scaleValue(value: number, ratio: number): string {
  const scaled = value * ratio
  if (scaled < 5) return scaled.toFixed(1)
  if (scaled < 100) return Math.round(scaled).toString()
  return Math.round(scaled / 5) * 5 + ''
}

export function scaleText(text: string, ratio: number): string {
  if (ratio === 1) return text
  return text.replace(/(\d+\.?\d*)/g, (match) => {
    const num = parseFloat(match)
    return scaleValue(num, ratio)
  })
}

export function scaleRecipeText(text: string, grams: number): string {
  const ratio = grams / BASE_GRAMS
  return text
    .split('\n')
    .map(line => {
      if (!/\d/.test(line)) return line
      if (line.trim().startsWith('**') && !line.includes('g ') && !line.includes('ml')) return line
      return scaleText(line, ratio)
    })
    .join('\n')
}

export interface ScaledRecipe {
  brine: string
  method: string
  aromatics: string
  timeline: string
  proTip: string
  ratio: number
  grams: number
}

export function getScaledRecipe(
  ingredientId: string,
  brineType: 'salt' | 'vinegar',
  grams: number
): ScaledRecipe | null {
  const variants = BRINE_VARIANTS[ingredientId]
  if (!variants) return null

  const variant = variants[brineType]
  if (!variant) return null

  const ratio = grams / BASE_GRAMS

  return {
    brine:     scaleRecipeText(variant.brine, grams),
    method:    variant.method,
    aromatics: scaleRecipeText(variant.aromatics, grams),
    timeline:  variant.timeline,
    proTip:    variant.proTip,
    ratio,
    grams,
  }
}
