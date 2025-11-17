"use client"

import * as React from "react"

export interface User {
  email: string
  username: string
}

export interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (email: string, password: string) => Promise<void>
  isLoading: boolean
  needsProfile: boolean
}

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

