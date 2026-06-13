import { useMemo } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import StatCard from "../../components/dashboard/StatCard";
import BudgetSummaryCard from "../../components/common/BudgetSummaryCard";
import StatusBadge from "../../components/dashboard/StatusBadge";
import { themes } from "../../constants/themes";
import { useAuth } from "../../hooks/useAuth";
import { useExpenses } from "../../hooks/useExpenses";
import { useNavigation } from "../../hooks/useNavigation";
import useDepartmentBudget from "../../hooks/useDepartmentBudget";

export default function EmployeeDashboard() {
	const theme = themes.employee;
	const { profile } = useAuth();
	const { expenses, loading, getStats, refetch } = useExpenses();
    const navItems = useNavigation();
    
   
    const { totalBudget, usedBudget } = useDepartmentBudget(
			profile.department_id,
		);

    // expenses,
	const stats = useMemo(() => getStats(), [getStats]);

	console.log("Employee Profile:", profile);

	// Get recent requests (limited to 5)
	const recentRequests = useMemo(
		() =>
			expenses.slice(0, 5).map((expense) => ({
				id: expense.id,
				name: expense.description || "Untitled Request",
				amount: `₵${(expense.amount || 0).toFixed(2)}`,
				status: expense.status || "pending",
				date: new Date(expense.created_at).toLocaleDateString("en-US", {
					month: "short",
					day: "numeric",
				}),
			})),
		[expenses],
	);

	// const breadcrumbs = ["Dashboard"];

	return (
		<DashboardLayout
			title="Dashboard"
			subtitle="Track your expenses and request approvals"
			// breadcrumbs={breadcrumbs}
			sidebarItems={navItems}
			theme={theme}
			user={profile}
		>
			<div className="space-y-6">
				{/* KPI Cards */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					<StatCard
						title="Pending"
						value={stats.pending}
						theme={themes.status.pending}
					/>
					<StatCard
						title="Approved"
						value={stats.approved}
						theme={themes.status.approved}
					/>
					<StatCard
						title="Rejected"
						value={stats.rejected}
						theme={themes.status.rejected}
					/>
					<StatCard
						title="Total Amount"
						value={`₵${stats.totalAmount.toFixed(2)}`}
						theme={theme}
					/>
				</div>

				{/* Main Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
					{/* Recent Requests */}
					<div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl p-5">
						<div className="flex justify-between items-center mb-4">
							<h2 className="font-medium text-gray-700">My Recent Requests</h2>

							{/* <a
								href="/dashboard/employee/my-requests"
								className="text-sm text-blue-600 hover:text-blue-700"
							>
								View all
							</a> */}

							<div className="flex items-center gap-3">
								<button
									onClick={() => refetch()}
									disabled={loading}
									className={`text-sm rounded-lg px-3 py-2 transition ${
										loading
											? "bg-gray-100 text-gray-500 cursor-not-allowed"
											: "bg-blue-600 text-white hover:bg-blue-700"
									}`}
								>
									{loading ? "Refreshing..." : "Refresh"}
								</button>

								<a
									href="/dashboard/employee/my-requests"
									className="text-sm text-blue-500  hover:text-blue-700 rounded-lg px-3 py-2 bg-blue-50 "
								>
									View all
								</a>
							</div>
						</div>

						{loading ? (
							<div className="text-center py-8 text-gray-500">
								Loading requests...
							</div>
						) : recentRequests.length === 0 ? (
							<div className="text-center py-8 text-gray-500">
								No requests yet. Create your first request!
							</div>
						) : (
							<table className="w-full text-sm">
								<thead className="text-gray-500 text-xs">
									<tr>
										<th className="text-left p-2">Request</th>
										<th className="text-left p-2">Amount</th>
										<th className="text-left p-2">Status</th>
										<th className="text-left p-2">Date</th>
									</tr>
								</thead>

								<tbody>
									{recentRequests.map((r) => (
										<tr key={r.id} className="border-t hover:bg-gray-50">
											<td className="p-2 font-medium">{r.name}</td>
											<td className="p-2">{r.amount}</td>
											<td className="p-2">
												<StatusBadge status={r.status} />
											</td>
											<td className="p-2 text-gray-500 text-xs">{r.date}</td>
										</tr>
									))}
								</tbody>
							</table>
						)}
					</div>

					{/* Budget Preview */}

					<BudgetSummaryCard
						title={`${profile.department_name} Budget Summary`}
						theme={theme}
						totalBudget={totalBudget}
						usedBudget={usedBudget}
					/>
				</div>

				{/* Budget Impact */}
				{/* <BudgetImpactPreview theme={theme} /> */}
			</div>
		</DashboardLayout>
	);
}
