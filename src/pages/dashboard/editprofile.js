import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { DashboardShell } from "@/components/dashboard-shell";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Editprofile = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [viewpass, setViewpass] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    conpass: "",
    profileImageBase64: "",
  });

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
          setFormData((prev) => ({
            ...prev,
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            profileImageBase64: data.profileImageBase64 || "",
          }));
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
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-3">
        <Loader2 className="size-6 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Checking session...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null; // prevent flicker before redirect
  }

  const initials = formData.name
    ? formData.name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("")
    : "U";

  return (
    <div className="md:pl-64">
      <DashboardShell />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-6 text-2xl font-bold text-foreground sm:text-3xl">
            Edit Profile
          </h1>

          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center gap-4">
                  <Avatar size="lg" className="size-16">
                    <AvatarImage src={formData.profileImageBase64 || undefined} alt={formData.name} />
                    <AvatarFallback className="text-lg">{initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1.5">
                    <Label htmlFor="profileImage">Profile photo</Label>
                    <Input
                      id="profileImage"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="name">
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    aria-invalid={!!errors.name}
                    required
                  />
                  {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                </div>

                {/* Email (read-only) */}
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    readOnly
                    disabled
                    className="bg-muted opacity-70"
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <Label htmlFor="password">New Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={viewpass ? "text" : "password"}
                      name="password"
                      placeholder="Leave blank to keep unchanged"
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
                  {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                  <Label htmlFor="conpass">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="conpass"
                      type={viewpass ? "text" : "password"}
                      name="conpass"
                      placeholder="Confirm New Password"
                      value={formData.conpass}
                      onChange={handleChange}
                      aria-invalid={!!errors.conpass}
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
                  {errors.conpass && <p className="text-sm text-destructive">{errors.conpass}</p>}
                </div>

                <Button type="submit" disabled={submitting} className="w-full">
                  {submitting ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Editprofile;
