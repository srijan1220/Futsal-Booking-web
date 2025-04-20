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

const pieData = [
  { name: "Completed", value: 400 },
  { name: "Pending", value: 200 },
  { name: "Cancelled", value: 100 },
];

const barData = [
  { day: "Sun", bookings: 30 },
  { day: "Mon", bookings: 50 },
  { day: "Tue", bookings: 45 },
  { day: "Wed", bookings: 70 },
  { day: "Thu", bookings: 60 },
  { day: "Fri", bookings: 80 },
  { day: "Sat", bookings: 90 },
];

const COLORS = ["#22c55e", "#eab308", "#ef4444"];

export const ChartOverview = () => {
  return (
    <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:px-6">
      {/* Pie Chart */}
      <div className="rounded-2xl border bg-white p-4 shadow-sm dark:bg-zinc-950">
        <h2 className="text-lg font-semibold mb-2 text-zinc-800 dark:text-zinc-200">
          Booking Status
        </h2>
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
      </div>

      {/* Bar Chart */}
      <div className="rounded-2xl border bg-white p-4 shadow-sm dark:bg-zinc-950">
        <h2 className="text-lg font-semibold mb-2 text-zinc-800 dark:text-zinc-200">
          Weekly Bookings
        </h2>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={barData}>
            <XAxis dataKey="day" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Bar dataKey="bookings" fill="#6366f1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
