import { createContext, useContext } from "react"
import type { Theme } from "@/components/theme-provider"

type ThemeProviderState = {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
    theme: "dark",
    setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export const useTheme = () => {
    const context = useContext(ThemeProviderContext)
  
    if (context === undefined)
      throw new Error("useTheme must be used within a ThemeProvider")
  
    return context
}

export { ThemeProviderContext, initialState }
export type { ThemeProviderState }