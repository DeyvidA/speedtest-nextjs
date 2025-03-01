'use client'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { client } from '@/helpers/supabase/client'
import { LoginForm } from "./form"


const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(),
  password: z.string()
})

export default function Login () {

  return (
    <LoginForm/>
  )
}



