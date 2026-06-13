export default function BudgetImpactPreview({ theme }) {
	return (
		<div className={`bg-white border ${theme.border} rounded-xl p-5`}>
			<h3 className="font-medium text-gray-700 mb-4">Budget Impact Preview</h3>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="p-4 bg-gray-50 rounded-lg">
					<p className="text-xs text-gray-500">Marketing Budget</p>
					<p className="font-semibold">$20,000</p>
					<div className="w-full h-2 bg-gray-200 rounded mt-2">
						<div className="h-full bg-blue-500 w-[60%]" />
					</div>
				</div>

				<div className="p-4 bg-gray-50 rounded-lg">
					<p className="text-xs text-gray-500">Operations</p>
					<p className="font-semibold">$15,000</p>
					<div className="w-full h-2 bg-gray-200 rounded mt-2">
						<div className="h-full bg-blue-500 w-[40%]" />
					</div>
				</div>

				<div className="p-4 bg-gray-50 rounded-lg">
					<p className="text-xs text-gray-500">Equipment</p>
					<p className="font-semibold">$10,000</p>
					<div className="w-full h-2 bg-gray-200 rounded mt-2">
						<div className="h-full bg-blue-500 w-[75%]" />
					</div>
				</div>
			</div>
		</div>
	);
}




{/* <div className="bg-white border border-gray-100 rounded-xl p-5">
	<h3 className="font-semibold text-gray-800 mb-4">Budget Impact Preview</h3>

	<div className="space-y-3 text-sm">
		<div className="flex justify-between">
			<span>Department Budget</span>
			<span>$50,000</span>
		</div>

		<div className="flex justify-between">
			<span>Request Amount</span>
			<span>${formData.amount || 0}</span>
		</div>

		<div className="flex justify-between font-medium">
			<span>Remaining Budget</span>
			<span>
				${(50000 - (parseFloat(formData.amount) || 0)).toLocaleString()}
			</span>
		</div>
	</div>
</div>; */}
