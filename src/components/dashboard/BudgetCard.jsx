export default function BudgetCard({ title, spent, budget, theme }) {
	const percent = Math.min((spent / budget) * 100, 100);

	return (
		<div className={`rounded-xl border ${theme.border} bg-white p-5`}>
			<div className="flex justify-between items-center">
				<h3 className="font-medium text-gray-700">{title}</h3>

				<span className="text-sm text-gray-500">
					{spent} / {budget}
				</span>
			</div>

			<div className="mt-4 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
				<div
					className={`h-full ${theme.primary} transition-all`}
					style={{ width: `${percent}%` }}
				/>
			</div>

			<p className="text-xs text-gray-500 mt-2">{percent.toFixed(0)}% used</p>
		</div>
	);
}
