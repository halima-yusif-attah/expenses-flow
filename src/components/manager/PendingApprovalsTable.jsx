import StatusBadge from "../dashboard/StatusBadge";

const STATUS_OPTIONS = [
	{ value: "pending", label: "Pending" },
	{ value: "approved", label: "Approved" },
	{ value: "rejected", label: "Rejected" },
	{ value: "paid", label: "Paid" },
];

export default function PendingApprovalsTable({
	expenses = [],
	loading,
	onStatusChange,
	showDropdown = false,
}) {
	const pendingExpenses = expenses.filter((item) => item.status === "pending");

	if (loading) {
		return (
			<div className="bg-white rounded-xl border p-6">Loading approvals...</div>
		);
	}

	return (
		<div className="bg-white rounded-xl border border-gray-100 p-5">
			<div className="flex justify-between items-center mb-4">
				<h2 className="font-medium text-gray-700">Pending Approvals</h2>
			</div>

			<table className="w-full text-sm">
				<thead className="text-xs text-gray-500">
					<tr>
						<th className="text-left p-2">Employee</th>
						<th className="text-left p-2">Request</th>
						<th className="text-left p-2">Amount</th>
						<th className="text-left p-2">Status</th>
						{showDropdown && (<th className="text-left p-2">Actions</th>)}
					</tr>
				</thead>

				<tbody>
					{pendingExpenses.map((expense) => (
						<tr key={expense.id} className="border-t hover:bg-gray-50">
							<td className="p-2">{expense.profiles?.full_name}</td>

							<td className="p-2">{expense.description}</td>

							<td className="p-2">${Number(expense.amount).toFixed(2)}</td>

							<td className="p-2">
								<StatusBadge status={expense.status} />
							</td>

							<td className="p-2">
								{showDropdown && (
									<div className="">
										{/* <StatusBadge status={expense.status} /> */}
										<select
											value={expense.status}
											onChange={(event) =>
												onStatusChange?.(expense.id, event.target.value)
											}
											className="w-fit rounded-md border-gray-200 bg-white px-3 py-2 text-sm text-slate-700"
										>
											{STATUS_OPTIONS.map((option) => (
												<option key={option.value} value={option.value}>
													{option.label}
												</option>
											))}
										</select>
									</div>
								) }
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
