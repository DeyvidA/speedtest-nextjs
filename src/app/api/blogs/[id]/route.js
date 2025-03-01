import { createClient } from "@/helpers/supabase/server";

export async function GET(
    request,
    { params }
  ) {
    const supabase = await createClient()

    const blogID = (await params).id


    const isNumber = typeof Number(blogID) === 'number' 


    console.log('isNumber', isNumber)
    if (isNumber && !isNaN(Number(blogID))) {
      const {data, error} = await supabase.from('blogs').select().eq('id', blogID).single()

      return Response.json({ success: true, data })
    } else {
      const {data, error} = await supabase.from('blogs').select().eq('slug', blogID).single()

      return Response.json({ success: true, data })
    }
  }