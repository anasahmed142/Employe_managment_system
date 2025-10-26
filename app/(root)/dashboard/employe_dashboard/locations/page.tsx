
'use client'

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getAllUser, getLocationHistory } from '@/services/adminservice';
import { useAppSelector } from "@/store"

interface User {
  _id: string;
  name: string;
}

interface Location {
  latitude: number;
  longitude: number;
  timestamp: string;
}

export default function LocationsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user && user?.role === "admin") {
      const fetchUsers = async () => {
        try {
          const response = await getAllUser({ email: user.email });
          setUsers(response.data);
        } catch (error) {
          console.error('Failed to fetch users', error);
        }
      };
      fetchUsers();
    }
  }, [user]);

  const handleFetchLocations = async () => {
    if (!selectedUser || !selectedDate) return;
    setLoading(true);
    try {
      const response = await getLocationHistory({ userId: selectedUser, date: selectedDate });
      setLocations(response.data);
    } catch (error) {
      console.error('Failed to fetch locations', error);
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Employee Locations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 mb-4">
          <Select onValueChange={setSelectedUser} value={selectedUser}>
            <SelectTrigger>
              <SelectValue placeholder="Select Employee" />
            </SelectTrigger>
            <SelectContent>
              {users.map((user) => (
                <SelectItem key={user._id} value={user._id}>
                  {user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <Button onClick={handleFetchLocations} disabled={loading}>
            {loading ? 'Loading...' : 'View Locations'}
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Latitude</TableHead>
              <TableHead>Longitude</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {locations.length > 0 ? (
              locations.map((loc, index) => (
                <TableRow key={index}>
                  <TableCell>{loc.latitude}</TableCell>
                  <TableCell>{loc.longitude}</TableCell>
                  <TableCell>{new Date(loc.timestamp).toLocaleString()}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  No location data for the selected criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
