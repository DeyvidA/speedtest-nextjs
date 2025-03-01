import { createClient } from "@/helpers/supabase/server";

function slugify(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
  str = str.toLowerCase(); // convert string to lowercase
  str = str.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
           .replace(/\s+/g, '-') // replace spaces with hyphens
           .replace(/-+/g, '-'); // remove consecutive hyphens
  return str;
}


export async function GET() {
  const supabase = await createClient()
  
  const {data, error}  = await supabase.from('blogs').select();


  return Response.json({ success: true, data })
}

export async function POST(req) {
  const supabase = await createClient()
  
  const res = await req.json();
  const {title, content} = res

  const slug = slugify(title);

  const { error } = await supabase
  .from('blogs')
  .insert({title, content, slug})


  return Response.json({ success: true, data })
}

export async function PATCH(req) {
  const supabase = await createClient()
  
  const res = await req.json();
  const {id, title, content} = res

  const slug = slugify(title);

  const { data, error } = await supabase
  .from('blogs')
  .update({title, content, slug})
  .eq('id', id)

  return Response.json({ success: true, data })
}

export async function DELETE(req) {
  const supabase = await createClient()

  const res = await req.json();
  const {id} = res

  const {data} = await supabase
  .from('blogs')
  .delete()
  .eq('id', id)


  return Response.json({ success: true, data })
}

