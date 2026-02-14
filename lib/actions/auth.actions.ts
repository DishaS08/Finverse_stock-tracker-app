'use server';

import { auth } from "@/lib/better-auth/auth";
import { sendWelcomeEmail } from "@/lib/nodemailer";
import { headers } from "next/headers";

export const signUpWithEmail = async ({ email, password, fullName, investmentGoals, riskTolerance, preferredIndustry }: SignUpFormData) => {
  try {
    const response = await auth.api.signUpEmail({ body: { email, password, name: fullName } })

    if (response) {
      // Send welcome email directly (bypassing Inngest for local dev)
      try {
        await sendWelcomeEmail({
          email,
          name: fullName,
          intro: `Welcome to Finverse! Based on your interest in ${preferredIndustry} with ${riskTolerance} risk tolerance and ${investmentGoals} goals, we've got you covered. Start exploring the markets today!`
        });
      } catch (emailErr) {
        console.error('Welcome email failed:', emailErr);
        // Don't block sign-up if email fails
      }
    }

    return { success: true, data: response }
  } catch (e: unknown) {
    const err = e as { body?: { message?: string }; message?: string };
    return { success: false, error: err.body?.message || err.message || 'Sign up failed' }
  }
}

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
  try {
    const response = await auth.api.signInEmail({ body: { email, password } })

    return { success: true, data: response }
  } catch (e: unknown) {
    const err = e as { body?: { message?: string }; message?: string };
    return { success: false, error: err.body?.message || err.message || 'Sign in failed' }
  }
}

export const signOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
  } catch (e) {
    console.log('Sign out failed', e)
    return { success: false, error: 'Sign out failed' }
  }
}