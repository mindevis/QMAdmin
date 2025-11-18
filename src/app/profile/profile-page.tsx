"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"
import { API_BASE_URL } from "@/lib/api"

export function ProfilePage() {
  const { user } = useAuth()
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      // Get token from localStorage
      const storedAuth = localStorage.getItem("auth")
      if (!storedAuth) {
        throw new Error("No authentication token found")
      }

      const authData = JSON.parse(storedAuth)
      const token = authData.token

      // Update username via API
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ username }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: "Failed to update profile" }))
        throw new Error(errorData.detail || "Failed to update profile")
      }

      const updatedUser = await response.json()
      
      // Server returns new token after username update
      const newToken = updatedUser.access_token || updatedUser.token
      
      // Update user and token in localStorage
      const updatedAuthData = {
        token: newToken,
        user: {
          email: updatedUser.email || user?.email || "",
          username: updatedUser.username || username,
        }
      }
      localStorage.setItem("auth", JSON.stringify(updatedAuthData))
      
      // Reload page to update context with new token and user data
      window.location.reload()
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to update profile")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Complete Your Profile</CardTitle>
          <CardDescription>
            Please enter your username to complete registration
          </CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
                minLength={3}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Email: {user?.email}</p>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Profile"}
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}

