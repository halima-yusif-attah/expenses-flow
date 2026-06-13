export function TopSpendersList({ data }) {
	return (
		<div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
			<div>
				<h3 className="text-base font-semibold text-slate-900 mb-4">
					Top Department Spenders
				</h3>
				<div className="space-y-4">
					{data.length === 0 ? (
						<p className="text-sm text-slate-500 py-4">No data tracked yet.</p>
					) : (
						data.map((user, idx) => (
							<div
								key={idx}
								className="flex items-center justify-between border-b border-slate-50 pb-2 last:border-0"
							>
								<div className="flex items-center gap-3">
									<div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-medium text-slate-700 text-sm">
										{user.employee_name.charAt(0)}
									</div>
									<span className="text-sm font-medium text-slate-800">
										{user.employee_name}
									</span>
								</div>
								<span className="text-sm font-semibold text-slate-900">
									${Number(user.total_amount).toLocaleString()}
								</span>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}

export function StatusDistribution({ data }) {
	const statusColors = {
		approved: "bg-emerald-500",
		pending: "bg-amber-500",
		rejected: "bg-rose-500",
	};

	return (
		<div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
			<h3 className="text-base font-semibold text-slate-900 mb-4">
				Request Status Volumetrics (30 Days)
			</h3>
			<div className="space-y-4">
				{data.map((item, idx) => (
					<div key={idx} className="space-y-2">
						<div className="flex justify-between text-sm">
							<span className="capitalize font-medium text-slate-700">
								{item.status_label}
							</span>
							<span className="font-semibold text-slate-900">
								{item.request_count} requests
							</span>
						</div>
						<div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
							<div
								className={`h-full ${statusColors[item.status_label] || "bg-slate-400"}`}
								style={{
									width: `${Math.min((item.request_count / 50) * 100, 100)}%`,
								}}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
