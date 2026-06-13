import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from "recharts";

const COLORS = [
	"#3B82F6",
	"#10B981",
	"#F59E0B",
	"#EF4444",
	"#8B5CF6",
	"#EC4899",
];

export function CategoryBreakdown({ data, title = "Spending by Category" }) {
	// Format data for Recharts keys
	const chartData = data.map((item) => ({
		name: item.category,
		value: Number(item.total_amount),
	}));

	return (
		<div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
			<h3 className="text-base font-semibold text-slate-900 mb-4">{title}</h3>
			<div className="h-64 w-full">
				<ResponsiveContainer width="100%" height="100%">
					<PieChart>
						<Pie
							data={chartData}
							cx="50%"
							cy="50%"
							innerRadius={60}
							outerRadius={80}
							paddingAngle={4}
							dataKey="value"
						>
							{chartData.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={COLORS[index % COLORS.length]}
								/>
							))}
						</Pie>
						<Tooltip
							formatter={(value) => [
								`$${value.toLocaleString()}`,
								"Total Spend",
							]}
							contentStyle={{
								backgroundColor: "#fff",
								borderRadius: "8px",
								border: "1px solid #e2e8f0",
							}}
						/>
						<Legend verticalAlign="bottom" height={36} iconType="circle" />
					</PieChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
