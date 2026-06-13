import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Modal from "../../components/common/Modal";
import DashboardLayout from "../../layouts/DashboardLayout";
import StatusBadge from "../../components/dashboard/StatusBadge";
import { themes } from "../../constants/themes";
import { useAuth } from "../../hooks/useAuth";
import { useExpenses } from "../../hooks/useExpenses";
import { useNavigation } from "../../hooks/useNavigation";

export default function MyRequests() {
	const theme = themes.employee;
	const { profile } = useAuth();
	const { expenses, loading, refetch, deleteExpense } = useExpenses();
	const navigate = useNavigate();
	const navItems = useNavigation();
	const [filter, setFilter] = useState("all");

	const [confirmOpen, setConfirmOpen] = useState(false);
	const [pendingDeleteId, setPendingDeleteId] = useState(null);

	const showDeleteModal = (id) => {
		setPendingDeleteId(id);
		setConfirmOpen(true);
	};

	const handleDelete = async () => {
		if (!pendingDeleteId) return;

		try {
			await deleteExpense(pendingDeleteId);
			toast.success("Request deleted");
			refetch();
		} catch (err) {
			console.error("Failed to delete expense", err);
			toast.error(err.message || "Failed to delete expense request.");
		} finally {
			setConfirmOpen(false);
			setPendingDeleteId(null);
		}
	};

	// Filter expenses based on selected status
	const filteredExpenses = expenses.filter((expense) => {
		if (filter === "all") return true;
		return expense.status === filter;
	});

	// const breadcrumbs = ["My Requests"];

	return (
		<DashboardLayout
			title="My Requests"
			subtitle="View and manage all your expense requests"
			// breadcrumbs={breadcrumbs}
			sidebarItems={navItems}
			theme={theme}
			user={profile}
		>
			<div className="space-y-4">
				{/* Filter Buttons */}
				{/* <div className="flex flex-wrap gap-2">
					{["all", "pending", "approved", "rejected"].map((status) => (
						<button
							key={status}
							onClick={() => setFilter(status)}
							className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
								filter === status
									? `${theme.primary} text-white`
									: "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}
						>
							{status.charAt(0).toUpperCase() + status.slice(1)}
						</button>
					))}
				</div> */}

				<div className="flex flex-wrap gap-2 items-center justify-between">
					<div className="flex flex-wrap gap-2">
						{["all", "pending", "approved", "rejected"].map((status) => (
							<button
								key={status}
								onClick={() => setFilter(status)}
								className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
									filter === status
										? `${theme.primary} text-white`
										: "bg-gray-100 text-gray-700 hover:bg-gray-200"
								}`}
							>
								{status.charAt(0).toUpperCase() + status.slice(1)}
							</button>
						))}
					</div>

					{/* Refresh Button */}
					<button
						onClick={() => refetch()}
						disabled={loading}
						className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
							loading
								? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-500"
								: `${theme.primary} text-white hover:opacity-90`
						}`}
						title="Refresh expense list"
					>
						{loading ? "Refreshing..." : "↻ Refresh"}
					</button>
				</div>

				{/* Requests Table */}
				<div className="bg-white border border-gray-100 rounded-xl p-5">
					<h2 className="font-semibold mb-4 text-gray-800">
						{filter === "all"
							? "All Requests"
							: `${filter.charAt(0).toUpperCase() + filter.slice(1)} Requests`}
					</h2>

					{loading ? (
						<div className="text-center py-8 text-gray-500">
							Loading requests...
						</div>
					) : filteredExpenses.length === 0 ? (
						<div className="text-center py-12 text-gray-500">
							<p className="text-lg">No requests found</p>
							<p className="text-sm">
								{filter === "all"
									? "Create your first expense request to get started."
									: `You don't have any ${filter} requests yet.`}
							</p>
						</div>
					) : (
						<table className="w-full text-sm">
							<thead className="text-gray-500 text-xs font-semibold">
								<tr className="border-b">
									<th className="text-left p-3">Request</th>
									<th className="text-left p-3">Category</th>
									<th className="text-left p-3">Amount</th>
									<th className="text-left p-3">Status</th>
									<th className="text-left p-3">Date</th>
									<th className="text-left p-3">Actions</th>
								</tr>
							</thead>

							<tbody>
								{filteredExpenses.map((expense) => (
									<tr
										key={expense.id}
										className="border-t hover:bg-gray-50 transition-colors"
									>
										<td className="p-3 font-medium text-gray-900">
											{expense.description || "Untitled"}
										</td>
										<td className="p-3 text-gray-600">
											{expense.category || "N/A"}
										</td>
										<td className="p-3 font-semibold">
											${(expense.amount || 0).toFixed(2)}
										</td>
										<td className="p-3">
											<StatusBadge status={expense.status || "pending"} />
										</td>
										<td className="p-3 text-gray-500 text-xs">
											{new Date(expense.created_at).toLocaleDateString(
												"en-US",
												{
													year: "numeric",
													month: "short",
													day: "numeric",
												},
											)}
										</td>
										<td className="p-3 text-right space-x-2">
											<button
												onClick={() =>
													navigate(
														`/dashboard/employee/my-requests/${expense.id}`,
													)
												}
												className="px-3 py-1 rounded-lg bg-blue-600 text-white text-xs hover:bg-blue-700"
											>
												Edit
											</button>
											<button
												onClick={() => showDeleteModal(expense.id)}
												className="px-3 py-1 rounded-lg bg-red-600 text-white text-xs hover:bg-red-700"
											>
												Delete
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>

				{/* Confirm Modal */}
				<Modal
					open={confirmOpen}
					onClose={() => setConfirmOpen(false)}
					title="Delete Request"
					confirmLabel="Delete"
					onConfirm={handleDelete}
				>
					<p>
						Are you sure you want to delete this expense request? This action
						cannot be undone.
					</p>
				</Modal>
			</div>
		</DashboardLayout>
	);
}
