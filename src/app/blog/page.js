import BlogList from "./blog-list";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function getBlogs() {
    const response = await fetch("http://localhost:3000/api/blogs");

    return response.json();
  }

export default async function Blog () {
    let blogs = await getBlogs();

    return ( 
        <>
            <Link href="blog/create" className="flex justify-end">
                <Button>
                    Create New Blog
                    <Plus />
                </Button>
            </Link>
            <BlogList blogs={blogs.data} />
        </>
    )
}
