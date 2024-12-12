
export default async function BlogPost({ params }: { params: { slug: string } }) {

  return (
    <article className="prose lg:prose-xl">
      <h1>
        {params.slug}
      </h1>
      <div dangerouslySetInnerHTML={{ __html: params.slug }} />
    </article>
  )
}

