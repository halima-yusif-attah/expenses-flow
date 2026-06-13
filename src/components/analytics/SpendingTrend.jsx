import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

export function SpendingTrend({ data, title = "Month-over-Month Trends" }) {
	return (
		<div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
			<h3 className="text-base font-semibold text-slate-900 mb-4">{title}</h3>
			<div className="h-64 w-full">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						data={data}
						margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
					>
						<CartesianGrid
							strokeDasharray="3 3"
							vertical={false}
							stroke="#f1f5f9"
						/>
						<XAxis
							dataKey="month_label"
							stroke="#94a3b8"
							fontSize={12}
							tickLine={false}
						/>
						<YAxis
							stroke="#94a3b8"
							fontSize={12}
							tickLine={false}
							axisLine={false}
							tickFormatter={(value) => `$${value}`}
						/>
						<Tooltip
							formatter={(value) => [`$${value.toLocaleString()}`, "Amount"]}
							contentStyle={{
								backgroundColor: "#fff",
								borderRadius: "8px",
								border: "1px solid #e2e8f0",
							}}
						/>
						<Bar
							dataKey="total_amount"
							fill="#3B82F6"
							radius={[4, 4, 0, 0]}
							maxBarSize={50}
						/>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
