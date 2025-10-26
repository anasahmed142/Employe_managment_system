
"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { getAllUser } from "@/services/adminservice"
import React, { useEffect, useState } from "react"
import { toast } from "sonner"
import { useAppSelector } from "@/store"
import Loading from "@/components/ui/loading"
import { useRouter } from "next/navigation"

type User = {
  userId: string
  name: string
  email: string
  role: string
  status: "online" | "offline" | string
}

const Page = () => {
  const [allUsers, setAllUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    if (user && user?.role === "admin") {
      const fetchUsers = async () => {
        try {
          setLoading(true);
          const res = await getAllUser({ email: user.email });
          setAllUsers(res.data || []);
        } catch (err: unknown) {
          if (err instanceof Error) {
            toast.error(err.message);
            setError(err.message || "Failed to fetch users");
          } else {
            toast.error("Failed to fetch users");
            setError("Failed to fetch users");
          }
        } finally {
          setLoading(false);
        }
      };

      fetchUsers();
    }
  }, [user]);

  const handleUserClick = (userId: string) => {
    router.push(`/dashboard/employe_dashboard/allUsers/${userId}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">All Users</h1>

      {loading && <Loading />}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <Table>
          <TableCaption>A list of all users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Role</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allUsers.length > 0 ? (
              allUsers.map((user) => (
                <TableRow key={user.email} onClick={() => handleUserClick(user.userId)} className="cursor-pointer">
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="text-right">{user.role}</TableCell>
                  <TableCell className="text-right">
                    {user.status === "online" ? (
                      <Badge className="bg-green-500 hover:bg-green-600 text-white">
                        Online
                      </Badge>
                    ) : (
                      <Badge className="bg-red-800 hover:bg-red-900 text-white">
                        Offline
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

export default Page
