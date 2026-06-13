import { useMemo } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import StatCard from "../../components/dashboard/StatCard";
import PendingApprovalsTable from "../../components/manager/PendingApprovalsTable";

import { themes } from "../../constants/themes";

import { useAuth } from "../../hooks/useAuth";
import { useNavigation } from "../../hooks/useNavigation";
import { useExpenses } from "../../hooks/useExpenses";
import BudgetSummaryCard from "../../components/common/BudgetSummaryCard";
import useDepartmentBudget from "../../hooks/useDepartmentBudget";

export default function ManagerDashboard() {
	const theme = themes.manager;

	const { profile } = useAuth();
	const navItems = useNavigation();

	const { expenses, loading } = useExpenses({
		departmentId: profile?.department_id,
	});

	const { totalBudget, usedBudget } = useDepartmentBudget(
		profile.department_id,
	);

	const stats = useMemo(() => {
		const pending = expenses.filter((expense) => expense.status === "pending");

		const approved = expenses.filter(
			(expense) => expense.status === "approved",
		);

		const totalPendingAmount = pending.reduce(
			(sum, item) => sum + Number(item.amount || 0),
			0,
		);

		return {
			pendingApprovals: pending.length,
			pendingAmount: totalPendingAmount,
			approvedCount: approved.length,
			rejectedCount: expenses.filter((expense) => expense.status === "rejected").length,
		};
	}, [expenses]);

	return (
		<DashboardLayout
			title="Manager Dashboard"
			subtitle="Review and approve team expenses"
			sidebarItems={navItems}
			theme={theme}
			user={profile}
		>
			<div className="space-y-6">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					<StatCard
						title="Pending Approvals"
						value={stats.pendingApprovals}
						theme={theme}
					/>

					<StatCard
						title="Pending Amount"
						value={`$${stats.pendingAmount.toFixed(2)}`}
						theme={themes.status.pending}
					/>

					<StatCard
						title="Approved Requests"
						value={stats.approvedCount}
						theme={themes.status.approved}
					/>

					<StatCard
						title="Rejected Requests"
						value={stats.rejectedCount}
						theme={themes.status.rejected}
					/>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
					<div className="lg:col-span-2">
						<PendingApprovalsTable
							expenses={expenses}
							loading={loading}
							showDropdown={false}
						/>
					</div>

					<BudgetSummaryCard
						title="Department Budget"
						theme={theme}
						totalBudget={totalBudget}
						usedBudget={usedBudget}
					/>
				</div>
			</div>
		</DashboardLayout>
	);
}
