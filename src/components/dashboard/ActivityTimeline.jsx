export default function ActivityTimeline({ activities = [], theme }) {
	return (
		<div className={`rounded-xl border ${theme.border} bg-white p-5`}>
			<h3 className="font-medium text-gray-700 mb-4">Recent Activity</h3>

			<div className="space-y-4">
				{activities.map((a, index) => (
					<div key={index} className="flex gap-3">
						<div className={`w-2 h-2 mt-2 rounded-full ${theme.primary}`} />

						<div>
							<p className="text-sm text-gray-800">{a.message}</p>
							<p className="text-xs text-gray-400">{a.time}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
