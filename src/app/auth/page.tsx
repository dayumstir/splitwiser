"use client";
import { Button } from "~/components/ui/button";
import { createClient } from "~/lib/supabase/client";
import { FcGoogle } from "react-icons/fc";

export default function Auth() {
  const supabase = createClient();

  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center px-12">
      <header className="pb-12">
        <h1 className="text-3xl font-semibold tracking-wide text-gray-300">
          Welcome to
        </h1>
        <h2 className="text-5xl font-bold tracking-tight">Splitwiser</h2>
      </header>
      <Button
        variant="outline"
        className="text-md w-full bg-gray-800 py-6"
        onClick={handleGoogleSignIn}
      >
        <FcGoogle className="mr-2 h-4 w-4" />
        Sign in with Google
      </Button>
    </main>
  );
}
