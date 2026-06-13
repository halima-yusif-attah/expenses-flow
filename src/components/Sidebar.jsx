// import { NavLink } from "react-router-dom";
// import { useUIStore } from "../store/uiStore";
// import {
// 	LayoutDashboard,
// 	PlusCircle,
// 	FileText,
// 	CheckSquare,
// 	Users,
// 	CreditCard,
// 	ShieldAlert,
// 	Building,
// 	X,
// 	Wallet,
// } from "lucide-react";

// // Navigation configurations linked directly to the system specifications
// const NAV_ITEMS = {
// 	employee: [
// 		{ label: "Dashboard", to: "/dashboard/employee", icon: LayoutDashboard },
// 		{
// 			label: "New Request",
// 			to: "/dashboard/employee/new-request",
// 			icon: PlusCircle,
// 		},
// 		{
// 			label: "My Requests",
// 			to: "/dashboard/employee/my-requests",
// 			icon: FileText,
// 		},
// 	],
// 	manager: [
// 		{ label: "Dashboard", to: "/dashboard/manager", icon: LayoutDashboard },
// 		{
// 			label: "Approvals",
// 			to: "/dashboard/manager/approvals",
// 			icon: CheckSquare,
// 		},
// 		{
// 			label: "Team Expenses",
// 			to: "/dashboard/manager/team-expenses",
// 			icon: Users,
// 		},
// 	],
// 	finance: [
// 		{ label: "Dashboard", to: "/dashboard/finance", icon: LayoutDashboard },
// 		{ label: "Payments", to: "/dashboard/finance/payments", icon: CreditCard },
// 		{ label: "Reports", to: "/dashboard/finance/reports", icon: FileText },
// 	],
// 	admin: [
// 		{ label: "Dashboard", to: "/dashboard/admin", icon: LayoutDashboard },
// 		{ label: "Users", to: "/dashboard/admin/users", icon: Users },
// 		{
// 			label: "Departments",
// 			to: "/dashboard/admin/departments",
// 			icon: Building,
// 		},
// 		{
// 			label: "Audit Logs",
// 			to: "/dashboard/admin/audit-logs",
// 			icon: ShieldAlert,
// 		},
// 	],
// };

// export function Sidebar({ role = "employee" }) {
//     // isSidebarOpen;
// 	const { closeMobileMenu } = useUIStore();
// 	const items = NAV_ITEMS[role] || [];

// 	const navLinkClass = ({ isActive }) => `
//     flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
//     ${
// 			isActive
// 				? "bg-slate-900 text-white shadow-sm"
// 				: "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
// 		}
//   `;

// 	return (
// 		<aside className="flex flex-col h-full bg-white border-r border-slate-200 w-full">
// 			{/* Brand Header Header */}
// 			<div className="h-16 flex items-center justify-between px-6 border-b border-slate-100">
// 				<div className="flex items-center space-x-2.5">
// 					<div className="bg-slate-900 p-2 rounded-lg text-white">
// 						<Wallet className="h-5 w-5" />
// 					</div>
// 					<span className="font-bold text-lg text-slate-900 tracking-tight">
// 						ExpenseFlow
// 					</span>
// 				</div>

// 				{/* Mobile Dismiss Action */}
// 				<button
// 					onClick={closeMobileMenu}
// 					className="lg:hidden p-1.5 rounded-md text-slate-500 hover:bg-slate-100"
// 					aria-label="Close menu"
// 				>
// 					<X className="h-5 w-5" />
// 				</button>
// 			</div>

// 			{/* Primary Links Grid */}
// 			<nav className="flex-1 space-y-1 px-4 py-6 overflow-y-auto">
// 				{items.map((item) => {
// 					const Icon = item.icon;
// 					return (
// 						<NavLink
// 							key={item.to}
// 							to={item.to}
// 							onClick={closeMobileMenu}
// 							className={navLinkClass}
// 						>
// 							<Icon className="h-4 w-4 shrink-0" />
// 							<span>{item.label}</span>
// 						</NavLink>
// 					);
// 				})}
// 			</nav>

// 			{/* Static Footer Section Context */}
// 			<div className="p-4 border-t border-slate-100 bg-slate-50/70">
// 				<div className="flex items-center space-x-3 px-2">
// 					<div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
// 					<span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
// 						{role} Workspace
// 					</span>
// 				</div>
// 			</div>
// 		</aside>
// 	);
// }

// import { NavLink } from "react-router-dom";

// export default function Sidebar({ items, theme, user }) {
// 	return (
// 		<aside
// 			className="
//       hidden lg:flex
//       flex-col
//       w-64
//       bg-white
//       border-r
//       border-slate-200
//       "
// 		>
// 			<div className="p-6 border-b">
// 				<h2 className="font-bold text-lg">ExpenseFlow</h2>
// 			</div>

// 			<nav className="flex-1 p-4 space-y-2">
// 				{items.map((item) => {
// 					const Icon = item.icon;

// 					return (
// 						<NavLink
// 							key={item.path}
// 							to={item.path}
// 							className={({ isActive }) =>
// 								`
//                 flex items-center gap-3
//                 px-4 py-3
//                 rounded-xl
//                 text-sm
//                 transition-all

//                 ${
// 									isActive
// 										? `${theme.primary} text-white`
// 										: "hover:bg-slate-100"
// 								}
//               `
// 							}
// 						>
// 							<Icon size={18} />

// 							{item.label}
// 						</NavLink>
// 					);
// 				})}
// 			</nav>

// 			<div className="border-t p-4">
// 				<div className="flex items-center gap-3">
// 					<div
// 						className="
//             h-10
//             w-10
//             rounded-full
//             bg-slate-200
//             "
// 					/>

// 					<div>
// 						<p className="font-medium">{user.name}</p>

// 						<p className="text-xs text-slate-500">{user.role}</p>
// 					</div>
// 				</div>
// 			</div>
// 		</aside>
// 	);
// }


// components/Sidebar.jsx

import SidebarContent from "./SidebarContent"

export default function Sidebar(props) {
	const { theme } = props;
	

  return (
		<aside
			className={`
        hidden lg:flex
        flex-col
        w-64
        border-r
        ${theme?.light || "bg-white"}
        ${theme?.border || "border-slate-200"}
      `}
		>
			<SidebarContent {...props} />
		</aside>
	);
}