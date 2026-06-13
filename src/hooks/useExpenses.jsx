import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "./useAuth";

export function useExpenses({ departmentId: explicitDepartmentId } = {}) {
	const { user, profile } = useAuth();
	const userId = user?.id;
	const departmentId = explicitDepartmentId ?? profile?.department_id;
	const [expenses, setExpenses] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Fetch all expenses for current user or for a manager's department
	// .select("*")
	const fetchExpenses = useCallback(async () => {
		if (!userId && !departmentId) return;

		setLoading(true);
		setError(null);

		try {
			const query = supabase
				.from("expense_requests")
				.select(
					`
  *,
  profiles!Expense_Request_employee_id_fkey (
    full_name
  )
`,
				)
				.order("created_at", { ascending: false });

			if (departmentId) {
				query.eq("department_id", departmentId);
			} else {
				query.eq("employee_id", userId);
			}

			const { data, error: queryError } = await query;

			if (queryError) throw queryError;
			console.log("Fetched expenses:", data);

			setExpenses(data || []);
		} catch (err) {
			setError(err.message);
			console.error("Failed to fetch expenses:", err);
		} finally {
			setLoading(false);
		}
	}, [userId, departmentId]);

	// Create new expense
	async function createExpense(expenseData) {
		if (!user?.id) throw new Error("Not authenticated");

		try {
			const { data, error: insertError } = await supabase
				.from("expense_requests")
				.insert([
					{
						title: expenseData.title,
						description: expenseData.description,
						category: expenseData.category,
						vendor: expenseData.vendor,
						amount: expenseData.amount,
						receipt_url: expenseData.receipt_url,

						employee_id: expenseData.employee_id,
						department_id: expenseData.department_id,

						status: "pending",
					},
				])
				.select()
				.single();

			if (insertError) throw insertError;

			setExpenses((prev) => [data, ...prev]);
			return data;
		} catch (err) {
			setError(err.message);
			console.error(err);
			console.error(err.message);
			console.error(err.details);
			console.error(err.hint);
			throw err;
		}
	}

	// Update expense
	async function updateExpense(id, updates) {
		try {
			const { data, error: updateError } = await supabase
				.from("expense_requests")
				.update(updates)
				.eq("id", id)
				.select();

			console.log("Updated data:", data);

			if (updateError) throw updateError;

			if (!data || data.length === 0) {
				throw new Error("Update succeeded but no row was returned.");
			}
			setExpenses((prev) => prev.map((e) => (e.id === id ? data[0] : e)));
			return data[0];
		} catch (err) {
			setError(err.message);
			throw err;
		}
	}

	async function approveExpense(id) {
		return updateExpense(id, {
			status: "approved",
			approved_by: user?.id,
			approved_at: new Date().toISOString(),
		});
	}

	async function rejectExpense(id) {
		return updateExpense(id, {
			status: "rejected",
			approved_by: user?.id,
			approved_at: new Date().toISOString(),
		});
	}

	// Delete expense
	async function deleteExpense(id) {
		try {
			const { error: deleteError } = await supabase
				.from("expense_requests")
				.delete()
				.eq("id", id);

			if (deleteError) throw deleteError;

			setExpenses((prev) => prev.filter((e) => e.id !== id));
		} catch (err) {
			setError(err.message);
			throw err;
		}
	}

	// Get expense by ID
	// function getExpenseById(id) {
	// 	return expenses.find((e) => `${e.id}` === `${id}`);
	// }
	function getExpenseById(id) {
		if (!expenses) return null;

		return expenses.find((e) => e?.id?.toString() === id?.toString());
	}

	// Get stats
	function getStats() {
		return {
			total: expenses.length,
			pending: expenses.filter((e) => e.status === "pending").length,
			approved: expenses.filter((e) => e.status === "approved").length,
			rejected: expenses.filter((e) => e.status === "rejected").length,
			totalAmount: expenses.reduce((sum, e) => sum + (e.amount || 0), 0),
		};
	}

useEffect(() => {
	if (!userId && !departmentId) return;

	const timeout = setTimeout(() => {
		fetchExpenses();
	}, 0);

	return () => clearTimeout(timeout);
}, [userId, departmentId, fetchExpenses]);

	return {
		expenses,
		loading,
		error,
		createExpense,
		updateExpense,
		approveExpense,
		rejectExpense,
		deleteExpense,
		getExpenseById,
		getStats,
		refetch: fetchExpenses,
	};
}

// Manager approves

// Manager clicks Approve.
// await supabase
// 	.from("expense_requests")
// 	.update({
// 		status: "approved",
// 		approved_by: profile.id,
// 		approved_at: new Date().toISOString(),
// 	})
// 	.eq("id", expenseId);

// Finance pays

// Finance clicks Mark Paid.

// await supabase
//   .from("expense_requests")
//   .update({
//     status: "paid",
//     paid_by: profile.id,
//     paid_at: new Date().toISOString(),
//   })
//   .eq("id", expenseId);
