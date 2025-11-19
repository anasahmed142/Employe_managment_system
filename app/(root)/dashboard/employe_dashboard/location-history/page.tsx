"use client"

import { useEffect, useState, useCallback } from "react"
import { LocationHistoryTable, LocationRecord } from "@/components/location-history-table"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { IconRefresh } from "@tabler/icons-react"
import { getAllLocationHistory } from "@/services/locationService"
import { PaginationState } from "@tanstack/react-table"

export default function LocationHistoryPage() {
  const [data, setData] = useState<LocationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [pageCount, setPageCount] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllLocationHistory({ 
        page: pagination.pageIndex + 1, 
        limit: pagination.pageSize 
      });
      console.log(response);
      
      setData(response.locations);
      setPageCount(response.totalPages);
    } catch (err) {
      setError("Failed to fetch location history.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [pagination]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Card className="glass3d">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Location History</CardTitle>
        <Button variant="outline" size="sm" onClick={() => fetchData()} disabled={loading}>
          <IconRefresh className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {error && <p className="text-red-500">{error}</p>}
        <LocationHistoryTable
          data={data}
          loading={loading}
          pageCount={pageCount}
          pagination={pagination}
          setPagination={setPagination}
        />
      </CardContent>
    </Card>
  );
}
