import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    // Very simple mock authentication — accept any email/password
    return NextResponse.json({ success: true, data: { name: 'Mock User', email: body.email, role: 'admin' } })
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Bad request' }, { status: 400 })
  }
}
