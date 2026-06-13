import { supabase } from "../lib/supabaseClient";

export async function loginWithEmail(email, password) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});
	if (error) throw error;
	return data;
}

export async function signInWithGoogle() {
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "google",
		options: {
			redirectTo: window.location.origin,
		},
	});

	if (error) throw error;
	return data;
}

export async function logout() {
	const { error } = await supabase.auth.signOut();
	if (error) throw error;
}

export async function getSession() {
	const { data, error } = await supabase.auth.getSession();
	if (error) throw error;
	return data.session;
}

// avatar_url;
export async function getCurrentProfile() {
	const session = await getSession();
	console.log("Current session:", { session });
	if (!session?.user) return null;

	const { data, error } = await supabase
		.from("profiles")
		.select(
			`id, email, full_name, role, department_id, departments (
      name
    )`,
		)
		.eq("id", session.user.id)
		.single();

	if (error) throw error;
	console.log("Fetched user profile 2:", { data });
	return {
		...data,
		department_name: data.departments?.name ?? null,
	};
}

export async function sendPasswordReset(email) {
	const redirectTo = `${window.location.origin}/reset-password`;
	const { error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo,
	});
	if (error) throw error;
}

export async function updatePassword(newPassword) {
	const { error } = await supabase.auth.updateUser({ password: newPassword });
	if (error) throw error;
}

export async function resendVerificationEmail(email) {
	const { error } = await supabase.auth.resend({ type: "signup", email });
	if (error) throw error;
}

export async function updateProfile(userId, updates) {
	const { data, error } = await supabase
		.from("profiles")
		.update(updates)
		.eq("id", userId)
		.select()
		.single();

	if (error) throw error;
	return data;
}
