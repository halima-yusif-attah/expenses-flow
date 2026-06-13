import { Outlet } from "react-router-dom";
import { Wallet } from "lucide-react";
import logo from "../assets/logo.png";

export default function AuthLayout() {
	return (
		<div className="min-h-screen bg-slate-50 antialiased font-sans bg-linear-to-br from-indigo-50 via-slate-50 to-purple-50">
			{/* Main Grid Wrapper grid grid-cols-1 lg:grid-cols-12*/}
			<div className="flex flex-row p-2 md:p-8 gap-6 min-h-screen">
				{/* Left Side: Marketing/Branding Sidebar Panel p-12 border-r border-slate-200*/}
				<div className="hidden lg:flex  w-full flex-1 flex-col gap-6 ">
					<div className="flex items-center space-x-2.5">
						<div className="bg-indigo-500 p-2 rounded-lg text-white shadow-md shadow-indigo-200">
							<Wallet className="h-5 w-5" />
						</div>
						<span className="font-bold text-xl text-slate-900 tracking-tight">
							ExpenseFlow
						</span>
					</div>

					<div className=" w-full space-y-6 my-auto">
						<div className="space-y-4  max-w-md">
							<h1 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight">
								Track. Approve. Control.
							</h1>
							<p className="text-slate-600 text-base leading-relaxed">
								A smarter way to manage expenses, budgets and approvals — all in
								one secure platform.
							</p>
						</div>{" "}
						{/* max-w-md */}
						{/* Visual Placeholder Graphic to mimic design */}
						<div className="max-w-full w-[80%]">
							{/* <div className="w-full  bg-white rounded-xl shadow-xl shadow-slate-200/80 border border-slate-200/60 p-6 relative overflow-hidden">
								<div className="space-y-3">
									<div className="h-4 bg-slate-100 rounded w-1/3" />
									<div className="h-8 bg-indigo-50 rounded w-2/3" />
									<div className="grid grid-cols-3 gap-3 pt-4">
										<div className="h-16 bg-slate-50 rounded-lg border border-slate-100" />
										<div className="h-16 bg-slate-50 rounded-lg border border-slate-100" />
										<div className="h-16 bg-slate-50 rounded-lg border border-slate-100" />
									</div>
								</div>
							</div> */}

							<img
								src={logo}
								alt="ExpenseFlow Logo"
								className="w-full h-auto rounded-2xl shadow-lg shadow-indigo-200/50"
								objectFit="contain"
							/>
						</div>
					</div>

					<p className="text-xs text-slate-400 font-medium">
						&copy; {new Date().getFullYear()} ExpenseFlow. All rights reserved.
					</p>
				</div>
				{/* Right Side: Dynamic Interactive Content Focus Area p-6 sm:p-12 md:p-20*/}
				{/* col-span-1 lg:col-span-7 */}

				<div className="flex flex-1 flex-col justify-between  ">
					{/* Mobile Only Header Logo */}
					<div className="bg-white lg:rounded-lg shadow-md w-full h-full max-w-md mx-auto my-auto py-4 px-6">
						<div className="lg:hidden flex items-center justify-center space-x-2 mb-8 pt-8 ">
							<div className="bg-indigo-500 p-1.5 rounded-md text-white">
								<Wallet className="h-4 w-4" />
							</div>
							<span className="font-bold text-lg text-slate-900">
								ExpenseFlow
							</span>
						</div>

						{/* Form Content Mount Destination */}
						<div className="lg:w-[80%] mx-auto ">
							<Outlet />
						</div>
					</div>

					{/* Form Content Mount Destination */}
					{/* <div className="bg-white lg:rounded-lg shadow-md w-full h-full max-w-md mx-auto my-auto py-4 px-6 ">
						<div className="lg:w-[80%] mx-auto ">
							<Outlet />
						</div>
					</div> */}

					{/* Footer Metadata and System Links */}
					<div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-100 pt-6 text-xs font-medium text-slate-400 w-full max-w-md mx-auto lg:max-w-none">
						<span className="lg:hidden">
							&copy; 2026 ExpenseFlow. All rights reserved.
						</span>
						<span className="hidden lg:inline" />
						<div className="flex space-x-4">
							<a
								href="#privacy"
								className="hover:text-slate-600 transition-colors"
							>
								Privacy Policy
							</a>
							<span>&bull;</span>
							<a
								href="#terms"
								className="hover:text-slate-600 transition-colors"
							>
								Terms of Service
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
