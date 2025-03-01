"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
import Link from "next/link";

export default function BlogList({ blogs }) {
  const router = useRouter();

  const handleDelete = async (blogId) => {
    const res = await fetch("http://localhost:3000/api/blogs", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: blogId }),
    });

    if (res.ok) {
      router.refresh();
    } else {
      console.error("Failed to delete blog with id:", blogId);
    }
  };


  return (
    <div className="flex gap-10 mx-auto container">
      {blogs && blogs.length > 0
        ? blogs.map((blog) => (
            <Card key={blog.id} className="w-1/3">
              <CardHeader>
                <CardTitle>
                    {blog.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{blog.content}</p>
              </CardContent>
              <CardFooter className="gap-2">
                <Link href={`/blog/${blog.slug}`}>
                    <Button className="w-full">
                        Read More
                    </Button>
                </Link>

                {/* Auth actions */}
                <>
                  <Link href={`/blog/edit/${blog.id}`}>
                    <Button>
                        Edit
                    </Button>
                  </Link>

                  <Button onClick={() => handleDelete(blog.id)}>
                      Delete
                  </Button>
                </>

              </CardFooter>
            </Card>
          ))
        : <p>No blogs found.</p>
      }
    </div>
  );
}
