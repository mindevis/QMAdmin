"use client"

import * as React from "react"
import { AuthContext } from "./auth-context-internal"

export function useAuthContext() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

