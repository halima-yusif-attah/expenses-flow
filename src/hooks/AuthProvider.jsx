import {
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import { supabase } from "../lib/supabaseClient";
import {
	getCurrentProfile,
	getSession,
	logout,
	updateProfile,
} from "../services/auth.service";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const [session, setSession] = useState(null);
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);

	const loadAuthState = useCallback(async () => {
		setLoading(true);

		try {
			const currentSession = await getSession();
			setSession(currentSession);

			if (currentSession?.user) {
				const currentProfile = await getCurrentProfile();
				setProfile(currentProfile);
			} else {
				setProfile(null);
			}
		} finally {
			setLoading(false);
		}
	}, []);

	const signOut = useCallback(async () => {
		await logout();
		// Refresh auth state from Supabase to ensure any client-side session is cleared
		try {
			await loadAuthState();
		} catch (e) {
			console.warn("Error refreshing auth after logout:", e);
		}
		setSession(null);
		setProfile(null);

		// If a session still exists for some reason, perform a hard reload
		try {
			const { data } = await supabase.auth.getSession();
			if (data?.session) {
				console.warn(
					"Session still present after signOut; reloading page to clear state.",
				);
				window.location.reload();
			}
		} catch (err) {
			// ignore - best-effort
			console.debug("Could not verify session after logout:", err);
		}
	}, [loadAuthState]);

	const updateUserProfile = useCallback(
		async (updates) => {
			if (!session?.user?.id) throw new Error("No user session");

			await updateProfile(session.user.id, updates);
			await loadAuthState();
		},
		[session, loadAuthState],
	);

	useEffect(() => {
		const timerId = setTimeout(() => {
			loadAuthState();
		}, 0);

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(() => {
			loadAuthState();
		});

		return () => {
			clearTimeout(timerId);
			subscription.unsubscribe();
		};
	}, [loadAuthState]);

	// const value = useMemo(
	// 	() => ({
	// 		session,
	// 		user: session?.user ?? null,
	// 		profile,
	// 		role: profile?.role ?? null,
	// 		loading,
	// 		isAuthenticated: Boolean(session?.user),
	// 		signOut,
	// 		refreshAuth: loadAuthState,
	// 		updateProfile: updateUserProfile,
	// 	}),
	// 	[session, profile, loading, signOut, loadAuthState, updateUserProfile],
	// );

	const value = useMemo(
		() => ({
			session,
			user: session?.user ?? null,
			userId: session?.user?.id ?? null, // Clean extraction for your queries!
			profile,
			role: profile?.role ?? null,
			loading,
			isAuthenticated: Boolean(session?.user),
			signOut,
			refreshAuth: loadAuthState,
			updateProfile: updateUserProfile,
		}),
		[session, profile, loading, signOut, loadAuthState, updateUserProfile],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
