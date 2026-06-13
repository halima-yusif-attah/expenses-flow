import StatusBadge from "./StatusBadge";

export default function ExpenseTable({ data = [] }) {
	return (
		<div className="rounded-xl border border-gray-100 bg-white overflow-hidden">
			<div className="p-4 border-b border-gray-100">
				<h3 className="font-medium text-gray-700">Recent Expenses</h3>
			</div>

			<table className="w-full text-sm">
				<thead className="bg-gray-50 text-gray-500 text-xs">
					<tr>
						<th className="text-left p-3">Title</th>
						<th className="text-left p-3">Amount</th>
						<th className="text-left p-3">Category</th>
						<th className="text-left p-3">Status</th>
						<th className="text-left p-3">Date</th>
					</tr>
				</thead>

				<tbody>
					{data.map((item) => (
						<tr
							key={item.id}
							className="border-t border-gray-100 hover:bg-gray-50 transition"
						>
							<td className="p-3 font-medium text-gray-800">{item.title}</td>

							<td className="p-3 text-gray-600">${item.amount}</td>

							<td className="p-3 text-gray-500">{item.category}</td>

							<td className="p-3">
								<StatusBadge status={item.status} />
							</td>

							<td className="p-3 text-gray-400 text-xs">{item.date}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
