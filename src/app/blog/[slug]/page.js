async function getCurrentBlog(slug) {
  const response = await fetch(`http://localhost:3000/api/blogs/${slug}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch blog");
  }

  return response.json();
}

export default async function Page({ params }) {
  const currentBlog = await getCurrentBlog(params.slug);

  console.log(currentBlog)

  return (
    <div className="container mx-auto">
      <section className="flex justify-between">
        <h1 className="text-2xl font-bold">{currentBlog.data.title}</h1>
        <p>{currentBlog.data.content}</p>
      </section>
      <p>
        {currentBlog.data.content}
      </p>
    </div>
  );
}

export async function generateStaticParams() {
  const response = await fetch("http://localhost:3000/api/blogs");
  const data = await response.json();

  return data.data.map((blog) => ({
    slug: blog.slug,
  }));
}
