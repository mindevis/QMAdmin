"use client"

import * as React from "react"
import { API_BASE_URL } from "@/lib/api"
import { AuthContext, type User } from "./auth-context-internal"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [user, setUser] = React.useState<User | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  
  // Check if user needs to complete profile (no username or username is email prefix)
  const needsProfile = React.useMemo(() => {
    if (!user || !isAuthenticated) return false
    // If username is empty or is just the email prefix (default), need profile
    const emailPrefix = user.email.split("@")[0]
    return !user.username || user.username.trim() === "" || user.username === emailPrefix
  }, [user, isAuthenticated])

  // Check localStorage and validate token on mount
  React.useEffect(() => {
    const validateAuth = async () => {
      const storedAuth = localStorage.getItem("auth")
      if (storedAuth) {
        try {
          const authData = JSON.parse(storedAuth)
          const token = authData.token
          
          if (token) {
            // Validate token by fetching user info
            try {
              const response = await fetch(`${API_BASE_URL}/auth/me?token=${token}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              })
              
              if (response.ok) {
                const userData = await response.json()
                const userObj = { 
                  email: userData.email || "", 
                  username: userData.username || ""
                }
                setIsAuthenticated(true)
                setUser(userObj)
              } else {
                // Token invalid, clear storage
                localStorage.removeItem("auth")
                setIsAuthenticated(false)
                setUser(null)
              }
            } catch (error) {
              console.error("Token validation failed:", error)
              localStorage.removeItem("auth")
              setIsAuthenticated(false)
              setUser(null)
            }
          }
        } catch {
          // Invalid stored data
          localStorage.removeItem("auth")
          setIsAuthenticated(false)
          setUser(null)
        }
      }
      setIsLoading(false)
    }
    
    validateAuth()
  }, [])

  const login = React.useCallback(async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: "Login failed" }))
        throw new Error(errorData.detail || "Login failed")
      }

      const data = await response.json()
      const token = data.access_token

      // Fetch user info
      const userResponse = await fetch(`${API_BASE_URL}/auth/me?token=${token}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!userResponse.ok) {
        throw new Error("Failed to fetch user information")
      }

      const userData = await userResponse.json()
      
      const user: User = {
        email: userData.email || email,
        username: userData.username || "",
      }

      setIsAuthenticated(true)
      setUser(user)
      localStorage.setItem("auth", JSON.stringify({ token, user }))
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }, [])

  const register = React.useCallback(async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: "Registration failed" }))
        throw new Error(errorData.detail || "Registration failed")
      }

      // After registration, automatically log in
      await login(email, password)
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    }
  }, [login])

  const logout = React.useCallback(() => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem("auth")
  }, [])

  const value = React.useMemo(
    () => ({
      isAuthenticated,
      user,
      login,
      logout,
      register,
      isLoading,
      needsProfile,
    }),
    [isAuthenticated, user, login, logout, register, isLoading, needsProfile]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
