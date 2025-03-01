import { createClient } from '@/helpers/supabase/server';

export async function POST(req) {
  const supabase = await createClient()
  
  const res = await req.json();
  const {email, password} = res

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return Response.json({ success: true, data })
}
