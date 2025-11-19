"use client"

import React, { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { getUserById, updateUser } from "@/services/adminservice"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Loading from "@/components/ui/loading"

type User = {
  _id: string
  name: string
  email: string
  role: string
  salery: string
}

const EditUserPage = () => {
  const router = useRouter()
  const params = useParams()
  const { userId } = params

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    salery: "",
  })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const res = await getUserById({ userId: userId as string })
        setUser(res.data)
        setFormData({
          name: res.data.name,
          email: res.data.email,
          role: res.data.role,
          salery: res.data.salery,
        })
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message)
          setError(err.message)
        } else {
          toast.error("Failed to fetch user")
          setError("Failed to fetch user")
        }
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchUser()
    }
  }, [userId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await updateUser({ userId: userId as string, ...formData })
      toast.success(res.message)
      router.push("/dashboard/employe_dashboard/allUsers")
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
      } else {
        toast.error("Failed to update user")
      }
    }
  }

  if (loading) return <Loading />
  if (error) return <p className="text-red-500">{error}</p>
  if (!user) return <p>User not found</p>

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Edit User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="role">Role</Label>
          <Input
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="salery">Salary</Label>
          <Input
            id="salery"
            name="salery"
            value={formData.salery}
            onChange={handleChange}
          />
        </div>
        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  )
}

export default EditUserPage
