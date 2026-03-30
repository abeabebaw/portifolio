import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDisplayDate(value?: string): string {
  if (!value) {
    return 'Unknown date'
  }

  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    return 'Unknown date'
  }

  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function getYearsOfExperience(startYear: number): number {
  const currentYear = new Date().getFullYear()
  const years = currentYear - startYear
  return years < 1 ? 1 : years
}

export function getExperienceDurationYears(startYear: number, endYear?: number): number {
  const targetYear = endYear ?? new Date().getFullYear()
  const years = targetYear - startYear
  return years < 1 ? 1 : years
}

export function formatExperiencePeriod(startYear: number, endYear?: number): string {
  return `${startYear} — ${endYear ?? 'Present'}`
}
