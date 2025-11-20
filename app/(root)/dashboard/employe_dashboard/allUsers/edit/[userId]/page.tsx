import ClientEditUser from './ClientEditUser'

type Params = { userId: string }

export const dynamic = 'error'

export async function generateStaticParams(): Promise<Params[]> {
  // Return a small static fallback so static export succeeds without an external backend
  return [{ userId: 'placeholder-user' }]
}

export default function Page({ params }: { params: Params }) {
  return <ClientEditUser userId={params.userId} />
}
