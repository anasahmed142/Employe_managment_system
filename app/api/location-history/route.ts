import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    // Return mock paginated location history
    return NextResponse.json({ success: true, data: [], page: body.page || 1, limit: body.limit || 10 })
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Bad request' }, { status: 400 })
  }
}
