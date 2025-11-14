"use client"

import { useEffect, useState } from "react"
import { LocationHistoryTable, LocationRecord } from "@/components/location-history-table"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getAllLocationHistory } from "@/services/locationService" 

export default function LocationHistoryPage() {
  const [data, setData] = useState<LocationRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await getAllLocationHistory()
        setData(response.locations)
      } catch (err) {
        setError("Failed to fetch location history.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <Card className="glass3d">
      <CardHeader>
        <CardTitle>Location History</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <LocationHistoryTable data={data} />
        )}
      </CardContent>
    </Card>
  )
}
