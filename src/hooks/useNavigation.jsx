import { useMemo } from "react";
import { useAuth } from "./useAuth";
import {
	LayoutDashboard,
	FileText,
	CheckCircle2,
	User,
	Users,
	BarChart3,
	CreditCard,
	Building,
	ShieldAlert,
} from "lucide-react";

const NAV_ITEMS = {
	employee: [
		{
			label: "Dashboard",
			path: "/dashboard/employee",
			icon: LayoutDashboard,
		},
		{
			label: "My Requests",
			path: "/dashboard/employee/my-requests",
			icon: FileText,
		},
		{
			label: "New Request",
			path: "/dashboard/employee/new-request",
			icon: CheckCircle2,
		},
		{
			label: "Profile",
			path: "/dashboard/employee/profile",
			icon: User,
		},
	],
	manager: [
		{
			label: "Dashboard",
			path: "/dashboard/manager",
			icon: LayoutDashboard,
		},
		{
			label: "Approvals",
			path: "/dashboard/manager/approvals",
			icon: CheckCircle2,
		},
		{
			label: "Team Expenses",
			path: "/dashboard/manager/team-expenses",
			icon: FileText,
		},
		{
			label: "Analytics",
			path: "/dashboard/manager/analytics",
			icon: BarChart3,
		},
	],
	finance: [
		{
			label: "Dashboard",
			path: "/dashboard/finance",
			icon: LayoutDashboard,
		},
		{
			label: "Expenses",
			path: "/dashboard/finance/expenses",
			icon: FileText,
		},
		{
			label: "Payments",
			path: "/dashboard/finance/payments",
			icon: CreditCard,
		},
		{
			label: "Reports",
			path: "/dashboard/finance/reports",
			icon: BarChart3,
		},
	],
	admin: [
		{
			label: "Dashboard",
			path: "/dashboard/admin",
			icon: LayoutDashboard,
		},
		{
			label: "Users",
			path: "/dashboard/admin/users",
			icon: Users,
		},
		{
			label: "Departments",
			path: "/dashboard/admin/departments",
			icon: Building,
		},
		{
			label: "Audit Logs",
			path: "/dashboard/admin/audit-logs",
			icon: ShieldAlert,
		},
	],
};

export function useNavigation() {
	const { role } = useAuth();

	const navItems = useMemo(() => {
		return NAV_ITEMS[role] || NAV_ITEMS.employee;
	}, [role]);

	return navItems;
}
