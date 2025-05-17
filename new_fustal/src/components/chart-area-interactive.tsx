import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

const COLORS = ["#22c55e", "#eab308", "#ef4444"];

export const ChartOverview = () => {
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    const fetchPieData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/dashboard/getbooking"
        );
        const result = await response.json();
        if (result.success) {
          setPieData(result.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch pie chart data", error);
      }
    };

    const fetchBarData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/dashboard/getweeklybooking"
        );
        const result = await response.json();
        if (result.success) {
          setBarData(result.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch bar chart data", error);
      }
    };

    fetchPieData();
    fetchBarData();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:px-6">
      {/* Pie Chart */}
      <div className="rounded-2xl border bg-white p-4 shadow-sm dark:bg-zinc-950">
        <h2 className="text-lg font-semibold mb-2 text-zinc-800 dark:text-zinc-200">
          Booking Status
        </h2>
        {pieData.length > 0 ? (
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={80} label>
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[320px] flex items-center justify-center text-sm text-zinc-500 dark:text-zinc-400">
            No data at this moment
          </div>
        )}
      </div>

      {/* Bar Chart */}
      <div className="rounded-2xl border bg-white p-4 shadow-sm dark:bg-zinc-950">
        <h2 className="text-lg font-semibold mb-2 text-zinc-800 dark:text-zinc-200">
          Weekly Bookings
        </h2>
        {barData.length >= 0 ? (
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={barData}>
              <XAxis dataKey="day" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Bar dataKey="bookings" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[320px] flex items-center justify-center text-sm text-zinc-500 dark:text-zinc-400">
            No data at this moment
          </div>
        )}
      </div>
    </div>
  );
};
