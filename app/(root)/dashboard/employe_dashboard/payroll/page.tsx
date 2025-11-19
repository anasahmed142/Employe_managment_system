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
import { getPayroll } from "@/services/adminservice"
import React, { useEffect, useState } from "react"
import { toast } from "sonner"
import Loading from "@/components/ui/loading"

type Payroll = {
  userId: string
  name: string
  daysWorked: number
  salery: number
  totalSalary: number
}

const Page = () => {
  const [payrollData, setPayrollData] = useState<Payroll[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPayroll = async () => {
      try {
        setLoading(true)
        const res = await getPayroll()
        setPayrollData(res.data || [])
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message)
          setError(err.message || "Failed to fetch payroll data")
        } else {
          toast.error("Failed to fetch payroll data")
          setError("Failed to fetch payroll data")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchPayroll()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Payroll</h1>

      {loading && <Loading />}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <Table>
          <TableCaption>A list of all users and their payroll.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>User ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Days Worked</TableHead>
              <TableHead className="text-right">Salary (Per Day)</TableHead>
              <TableHead className="text-right">Total Salary</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payrollData.length > 0 ? (
              payrollData.map((payroll) => (
                <TableRow key={payroll.userId}>
                  <TableCell>{payroll.userId}</TableCell>
                  <TableCell>{payroll.name}</TableCell>
                  <TableCell>{payroll.daysWorked}</TableCell>
                  <TableCell className="text-right">{payroll.salery}</TableCell>
                  <TableCell className="text-right">{payroll.totalSalary}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No payroll data found.
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
