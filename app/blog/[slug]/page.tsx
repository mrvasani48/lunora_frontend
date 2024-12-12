/* eslint-disable @typescript-eslint/no-explicit-any */

export default async function BlogPost({ params }:any) {

  return (
    <article className="prose lg:prose-xl">
      <h1>
        {params.slug}
      </h1>
      <div dangerouslySetInnerHTML={{ __html: params.slug }} />
    </article>
  )
}

