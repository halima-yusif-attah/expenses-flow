import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { supabase } from "../lib/supabaseClient";

// export function useAnalytics() {
// 	const { userId } = useAuth();
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState(null);

// 	const [categories, setCategories] = useState([]);
// 	const [trends, setTrends] = useState([]);
// 	const [spenders, setSpenders] = useState([]);
// 	const [statusCounts, setStatusCounts] = useState([]);

// 	const fetchAnalytics = useCallback(async () => {
// 		if (!userId) return;

// 		try {
// 			setLoading(true);
// 			setError(null);

// 			// Run your 4 Supabase RPC functions concurrently
// 			const [catRes, trendRes, spendRes, statusRes] = await Promise.all([
// 				supabase.rpc("get_manager_category_breakdown", {
// 					auth_user_id: userId,
// 				}),
// 				supabase.rpc("get_manager_monthly_trend", { auth_user_id: userId }),
// 				supabase.rpc("get_manager_top_spenders", { auth_user_id: userId }),
// 				supabase.rpc("get_manager_status_distribution", {
// 					auth_user_id: userId,
// 				}),
// 			]);

// 			// Check for errors in any of the responses
// 			if (catRes.error) throw catRes.error;
// 			if (trendRes.error) throw trendRes.error;
// 			if (spendRes.error) throw spendRes.error;
// 			if (statusRes.error) throw statusRes.error;

// 			// Update states
// 			setCategories(catRes.data || []);
// 			setTrends(trendRes.data || []);
// 			setSpenders(spendRes.data || []);
// 			setStatusCounts(statusRes.data || []);
// 		} catch (err) {
// 			console.error("Error fetching analytics metrics:", err);
// 			setError(err.message || "Failed to load analytics data");
// 		} finally {
// 			setLoading(false);
// 		}
// 	}, [userId]);

// 	// Automatically fetch data when the user logs in / component mounts
// 	useEffect(() => {
// 		fetchAnalytics();
// 	}, [fetchAnalytics]);

// 	return {
// 		loading,
// 		error,
// 		categories,
// 		trends,
// 		spenders,
// 		statusCounts,
// 		refetch: fetchAnalytics, // Allows you to pull fresh data on demand (e.g., a pull-to-refresh button)
// 	};
// }




export function useAnalytics() {
  const { userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [categories, setCategories] = useState([]);
  const [trends, setTrends] = useState([]);
  const [spenders, setSpenders] = useState([]);
  const [statusCounts, setStatusCounts] = useState([]);

  useEffect(() => {
    // If there is no authenticated userId yet, don't execute the query
    if (!userId) {
      return;
    }
    
    // Declare the async data-fetching logic inside the effect
    async function executeFetch() {
      try {
        setLoading(true);
        setError(null);

        const [catRes, trendRes, spendRes, statusRes] = await Promise.all([
          supabase.rpc('get_manager_category_breakdown', { auth_user_id: userId }),
          supabase.rpc('get_manager_monthly_trend', { auth_user_id: userId }),
          supabase.rpc('get_manager_top_spenders', { auth_user_id: userId }),
          supabase.rpc('get_manager_status_distribution', { auth_user_id: userId })
        ]);

        if (catRes.error) throw catRes.error;
        if (trendRes.error) throw trendRes.error;
        if (spendRes.error) throw spendRes.error;
          if (statusRes.error) throw statusRes.error;
          
          console.log("Fetched analytics data:", {
            categories: catRes,
            trends: trendRes.data,
            spenders: spendRes.data,
            statusCounts: statusRes.data
          });

        setCategories(catRes.data || []);
        setTrends(trendRes.data || []);
        setSpenders(spendRes.data || []);
        setStatusCounts(statusRes.data || []);

      } catch (err) {
        console.error("Error fetching analytics metrics:", err);
        setError(err.message || "Failed to load analytics data");
      } finally {
        setLoading(false);
      }
    }

    executeFetch();
  }, [userId]); // Only re-run if the logged-in user changes

  return {
    loading,
    error,
    categories,
    trends,
    spenders,
    statusCounts
  };
}
