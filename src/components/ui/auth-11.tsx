"use client";

import Script from "next/script";
import { useRef, useState } from "react";
import { OnboardingFieldError, OnboardingSetup } from "@/components/watermelon/onboarding-setup";

const SIGN_IN_ERROR = "Google sign-in couldn’t finish. Please try again.";
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
let isGoogleInitialized = false;
let handleGoogleCredential: ((credential: string) => void) | undefined;

declare global {
  interface Window {
    google?: { accounts: { id: {
      initialize: (config: {
        client_id: string;
        callback: (response: { credential: string }) => void;
      }) => void;
      renderButton: (element: HTMLElement, options: { theme: string; size: string; shape: string; text: string }) => void;
    } } };
  }
}

export default function Auth11({ imageUrl }: { imageUrl: string }) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const googleButton = useRef<HTMLDivElement>(null);

  async function signIn(credential: string) {
    setIsPending(true);
    setError("");
    try {
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential }),
      });
      if (!response.ok) throw new Error("Google sign-in failed");
      window.location.assign("/onboarding");
    } catch {
      setError(SIGN_IN_ERROR);
      setIsPending(false);
    }
  }

  function renderGoogleButton() {
    const google = window.google?.accounts.id;
    if (!google || !googleButton.current || !GOOGLE_CLIENT_ID) return;
    handleGoogleCredential = (credential) => void signIn(credential);
    if (!isGoogleInitialized) {
      google.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: ({ credential }) => handleGoogleCredential?.(credential),
      });
      isGoogleInitialized = true;
    }
    if (googleButton.current.childElementCount) return;
    google.renderButton(googleButton.current, {
      theme: "outline",
      size: "large",
      shape: "pill",
      text: "continue_with",
    });
  }

  return (
    <OnboardingSetup title="Creator program" subtitle="IELTS Go Global" imageUrl={imageUrl} progress={null}>
      <div className="flex min-h-52 flex-col items-start justify-center gap-4">
        <h2 className="text-lg font-semibold tracking-tight">Sign in to get started</h2>
        {GOOGLE_CLIENT_ID && <Script src="https://accounts.google.com/gsi/client"
          onReady={renderGoogleButton} onError={() => setError(SIGN_IN_ERROR)} />}
        <div ref={googleButton} hidden={isPending} />
        {isPending && <p role="status" className="text-sm text-muted-foreground">Signing in…</p>}
        {!GOOGLE_CLIENT_ID && <OnboardingFieldError>Google sign-in is not configured.</OnboardingFieldError>}
        {error && <OnboardingFieldError>{error}</OnboardingFieldError>}
      </div>
    </OnboardingSetup>
  );
}
