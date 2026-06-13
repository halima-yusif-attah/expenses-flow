export default function BudgetSummaryCard({
	title = "Budget Summary",
	totalBudget = 0,
	usedBudget = 0,
	theme,
	showProgress = true,
}) {

	const remainingBudget = Math.max(totalBudget - usedBudget, 0);

	const percentage = totalBudget > 0 ? (usedBudget / totalBudget) * 100 : 0;

	return (
		<div className={`border ${theme.border} rounded-xl p-5 bg-white`}>
			<h3 className="font-medium text-gray-700 mb-4">{title}</h3>

			<div className="space-y-4 text-sm">
				<div>
					<p className="text-gray-500">Total Budget</p>
					<p className="font-semibold">₵{totalBudget.toLocaleString()}</p>
				</div>

				<div>
					<p className="text-gray-500">Used</p>
					<p className="font-semibold text-red-500">
						₵{usedBudget.toLocaleString()}
					</p>
				</div>

				<div>
					<p className="text-gray-500">Remaining</p>
					<p className="font-semibold text-green-600">
						₵{remainingBudget.toLocaleString()}
					</p>
				</div>

				{showProgress && (
					<>
						<div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
							<div
								className={`${theme.primary} h-full transition-all duration-300`}
								style={{
									width: `${Math.min(percentage, 100)}%`,
								}}
							/>
						</div>

						<p className="text-xs text-gray-400">
							{percentage.toFixed(0)}% utilized
						</p>
					</>
				)}
			</div>
		</div>
	);
}
