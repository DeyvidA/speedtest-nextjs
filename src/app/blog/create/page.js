'use client'

import { redirect } from 'next/navigation'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"

export default function Create() {
  const form = useForm()
  
  const onSubmit = async (values) => {
    await fetch("/api/blogs", {
      method: "POST",
      body: JSON.stringify({ title: values.title, content: values.content }),
    });

    redirect('/blog')
  }

  return (
    <Card className='w-1/2 mx-auto'>
    <CardHeader>
      <CardTitle>
        Create New Blog
      </CardTitle>
    </CardHeader>
    <CardContent>

    <Form {...form}>
      <form onSubmit={ form.handleSubmit( onSubmit ) } className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Your Blog Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="type your content" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </CardContent>
    </Card>

  )
}
