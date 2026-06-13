export default function StatCard({
	title,
	value,
	icon,
	trend,
	theme,
	description,
}) {
	return (
		<div
			className={`rounded-xl border ${theme.border} bg-white p-5 shadow-sm hover:shadow-md transition`}
		>
			<div className="flex items-start justify-between">
				<div>
					<p className="text-sm text-gray-500">{title}</p>

					<h2 className="text-2xl font-semibold mt-1 text-gray-900">{value}</h2>

					{description && (
						<p className="text-xs text-gray-400 mt-1">{description}</p>
					)}
				</div>

				<div
					className={`p-3 rounded-lg ${theme.light} ${theme.text} flex items-center justify-center`}
				>
					{icon}
				</div>
			</div>

			{trend && (
				<div className="mt-4 text-xs text-gray-500 flex items-center gap-1">
					<span
						className={
							trend.startsWith("+") ? "text-green-500" : "text-red-500"
						}
					>
						{trend}
					</span>
					<span>vs last period</span>
				</div>
			)}
		</div>
	);
}
