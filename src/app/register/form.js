'use client'
import Link from "next/link"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { redirect } from "next/navigation"

export function RegisterForm() {
    const form = useForm()

    const onSubmit = async (value) => {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ email: value.email, password: value.password }),
      }); 

      redirect('/blog')
    }

    return (
      <div className="flex justify-center gap-10 mx-auto container">
      <Card className='w-1/3 p-10 '>
      <CardHeader>
        <CardTitle className='text-center text-lg text-bold'>
          Register
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={ form.handleSubmit( onSubmit ) } className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="test@test.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="type your password" {...field}  type="password"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className='w-full'>Submit</Button>
          <Link href="/login">
            <p  className="text-center text-gray-600  p-3 rounded-lg">
              Sign up
            </p>
          </Link>
        </form>
      </Form>
      </Card>
      </div>
  
    )
}