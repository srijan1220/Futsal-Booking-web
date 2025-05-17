import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

type Stats = {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
};

const defaultStats: Stats = {
  total: 0,
  pending: 0,
  approved: 0,
  rejected: 0,
};

export function SectionCards() {
  const [stats, setStats] = useState<Stats>(defaultStats);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/dashboard/getBookingStatus"
        );
        const data = await response.json();

        if (data.success && typeof data.stats === "object") {
          // Use fallback of 0 for any missing fields
          const {
            total = 0,
            pending = 0,
            approved = 0,
            rejected = 0,
          } = data.stats || {};

          setStats({ total, pending, approved, rejected });
        } else {
          // fallback if success is false or stats is missing
          setStats(defaultStats);
        }
      } catch (error) {
        console.error("Failed to fetch booking stats", error);
        setStats(defaultStats);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Bookings</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {loading ? "Loading..." : stats.total}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Pending Bookings</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {loading ? "Loading..." : stats.pending}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Approved Bookings</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {loading ? "Loading..." : stats.approved}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Rejected Bookings</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {loading ? "Loading..." : stats.rejected}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
