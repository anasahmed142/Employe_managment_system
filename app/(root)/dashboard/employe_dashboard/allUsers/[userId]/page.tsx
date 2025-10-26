
"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import Loading from '@/components/ui/loading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ILocation {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  photo: string;
  location: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
  createdAt: string;
}

const UserLocationHistory = () => {
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const { userId } = params;

  useEffect(() => {
    if (userId) {
      const fetchLocations = async () => {
        try {
          setLoading(true);
          const res = await fetch(`/api/location?userId=${userId}`);
          if (!res.ok) {
            throw new Error('Failed to fetch location history');
          }
          const data = await res.json();
          setLocations(data);
        } catch (err: unknown) {
          if (err instanceof Error) {
            toast.error(err.message);
            setError(err.message || 'Failed to fetch location history');
          } else {
            toast.error('Failed to fetch location history');
            setError('Failed to fetch location history');
          }
        } finally {
          setLoading(false);
        }
      };

      fetchLocations();
    }
  }, [userId]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">User Location History</h1>

      {loading && <Loading />}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <Card>
          <CardHeader>
            <CardTitle>Location History for {locations[0]?.user.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Photo</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Latitude</TableHead>
                  <TableHead>Longitude</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {locations.length > 0 ? (
                  locations.map((loc) => (
                    <TableRow key={loc._id}>
                      <TableCell>
                        <Image src={loc.photo} alt="User photo" width={100} height={100} className="rounded-md" />
                      </TableCell>
                      <TableCell>{new Date(loc.createdAt).toLocaleString()}</TableCell>
                      <TableCell>{loc.location.latitude}</TableCell>
                      <TableCell>{loc.location.longitude}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No location history found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserLocationHistory;
