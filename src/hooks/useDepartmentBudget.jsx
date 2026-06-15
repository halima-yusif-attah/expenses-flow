import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";


export default function useDepartmentBudget(departmentId) {
	const [summary, setSummary] = useState({
		totalBudget: 0,
		usedBudget: 0,
		remainingBudget: 0,
		percentage: 0,
	});

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	
	const fetchBudgetSummary = useCallback(async () => {
		if (!departmentId) {
			setLoading(false);
			return;
		}

		setLoading(true);
		setError(null);

		try {
			const { data, error } = await supabase.rpc(
				"get_department_budget_summary",
				{
					dept_id: departmentId,
				},
			);

			if (error) throw error;

			const totalBudget = Number(data.totalBudget || 0);
			const usedBudget = Number(data.usedBudget || 0);
			const remainingBudget = Number(data.remainingBudget || 0);

			console.log("usedept- usedBudget:", usedBudget, "totalBudget:", totalBudget);

			const percentage = totalBudget > 0 ? (usedBudget / totalBudget) * 100 : 0;

			setSummary({
				totalBudget,
				usedBudget,
				remainingBudget,
				percentage,
			});
		} catch (err) {
			console.error("Failed to fetch budget summary:", err);
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}, [departmentId]);

    useEffect(() => {
			if (!departmentId) return;

			const timeout = setTimeout(() => {
				fetchBudgetSummary();
			}, 0);

			return () => clearTimeout(timeout);
		}, [departmentId, fetchBudgetSummary]);

	return {
		...summary,
		loading,
		error,
		refreshBudget: fetchBudgetSummary,
	};
}
