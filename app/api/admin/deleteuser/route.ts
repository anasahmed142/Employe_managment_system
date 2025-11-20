import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const userId = body.userId
    // Mock delete: just echo back
    return NextResponse.json({ success: true, message: `Mock: user ${userId} deleted` })
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Bad request' }, { status: 400 })
  }
}
