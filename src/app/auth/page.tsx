"use client";
import { Button } from "~/components/ui/button";
import { createClient } from "~/lib/supabase/client";
import { FcGoogle } from "react-icons/fc";

export default function Auth() {
  const supabase = createClient();

  const handleGoogleSignIn = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <main className="">
      <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
        <FcGoogle className="mr-2 h-4 w-4" />
        Sign in with Google
      </Button>
    </main>
  );
}
