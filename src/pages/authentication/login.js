import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { Eye, EyeOff, X } from "lucide-react";
import { toast } from "sonner";
import { Seo } from "@/components/seo";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Login() {
  const router = useRouter();
  const [viewpass, setViewpass] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.email) {
      router.push(session.user.isAdmin ? "/admin" : "/dashboard");
    }
  }, [session, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    const { email, password } = formData;

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[a-zA-Z\d._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (!result || result.error) {
        toast.error("Invalid email or password");
      } else {
        toast.success("Login successful!");

        // Wait for session to sync before redirecting
        setTimeout(async () => {
          const res = await fetch("/api/auth/session");
          const freshSession = await res.json();
          router.push(freshSession?.user?.isAdmin ? "/admin" : "/dashboard");
        }, 300);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Seo title="Log In" description="Log in to your KIK QRcard account." path="/authentication/login" />
      {/* left branded panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-primary via-primary to-[color-mix(in_oklch,var(--primary),black_30%)] p-10 text-primary-foreground lg:flex">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute -top-24 -left-24 size-96 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-32 -right-10 size-96 rounded-full bg-white/10 blur-3xl" />
        </div>

        <Link href="/" className="relative z-10 flex items-center">
          <Logo size="sm" variant="on-dark" />
        </Link>

        <div className="relative z-10 max-w-md space-y-4">
          <h1 className="text-3xl font-bold leading-tight">
            Your digital identity, on one card.
          </h1>
          <p className="text-primary-foreground/80">
            Log in to manage your QR business cards, track engagement, and
            share your details anywhere in one tap.
          </p>
        </div>

        <p className="relative z-10 text-sm text-primary-foreground/60">
          &copy; {new Date().getFullYear()} KIK QRcard. All rights reserved.
        </p>
      </div>

      {/* right form panel */}
      <div className="relative flex w-full flex-col items-center justify-center p-4 lg:w-1/2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
          aria-label="Close and return home"
          onClick={() => router.push("/")}
        >
          <X className="size-4" />
        </Button>

        <div className="w-full max-w-sm">
          <div className="mb-8 flex flex-col gap-6 lg:hidden">
            <Link href="/" className="flex items-center">
              <Logo size="sm" />
            </Link>
          </div>

          <div className="mb-8 space-y-1.5">
            <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
            <p className="text-sm text-muted-foreground">
              Log in to your account to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">
                Password <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={viewpass ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  aria-invalid={!!errors.password}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setViewpass((v) => !v)}
                  className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
                  aria-label={viewpass ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {viewpass ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            <Button type="submit" disabled={loading} className="w-full" size="lg">
              {loading ? "Logging in..." : "Log In"}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/authentication/signup"
                className="font-semibold text-primary hover:underline"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
