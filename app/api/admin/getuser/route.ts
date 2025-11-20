import { NextResponse } from 'next/server'

const mockUsers = [
  { _id: '1', userId: 'u1', name: 'Alice', email: 'alice@example.com', role: 'employee', status: 'offline', salery: '100' },
  { _id: '2', userId: 'u2', name: 'Bob', email: 'bob@example.com', role: 'employee', status: 'online', salery: '120' },
]

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const userId = body.userId
    const user = mockUsers.find(u => u.userId === userId || u._id === userId)
    if (!user) return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 })
    return NextResponse.json({ success: true, data: user })
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Bad request' }, { status: 400 })
  }
}
