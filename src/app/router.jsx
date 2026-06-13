// import { createBrowserRouter } from "react-router-dom";

// import App from "./App";

// import ProtectedRoute from "../components/auth/ProtectedRoute";
// import RoleGuard from "../components/auth/RoleGuard";

// // Auth Pages
// import LoginPage from "../pages/auth/LoginPage";
// import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
// import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
// import VerifyEmailPage from "../pages/auth/VerifyEmailPage";

// // Dashboards
// import EmployeeDashboard from "../pages/employee/EmployeeDashboard";
// import ManagerDashboard from "../pages/manager/ManagerDashboard";
// import FinanceDashboard from "../pages/finance/FinanceDashboard";
// import AdminDashboard from "../pages/admin/AdminDashboard";

// const router = createBrowserRouter([
// 	{
// 		path: "/",
// 		element: <App />,
// 		children: [
// 			// Public Routes
// 			{
// 				index: true,
// 				element: <LoginPage />,
// 			},
// 			{
// 				path: "login",
// 				element: <LoginPage />,
// 			},
// 			{
// 				path: "forgot-password",
// 				element: <ForgotPasswordPage />,
// 			},
// 			{
// 				path: "reset-password",
// 				element: <ResetPasswordPage />,
// 			},
// 			{
// 				path: "verify-email",
// 				element: <VerifyEmailPage />,
// 			},

// 			// Employee
// 			{
// 				path: "dashboard/employee",
// 				element: (
// 					<ProtectedRoute>
// 						<RoleGuard allowedRoles={["employee"]}>
// 							<EmployeeDashboard />
// 						</RoleGuard>
// 					</ProtectedRoute>
// 				),
// 			},

// 			// Manager
// 			{
// 				path: "dashboard/manager",
// 				element: (
// 					<ProtectedRoute>
// 						<RoleGuard allowedRoles={["manager"]}>
// 							<ManagerDashboard />
// 						</RoleGuard>
// 					</ProtectedRoute>
// 				),
// 			},

// 			// Finance
// 			{
// 				path: "dashboard/finance",
// 				element: (
// 					<ProtectedRoute>
// 						<RoleGuard allowedRoles={["finance"]}>
// 							<FinanceDashboard />
// 						</RoleGuard>
// 					</ProtectedRoute>
// 				),
// 			},

// 			// Admin
// 			{
// 				path: "dashboard/admin",
// 				element: (
// 					<ProtectedRoute>
// 						<RoleGuard allowedRoles={["admin"]}>
// 							<AdminDashboard />
// 						</RoleGuard>
// 					</ProtectedRoute>
// 				),
// 			},
// 		],
// 	},
// ]);

// export default router;

// src/app/router.jsx
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";

import ProtectedRoute from "../components/auth/ProtectedRoute";
import RoleGuard from "../components/auth/RoleGuard";

import LoginPage from "../pages/auth/LoginPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import VerifyEmailPage from "../pages/auth/VerifyEmailPage";
import AuthLayout from "../layouts/AuthLayout";
import Profile from "../pages/employee/Profile";
import MyRequests from "../pages/employee/MyRequest";
import NewRequest from "../pages/employee/NewRequest";
import RequestDetail from "../pages/employee/RequestDetail";
import EmployeeDashboard from "../pages/employee/EmployeeDashboard";
import Approvals from "../pages/manager/Approvals";
import ManagerDashboard from "../pages/manager/ManagerDashboard";
import TeamExpenses from "../pages/manager/TeamExpenses";
import ManagerAnalyticsPage from "../pages/manager/Analytics";

export const router = createBrowserRouter([
	{
		element: <AuthLayout />,
		children: [
			{
				path: "/",
				element: <Navigate to="/login" replace />,
			},
			{
				path: "/login",
				element: <LoginPage />,
			},
			{
				path: "/forgot-password",
				element: <ForgotPasswordPage />,
			},
			{
				path: "/reset-password",
				element: <ResetPasswordPage />,
			},
			{
				path: "/verify-email",
				element: <VerifyEmailPage />,
			},
		],
	},

	{
		element: <ProtectedRoute />,
		children: [
			{
				element: <Outlet />,
				children: [
					{
						element: <RoleGuard allowedRoles={["employee"]} />,
						children: [
							{
								path: "/dashboard/employee",
								element: <EmployeeDashboard />,
							},
							{
								path: "/dashboard/employee/new-request",
								element: <NewRequest />,
							},
							{
								path: "/dashboard/employee/my-requests",
								element: <MyRequests />,
							},
							{
								path: "/dashboard/employee/my-requests/:id",
								element: <RequestDetail />,
							},
							{
								path: "/dashboard/employee/profile",
								element: <Profile />,
							},
						],
					},
					{
						element: <RoleGuard allowedRoles={["manager"]} />,
						children: [
							{
								path: "/dashboard/manager",
								element: <ManagerDashboard />,
							},
							{
								path: "/dashboard/manager/approvals",
								element: <Approvals />,
							},
							{
								path: "/dashboard/manager/team-expenses",
								element: <TeamExpenses />,
							},
							{
								path: "/dashboard/manager/analytics",
								element: <ManagerAnalyticsPage />,
							},
						],
					},
					{
						element: <RoleGuard allowedRoles={["finance"]} />,
						children: [
							{
								path: "/dashboard/finance",
								element: <p>Finance Dashboard</p>,
							},
							{
								path: "/dashboard/finance/payments",
								element: <p>Payments</p>,
							},
							{
								path: "/dashboard/finance/reports",
								element: <p>Reports</p>,
							},
						],
					},
					{
						element: <RoleGuard allowedRoles={["admin"]} />,
						children: [
							{
								path: "/dashboard/admin",
								element: <p>Admin Dashboard</p>,
							},
							{
								path: "/dashboard/admin/users",
								element: <p>Users</p>,
							},
							{
								path: "/dashboard/admin/departments",
								element: <p>Departments</p>,
							},
							{
								path: "/dashboard/admin/audit-logs",
								element: <p>Audit Logs</p>,
							},
						],
					},
				],
			},
		],
	},
]);
