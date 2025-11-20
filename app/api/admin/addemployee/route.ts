import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  // Not persisting in mock; just return success for local builds
  try {
    const body = await req.json()
    return NextResponse.json({ success: true, message: 'Mock: employee added', data: body })
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Bad request' }, { status: 400 })
  }
}
