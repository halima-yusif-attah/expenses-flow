import { create } from "zustand";

export const useUIStore = create((set) => ({
	isSidebarOpen: true,
	isMobileMenuOpen: false,
	toggleSidebar: () =>
		set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
	setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
	closeMobileMenu: () => set({ isMobileMenuOpen: false }),
}));
