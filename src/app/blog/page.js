

async function getBlogs() {
    const response = await fetch("http://localhost:3000/api/blogs");
    return response.json();
  }

export default async function Blog () {
    let data = await getBlogs();

    return ( 
        <>
            {data.length &&
                data.map((blogs) => (
                    <>
                    {blogs.name}
                    </>
                )
            )}
        </>
    )
}