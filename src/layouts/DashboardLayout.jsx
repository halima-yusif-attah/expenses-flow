import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MobileSidebar from "../components/MobileSidebar";
import Breadcrumbs from "../components/BreadCrumbs";

export default function DashboardLayout({
	title,
	subtitle,
	breadcrumbs,
	sidebarItems,
	theme,
	user,
	children,
}) {
	const [mobileOpen, setMobileOpen] = useState(false);

	return (
		<div className="min-h-screen bg-slate-50">
			<div className="flex">
				<Sidebar items={sidebarItems} theme={theme} user={user} />

				<MobileSidebar
					open={mobileOpen}
					onClose={() => setMobileOpen(false)}
					items={sidebarItems}
					theme={theme}
					user={user}
				/>

				<main className="flex-1 min-h-screen">
					<Header
						title={title}
						subtitle={subtitle}
						onMenuClick={() => setMobileOpen(true)}
					/>

					<div className="p-4 md:p-6 space-y-6">
						<Breadcrumbs items={breadcrumbs} />

						{children}
					</div>
				</main>
			</div>
		</div>
	);
}
