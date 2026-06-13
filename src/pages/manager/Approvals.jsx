import DashboardLayout from "../../layouts/DashboardLayout";
import PendingApprovalsTable from "../../components/manager/PendingApprovalsTable";

import { themes } from "../../constants/themes";

import { useAuth } from "../../hooks/useAuth";
import { useNavigation } from "../../hooks/useNavigation";
import { useExpenses } from "../../hooks/useExpenses";

export default function Approvals() {
	const theme = themes.manager;

	const { profile } = useAuth();
	const navItems = useNavigation();

	const { expenses, loading, approveExpense, rejectExpense, updateExpense } =
		useExpenses({
			departmentId: profile?.department_id,
		});

	const handleStatusChange = async (expenseId, newStatus) => {
		if (newStatus === "approved") {
			return approveExpense(expenseId);
		}

		if (newStatus === "rejected") {
			return rejectExpense(expenseId);
		}

		return updateExpense(expenseId, { status: newStatus });
	};

	return (
		<DashboardLayout
			title="Approvals"
			subtitle="Review expense requests"
			sidebarItems={navItems}
			theme={theme}
			user={profile}
		>
			<PendingApprovalsTable
				expenses={expenses}
				loading={loading}
				onStatusChange={handleStatusChange}
				showDropdown={true}
			/>
		</DashboardLayout>
	);
}
