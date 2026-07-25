import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Eye, EyeOff, X } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Signup() {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [viewpass, setViewpass] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    profileImageBase64: "",
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.email) {
      router.push("/dashboard"); // redirect if already logged in
    }
  }, [session, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For phone field, strip non-digit characters
    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: digitsOnly,
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validate = () => {
    const errors = {};
    const { name = "", email = "", phone = "", password = "" } = formData;

    // Validate Name
    if (!name.trim()) {
      errors.name = "Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
      errors.name = "Name must contain only letters and spaces";
    } else if (name.replace(/\s+/g, "").length < 3) {
      // Check for at least 3 letters
      errors.name = "Name must contain at least 3 letters";
    }

    // Validate Email
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[a-zA-Z\d._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(email)) {
      errors.email = "Email must be in the format something12@domain.com";
    }
    //phone validation
    const phoneStr = String(phone || "");
    if (!phoneStr.trim()) {
      errors.phone = "Phone is required";
    } else if (!/^\d{11}$/.test(phoneStr)) {
      errors.phone = "Phone number must be exactly 11 digits";
    }
    // Validate Password

    const passwordRules = [
      { test: () => !password.trim(), message: "Password is required" },
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
    if (formData.password !== formData.conpass) {
      errors.conpass = "Passwords do not match";
    }

    return errors;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        profileImageBase64: imagePreview || null,
      };

      const res = await fetch("/api/signupapi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json(); // parse only once!

      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      toast.success("Signup successful! Redirecting to login...");
      setTimeout(() => router.push("/authentication/login"), 2000);
    } catch (error) {
      toast.error(error.message);
      console.error("Signup Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const errorList = Object.values(errors).filter(Boolean);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary/10 via-background to-background p-4 py-10">
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl">
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

        <div className="mb-6 flex flex-col items-center gap-6">
          <Link href="/" className="flex items-center">
            <Logo size="sm" />
          </Link>
          <h2 className="text-2xl font-semibold text-foreground">Sign up</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="name">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

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
            <Label htmlFor="phone">
              Phone Number <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              aria-invalid={!!errors.phone}
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone}</p>
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

          <div className="space-y-1.5">
            <Label htmlFor="conpass">
              Confirm Password <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Input
                id="conpass"
                name="conpass"
                type={viewpass ? "text" : "password"}
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
            {errors.conpass && (
              <p className="text-sm text-destructive">{errors.conpass}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="profileImage">Upload Profile Image</Label>
            <div className="flex items-center gap-3">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Profile preview"
                  className="size-12 shrink-0 rounded-full object-cover ring-1 ring-border"
                />
              )}
              <Input
                type="file"
                id="profileImage"
                name="profileImage"
                accept="image/*"
                onChange={handleImageUpload}
                className="h-auto py-1.5 file:text-foreground"
              />
            </div>
          </div>

          {errorList.length > 0 && (
            <div className="space-y-1 text-center">
              {errorList.map((errMsg, index) => (
                <p key={index} className="text-sm text-destructive">
                  {errMsg}
                </p>
              ))}
            </div>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating account..." : "Create Account"}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/authentication/login"
              className="font-semibold text-primary hover:underline"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
