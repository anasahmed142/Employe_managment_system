"use client";

import * as React from "react";
import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  PaginationState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";

export type LocationRecord = {
  uid: string;
  name: string;
  timestamp: string;
  latitude: number;
  longitude: number;
  accuracy: number;
  type?: string;
  photo?: string;
};

interface LocationHistoryTableProps {
  data: LocationRecord[];
  loading: boolean;
  pageCount: number;
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
}

export function LocationHistoryTable({
  data,
  loading,
  pageCount,
  pagination,
  setPagination,
}: LocationHistoryTableProps) {

  // ⬇️ Hooks must be inside component
  const [showPhotoModal, setShowPhotoModal] = React.useState(false);
  const [selectedPhoto, setSelectedPhoto] = React.useState<string | null>(null);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [showLocationModal, setShowLocationModal] = React.useState(false);
  const [selectedLocation, setSelectedLocation] = React.useState<{ latitude: number; longitude: number } | null>(null);
  
  // ⬇️ Columns must be inside so they can use state setters
  const columns: ColumnDef<LocationRecord>[] = [
    { accessorKey: "uid", header: "User UID" },
    { accessorKey: "name", header: "User Name" },
    {
      accessorKey: "timestamp",
      header: "Timestamp",
      cell: ({ row }) => new Date(row.getValue("timestamp")).toLocaleString(),
    },
    { accessorKey: "latitude", header: "Latitude" },
    { accessorKey: "longitude", header: "Longitude" },
    {
      accessorKey: "accuracy",
      header: "Accuracy (m)",
      cell: ({ row }) => `${row.getValue("accuracy")}m`,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => row.getValue("type") || "N/A",
    },
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => {
        const record = row.original;
        const hasPhoto = Boolean(record.photo);
    
        return (
          <div className="flex gap-2">
    
            {/* Show Photo button only if photo exists */}
            {hasPhoto && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedPhoto(record.photo ?? null);
                  setShowPhotoModal(true);
                }}
              >
                Show Photo
              </Button>
            )}
    
            <Button
              variant="outline"
              size="sm"
              onClick={() =>{
                setSelectedLocation({ latitude: record.latitude, longitude: record.longitude });
                setShowLocationModal(true);
              }}
            >
              Show Location
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount ?? 0,
    manualPagination: true,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination,
    },
  });

  return (
    <>
    <Dialog open={showLocationModal} onOpenChange={setShowLocationModal}>
  <DialogContent className="max-w-lg w-full h-[400px]">
    <DialogHeader>
      <DialogTitle>User Location</DialogTitle>
    </DialogHeader>

    {selectedLocation ? (
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        src={`https://www.google.com/maps?q=${selectedLocation.latitude},${selectedLocation.longitude}&hl=es;z=14&output=embed`}
        allowFullScreen
      ></iframe>
    ) : (
      <p>No location available</p>
    )}
  </DialogContent>
</Dialog>
      {/* PHOTO MODAL */}
      <Dialog open={showPhotoModal} onOpenChange={setShowPhotoModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>User Photo</DialogTitle>
          </DialogHeader>

          {selectedPhoto ? (
            <img
              src={selectedPhoto}
              alt="User Photo"
              className="w-full rounded-md border"
            />
          ) : (
            <p>No photo available</p>
          )}
        </DialogContent>
      </Dialog>

      {/* TABLE UI */}
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter by User UID..."
            value={(table.getColumn("uid")?.getFilterValue() as string) ?? ""}
            onChange={(e) => table.getColumn("uid")?.setFilterValue(e.target.value)}
            className="max-w-sm"
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                <IconAdjustmentsHorizontal className="mr-2 h-4 w-4" /> Columns
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
