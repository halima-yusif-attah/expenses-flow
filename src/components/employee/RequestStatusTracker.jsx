export default function RequestStatusTracker() {
	const steps = [
		{ label: "Submitted", done: true },
		{ label: "Manager Review", done: false },
		{ label: "Finance Review", done: false },
		{ label: "Approved", done: false },
	];

	return (
		<div className="bg-white border border-gray-100 rounded-xl p-5">
			<h3 className="font-medium text-gray-700 mb-4">Request Status</h3>

			<div className="space-y-3">
				{steps.map((s, i) => (
					<div key={i} className="flex items-center gap-3">
						<div
							className={`w-3 h-3 rounded-full ${
								s.done ? "bg-green-500" : "bg-gray-300"
							}`}
						/>
						<p className="text-sm text-gray-600">{s.label}</p>
					</div>
				))}
			</div>
		</div>
	);
}
