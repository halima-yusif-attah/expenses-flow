import { StatusDistribution, TopSpendersList } from "../../components/analytics/AnalyticsLists";
import { CategoryBreakdown } from "../../components/analytics/CategoryBreakdown";
import { SpendingTrend } from "../../components/analytics/SpendingTrend";
import { themes } from "../../constants/themes";
import { useAnalytics } from "../../hooks/useAnalytics";
import { useAuth } from "../../hooks/useAuth";
import { useNavigation } from "../../hooks/useNavigation";
import DashboardLayout from "../../layouts/DashboardLayout";


export default function ManagerAnalyticsPage() {
	const { categories, trends, spenders, statusCounts, loading, error } =
        useAnalytics();
        const theme = themes.manager;
    
        const { profile } = useAuth();
        const navItems = useNavigation();

    const breadcrumbs = ["Department Insights"];

	if (loading) {
		return (
			<div className="flex justify-center items-center ">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="p-8 text-center text-rose-600">
				<p className="font-semibold">Something went wrong:</p>
				<p className="text-sm">{error}</p>
			</div>
		);
	}

    return (
			<DashboardLayout
				title="Manager Dashboard"
				subtitle="Review and approve team expenses"
				sidebarItems={navItems}
				theme={theme}
				user={profile}
				breadcrumbs={breadcrumbs}
			>
				<div className="space-y-8 max-w-7xl mx-auto">
					<p className="text-sm text-slate-500">
						Track and assess historical spending habits for your core team
						parameters.
					</p>
					

					{/* Main Aggregation Charts Row */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						<CategoryBreakdown data={categories} />
						<SpendingTrend data={trends} />
					</div>

					{/* Auxiliary Metadata Lists Row */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<TopSpendersList data={spenders} />
						<StatusDistribution data={statusCounts} />
					</div>
				</div>
			</DashboardLayout>
		);
}
