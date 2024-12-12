import { Header } from '../components/Heaader'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto py-8">
        <main>{children}</main>
      </div>
    </>
  )
}

