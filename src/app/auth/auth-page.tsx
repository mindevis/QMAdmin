"use client"

import { LoginForm } from "./login"
import { RegisterForm } from "./register"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">QMAdmin</h1>
          <p className="text-muted-foreground italic">
            "This library has saved me countless hours of work and helped me deliver stunning designs to my clients faster than ever before." - Sofia Davis
          </p>
        </div>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="mt-6">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register" className="mt-6">
            <RegisterForm />
          </TabsContent>
        </Tabs>
        
        <div className="text-center text-sm text-muted-foreground">
          <p>
            By clicking continue, you agree to our{" "}
            <a href="#" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </a>
            .
          </p>
          <p className="mt-2 text-xs">
            Built by shadcn at Vercel. The source code is available on{" "}
            <a href="https://github.com" className="underline underline-offset-4 hover:text-primary">
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

