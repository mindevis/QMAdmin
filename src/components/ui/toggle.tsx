"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cn } from "@/lib/utils"
import { toggleVariants, type ToggleVariants } from "@/schemas/variants"
import type { VariantProps } from "class-variance-authority";

export interface ToggleProps extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>, ToggleVariants {}

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle }
