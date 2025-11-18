"use client"

import { useAuthContext } from "@/contexts/use-auth-internal"

export function useAuth() {
  return useAuthContext()
}

