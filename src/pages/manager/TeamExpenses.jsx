import DashboardLayout from "../../layouts/DashboardLayout";
import StatusBadge from "../../components/dashboard/StatusBadge";

import { themes } from "../../constants/themes";

import { useAuth } from "../../hooks/useAuth";
import { useNavigation } from "../../hooks/useNavigation";
import { useExpenses } from "../../hooks/useExpenses";

export default function TeamExpenses() {
	const theme = themes.manager;

	const { profile } = useAuth();
	const navItems = useNavigation();

	const { expenses, loading } = useExpenses({
		departmentId: profile?.department_id,
	});

	if (loading) {
		return (
			<DashboardLayout
				title="Team Expenses"
				subtitle="View department spending"
				sidebarItems={navItems}
				theme={theme}
				user={profile}
			>
				<div className="bg-white rounded-xl border border-gray-100 p-5 text-center text-sm text-slate-500">
					Loading department expenses...
				</div>
			</DashboardLayout>
		);
	}

	return (
		<DashboardLayout
			title="Team Expenses"
			subtitle="View department spending"
			sidebarItems={navItems}
			theme={theme}
			user={profile}
		>
			<div className="bg-white rounded-xl border border-gray-100 p-5">
				<table className="w-full text-sm">
					<thead className="text-xs text-gray-500">
						<tr>
							<th className="text-left p-2">Employee</th>
							<th className="text-left p-2">Request</th>
							<th className="text-left p-2">Amount</th>
							<th className="text-left p-2">Status</th>
							<th className="text-left p-2">Date</th>
						</tr>
					</thead>

					<tbody>
						{expenses.map((expense) => (
							<tr key={expense.id} className="border-t hover:bg-gray-50">
								<td className="p-2">{expense.profiles?.full_name}</td>

								<td className="p-2">{expense.description}</td>

								<td className="p-2">${Number(expense.amount).toFixed(2)}</td>

								<td className="p-2">
									<StatusBadge status={expense.status} />
								</td>

								<td className="p-2">
									{new Date(expense.created_at).toLocaleDateString()}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</DashboardLayout>
	);
}
