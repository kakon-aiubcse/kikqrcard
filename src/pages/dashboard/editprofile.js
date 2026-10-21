import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Camera, Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { DashboardLayout } from "@/components/dashboard-shell";
import {
  Field,
  FullscreenStatus,
  PageHeader,
  Surface,
  getInitials,
  invalidateDashboardUser,
} from "@/components/dashboard-ui";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function PasswordInput({ id, name, value, onChange, placeholder, invalid, visible, onToggle, autoComplete }) {
  return (
    <div className="relative">
      <Input
        id={id}
        type={visible ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={invalid}
        autoComplete={autoComplete}
        className="pr-11"
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute inset-y-0 right-1.5 my-auto flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-black/[0.06] hover:text-foreground"
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  );
}

const Editprofile = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const fileInput = useRef(null);

  const [viewpass, setViewpass] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    conpass: "",
    profileImageBase64: "",
  });
  // values as last loaded/saved, used to tell whether there is anything to save
  const [saved, setSaved] = useState(null);

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Fetch user data when authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/authentication/login");
      return;
    }

    if (status === "authenticated" && session?.user?.email) {
      fetch("/api/userdata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session.user.email }),
      })
        .then((res) => res.json())
        .then((data) => {
          const loaded = {
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            profileImageBase64: data.profileImageBase64 || "",
          };
          setSaved(loaded);
          setFormData((prev) => ({ ...prev, ...loaded }));
        })
        .catch((err) => console.error("Fetch user error:", err));
    }
  }, [status, session, router]);

  // Validation function
  const validate = () => {
    const errors = {};
    const { name = "", email = "", phone = "", password = "", conpass = "" } = formData;

    // Name validation
    if (!name.trim()) {
      errors.name = "Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
      errors.name = "Name must contain only letters and spaces";
    } else if (name.replace(/\s+/g, "").length < 3) {
      errors.name = "Name must contain at least 3 letters";
    }

    // Email validation
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[a-zA-Z\d._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(email)) {
      errors.email = "Email must be in the format something12@domain.com";
    }

    // Phone validation
    const phoneStr = String(phone || "");
    if (!phoneStr.trim()) {
      errors.phone = "Phone is required";
    } else if (!/^\d{11}$/.test(phoneStr)) {
      errors.phone = "Phone number must be exactly 11 digits";
    }

    // Password validation (only if password field is not empty)
    if (password.trim()) {
      const passwordRules = [
        {
          test: () => password.length < 6 || password.length > 16,
          message: "Password must be between 6 and 16 characters long",
        },
        {
          test: () => !/[A-Z]/.test(password),
          message: "Password must contain at least one uppercase letter",
        },
        {
          test: () => !/[a-z]/.test(password),
          message: "Password must contain at least one lowercase letter",
        },
        {
          test: () => !/\d/.test(password),
          message: "Password must contain at least one number",
        },
        {
          test: () => !/[!@#$%^&*(),.?":{}|<>]/.test(password),
          message: "Password must contain at least one special character",
        },
      ];

      for (const rule of passwordRules) {
        if (rule.test()) {
          errors.password = rule.message;
          break;
        }
      }

      if (password !== conpass) {
        errors.conpass = "Passwords do not match";
      }
    } else if (conpass.trim()) {
      // If confirm password entered without password
      errors.password = "Please enter password";
    }

    return errors;
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Handle image upload and convert to base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, profileImageBase64: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Submit form handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return; // stop submission if errors
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/update-user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Profile Updated");
        invalidateDashboardUser(formData.email);

        // Wait for session to sync before redirecting
        setTimeout(() => {
          router.push("/dashboard");
        }, 300);
      } else {
        toast.error(result?.error || "Failed to update profile");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "loading") {
    return <FullscreenStatus title="Checking session…" />;
  }

  if (status === "unauthenticated") {
    return null; // prevent flicker before redirect
  }

  const dirty =
    !!saved &&
    (formData.name !== saved.name ||
      formData.phone !== saved.phone ||
      formData.profileImageBase64 !== saved.profileImageBase64 ||
      !!formData.password ||
      !!formData.conpass);

  return (
    <DashboardLayout title="Profile" path="/dashboard/editprofile" width="max-w-2xl">
      <form onSubmit={handleSubmit} noValidate className="space-y-8">
        <PageHeader
          title="Profile"
          description="Manage your personal information and password."
          backHref="/dashboard"
        />

        {/* photo */}
        <Surface className="flex flex-col items-center gap-4 p-6 text-center sm:flex-row sm:p-7 sm:text-left">
          <Avatar className="size-24 text-2xl">
            <AvatarImage src={formData.profileImageBase64 || undefined} alt={formData.name} />
            <AvatarFallback className="bg-ios-indigo/15 text-2xl font-semibold text-primary">
              {getInitials(formData.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-lg font-semibold tracking-[-0.02em] text-foreground">
              {formData.name || "Your name"}
            </p>
            <p className="truncate text-sm text-muted-foreground">{formData.email}</p>
            <input
              ref={fileInput}
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="sr-only"
              tabIndex={-1}
            />
            <Button
              type="button"
              variant="secondary"
              className="mt-3"
              onClick={() => fileInput.current?.click()}
            >
              <Camera className="size-4" />
              Change photo
            </Button>
          </div>
        </Surface>

        {/* personal info */}
        <section className="space-y-3">
          <h2 className="px-1 text-sm font-semibold text-muted-foreground">Personal information</h2>
          <Surface className="space-y-5 p-5 sm:p-7">
            <Field label="Full name" htmlFor="name" required error={errors.name}>
              <Input
                id="name"
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                aria-invalid={!!errors.name}
              />
            </Field>

            <Field
              label="Email"
              htmlFor="email"
              error={errors.email}
              hint="Your email is your sign-in and can't be changed."
            >
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  disabled
                  className="pr-10 opacity-70"
                />
                <Lock className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </Field>

            <Field label="Phone number" htmlFor="phone" error={errors.phone}>
              <Input
                id="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                name="phone"
                placeholder="01XXXXXXXXX"
                value={formData.phone}
                onChange={handleChange}
                aria-invalid={!!errors.phone}
              />
            </Field>
          </Surface>
        </section>

        {/* password */}
        <section className="space-y-3">
          <h2 className="px-1 text-sm font-semibold text-muted-foreground">Password</h2>
          <Surface className="space-y-5 p-5 sm:p-7">
            <Field
              label="New password"
              htmlFor="password"
              error={errors.password}
              hint="Leave blank to keep your current password. Use 6–16 characters with upper and lower case, a number and a symbol."
            >
              <PasswordInput
                id="password"
                name="password"
                autoComplete="new-password"
                placeholder="New password"
                value={formData.password}
                onChange={handleChange}
                invalid={!!errors.password}
                visible={viewpass}
                onToggle={() => setViewpass((v) => !v)}
              />
            </Field>

            <Field label="Confirm new password" htmlFor="conpass" error={errors.conpass}>
              <PasswordInput
                id="conpass"
                name="conpass"
                autoComplete="new-password"
                placeholder="Confirm new password"
                value={formData.conpass}
                onChange={handleChange}
                invalid={!!errors.conpass}
                visible={viewpass}
                onToggle={() => setViewpass((v) => !v)}
              />
            </Field>
          </Surface>
        </section>

        {/* save bar */}
        <div className="sticky bottom-24 z-20 md:bottom-6">
          <Surface className="flex items-center justify-between gap-4 bg-card/85 p-3 pl-5 shadow-lift backdrop-blur-2xl">
            <p className="text-sm text-muted-foreground">
              {dirty ? "You have unsaved changes." : "All changes saved."}
            </p>
            <Button type="submit" size="lg" disabled={submitting || !dirty}>
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Saving…
                </>
              ) : (
                "Save changes"
              )}
            </Button>
          </Surface>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default Editprofile;
