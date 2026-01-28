import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ZodError } from 'zod'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatZodErrors(error: ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {}
  error.issues.forEach((issue) => {
    if (issue.path[0]) fieldErrors[issue.path[0].toString()] = issue.message
  })
  return fieldErrors
}
