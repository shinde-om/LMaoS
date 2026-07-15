"use client"
import { cn } from "@workspace/ui/lib/utils"
import { Button } from "@workspace/ui/components/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import { SubmitEvent, useState } from "react"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"

const names = ["Om Shinde", "Kanchan Barai"]

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [placeholder] = useState(() => names[Math.floor(Math.random() * 2)]!)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [disabled, setDisabled] = useState(false);

  async function submit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    setDisabled(true)

    console.log(name, email, password, confirmPassword)

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
      callbackURL: 'http://localhost:3000/dashboard'
    })

    console.log(data, error)

    setDisabled(false)
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={submit}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Fill in the form below to create your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder={placeholder}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="name@your.domain"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FieldDescription>
            We&apos;ll use this to contact you. We will not share your email
            with anyone else.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input 
            id="password" 
            type="password" 
            onChange={(e) => setPassword(e.target.value)} 
            required
            aria-invalid={password.length < 7 && password.length !== 0}
          />
          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input
            id="confirm-password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            aria-invalid={
              password !== confirmPassword && 
              !(password === "" || confirmPassword === "") 
            }
            required
          /> {(
              password !== confirmPassword 
              && !(password === "" || confirmPassword === "")
            ) 
            && <FieldDescription>Both the passwords should match.</FieldDescription>
          }
          <FieldDescription>Please confirm your password.</FieldDescription>
        </Field>
        <Field>
          <Button type="submit" disabled={disabled}>Create Account</Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <Button variant="outline" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path
                d="M24.7,20.5v7.6H35.6a10.9,10.9,0,0,1-10.9,8,12.1,12.1,0,1,1,7.9-21.3l5.6-5.6A20,20,0,1,0,24.7,44c16.8,0,20.5-15.7,18.9-23.5Z"
                fill="currentColor"
              />
            </svg>
            Sign up with Google
          </Button>
          <FieldDescription className="px-6 text-center">
            Already have an account? <Link href="/login">Log in</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
