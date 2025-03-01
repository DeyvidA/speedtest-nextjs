'use client'

import { redirect } from 'next/navigation'
import { useForm } from "react-hook-form"
import { useEffect, use } from 'react'
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

export default function Edit({ params }) {
  const form = useForm()
  const blogId = use(params).id


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/api/blogs/${blogId}`);

      const responseJson = await response.json()

      form.control.content = responseJson.data.content

      form.setValue('title', responseJson.data.title)
      form.setValue('content',responseJson.data.content)
    }
  
    fetchData()
  }, [form, blogId])


  const onSubmit = async (values) => {

    console.log(JSON.stringify({ title: values.title, content: values.content }))
    await fetch("/api/blogs", {
      method: "PATCH",
      body: JSON.stringify({ title: values.title, content: values.content, id: blogId }),
    });

    redirect('/blog')
  }

  return (
    <Card className='w-1/2 mx-auto'>
      <CardHeader>
        <CardTitle>
          Edit Blog
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

            <Button type="submit" className='w-full'>Submit</Button>
          </form>
        </Form>   
      </CardContent>
    </Card>

  )
}
