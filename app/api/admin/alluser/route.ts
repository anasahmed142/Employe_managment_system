import { NextResponse } from 'next/server'

// Simple in-memory mock users for static builds and local dev
const mockUsers = [
  { _id: '1', userId: 'u1', name: 'Alice', email: 'alice@example.com', role: 'employee', status: 'offline', salery: '100' },
  { _id: '2', userId: 'u2', name: 'Bob', email: 'bob@example.com', role: 'employee', status: 'online', salery: '120' },
]

export async function POST(req: Request) {
  return NextResponse.json({ success: true, message: 'Mock all users', data: mockUsers })
}
