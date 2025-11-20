import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    // Return mock location history array
    return NextResponse.json({ success: true, data: [{ _id: 'loc1', user: { _id: '1', name: 'Alice', email: 'alice@example.com' }, photo: '', location: { latitude: 0, longitude: 0, accuracy: 1 }, createdAt: new Date().toISOString() }] })
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Bad request' }, { status: 400 })
  }
}
