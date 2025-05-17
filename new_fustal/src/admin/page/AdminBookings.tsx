import React, { useEffect, useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import {
  approveBookingApi,
  rejectBookingApi,
  getBookingbyfutsalid,
} from "@/api/api";
import { toast } from "sonner";

interface User {
  _id: string;
  userName: string;
}

interface Futsal {
  futsalName: string;
}

interface Booking {
  _id: string;
  user: User;
  futsal: Futsal;
  date: string;
  from: string;
  approvalStatus: "pending" | "approved" | "rejected";
}

const AdminBookings: React.FC = () => {
  const storedUser = localStorage.getItem("user");
  const user: User | null = storedUser ? JSON.parse(storedUser) : null;
  const id = user?._id ?? null;

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const formatDate = (isoDate: string): string => isoDate.split("T")[0];

  const handleApprove = async (bookingId: string) => {
    try {
      const res = await approveBookingApi(bookingId);
      if (res.data.success) {
        setBookings((prev) =>
          prev.map((booking) =>
            booking._id === bookingId
              ? { ...booking, approvalStatus: "approved" }
              : booking
          )
        );
        toast("Booking Approved");
      } else {
        toast("Approval Failed", {
          description: res.data.message,
        });
      }
    } catch (error) {
      console.error("API call failed:", error);
      toast("Error", {
        description: "API call failed",
      });
    }
  };

  const handleReject = async (bookingId: string) => {
    try {
      const res = await rejectBookingApi(bookingId);
      if (res.data.success) {
        setBookings((prev) =>
          prev.map((booking) =>
            booking._id === bookingId
              ? { ...booking, approvalStatus: "rejected" }
              : booking
          )
        );
        toast("Booking Rejected");
      } else {
        toast("Rejection Failed", {
          description: res.data.message,
        });
      }
    } catch (error) {
      console.error("API call failed:", error);
      toast("Error", {
        description: "API call failed",
      });
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const formattedDate = formatDate(booking.date);
    const matchesSearchQuery =
      booking.user?.userName.toLowerCase().includes(searchQuery) ||
      booking.futsal?.futsalName.toLowerCase().includes(searchQuery) ||
      formattedDate.includes(searchQuery);

    const matchesDate = selectedDate ? formattedDate === selectedDate : true;

    return matchesSearchQuery && matchesDate;
  });

  useEffect(() => {
    if (id) {
      getBookingbyfutsalid(id)
        .then((res: any) => {
          if (res.data.success) {
            setBookings(res.data.bookings);
          } else {
            console.error("Error fetching bookings:", res.data.error);
          }
        })
        .catch((err: any) => {
          console.error("API call failed:", err);
        });
    }
  }, [id]);

  return (
    <>
      <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
        <div className="sm:flex items-center justify-between">
          <p className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800">
            Bookings
          </p>
          <div className="flex items-center gap-2">
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-44"
            />
            <Input
              type="text"
              placeholder="Search Bookings..."
              onChange={handleSearchChange}
              className="w-64"
            />
          </div>
        </div>
      </div>

      <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell className="pl-4 font-normal text-left">
                User Name
              </TableCell>
              <TableCell className="pl-12 font-normal text-left">
                Futsal Name
              </TableCell>
              <TableCell className="pl-12 font-normal text-left">
                Date
              </TableCell>
              <TableCell className="pl-20 font-normal text-left">
                Time
              </TableCell>
              <TableCell className="pl-16 font-normal text-left">
                Action
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.map((booking) => (
              <TableRow
                key={booking._id}
                className="text-sm text-gray-800 bg-white hover:bg-gray-100"
              >
                <TableCell className="pl-4 font-medium">
                  {booking.user?.userName}
                </TableCell>
                <TableCell className="pl-12 font-medium">
                  {booking.futsal?.futsalName}
                </TableCell>
                <TableCell className="pl-12 font-medium">
                  {formatDate(booking.date)}
                </TableCell>
                <TableCell className="pl-20 font-medium">
                  {booking.from}
                </TableCell>
                <TableCell className="px-7 2xl:px-0">
                  {booking.approvalStatus === "pending" && (
                    <div className="flex">
                      <Button
                        variant="outline"
                        className="text-green-600 hover:text-green-700 ml-2"
                        onClick={() => handleApprove(booking._id)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        className="text-red-600 hover:text-red-700 ml-2"
                        onClick={() => handleReject(booking._id)}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                  {booking.approvalStatus === "approved" && (
                    <div className="flex items-center text-green-500">
                      <svg
                        className="w-6 h-6 mr-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Approved
                    </div>
                  )}
                  {booking.approvalStatus === "rejected" && (
                    <div className="flex items-center text-red-500">
                      <svg
                        className="w-6 h-6 mr-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Rejected
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default AdminBookings;
