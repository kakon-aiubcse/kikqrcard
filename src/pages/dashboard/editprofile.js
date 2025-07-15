import React, { useEffect, useState } from "react";
import Sidebar from "../dashboard/sidebar";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Eye, EyeClosed } from "lucide-react";

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
  const [message, setMessage] = useState("");

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

    try {
      const res = await fetch("/api/update-user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
       
        setMessage("Profile Updated");

      // Wait for session to sync before redirecting
      setTimeout(() => {
        router.push("/dashboard");
      }, 300);
      } else {
        
      }
    } catch (err) {
      console.error("Update error:", err);
      setMessage("An unexpected error occurred.");
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-violet-600 font-semibold">Checking session...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null; // prevent flicker before redirect
  }

  return (
    <>
      <Sidebar />
      <div className="ml-[16.666667%] xs:ml-0 xs:relative xs:top-[110px] p-4">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold mb-6">Edit Profile</h2>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-md">
            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className={`border p-2 rounded ${errors.name ? "border-red-500" : ""}`}
              required
            />
            {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}

            {/* Email (read-only) */}
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="border p-2 rounded bg-gray-100 cursor-not-allowed"
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}

            {/* Phone */}
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className={`border p-2 rounded ${errors.phone ? "border-red-500" : ""}`}
            />
            {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}

            {/* Password */}
            <input
              type={viewpass ? "text" : "password"}
              name="password"
              placeholder="New Password (leave blank to keep unchanged)"
              value={formData.password}
              onChange={handleChange}
              className={`border p-2 rounded ${errors.password ? "border-red-500" : ""}`}
            />  <span className="w-[20%] relative bottom-[46px]  left-[290px] tb:left-[380px] lp:left-[380px] xb:left-[350px]">
            {viewpass ? (
              <Eye onClick={() => setViewpass(!viewpass)} />
            ) : (
              <EyeClosed onClick={() => setViewpass(!viewpass)} />
            )}
          </span>
            {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}

            {/* Confirm Password */}
            <input
             type={viewpass ? "text" : "password"}
              name="conpass"
              placeholder="Confirm New Password"
              value={formData.conpass}
              onChange={handleChange}
              className={`border p-2 rounded ${errors.conpass ? "border-red-500" : ""}`}
            />  <span className="w-[20%] relative bottom-[46px] left-[290px]  tb:left-[380px] lp:left-[380px] xb:left-[350px]">
            {viewpass ? (
              <Eye onClick={() => setViewpass(!viewpass)} />
            ) : (
              <EyeClosed onClick={() => setViewpass(!viewpass)} />
            )}
          </span>
            {errors.conpass && <p className="text-red-600 text-sm">{errors.conpass}</p>}
            <span className="text-brand font-ios ">Forget password? </span>

            {/* Profile Image Upload */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="border p-2 rounded"
            />

            {formData.profileImageBase64 && (
              <img
                src={formData.profileImageBase64}
                alt="Profile Preview"
                className="w-24 h-24 object-cover rounded-full mx-auto"
              />
            )}
            {message && <>
            <span className="text-brand">{message}</span>
            </>}

            <button
              type="submit"
              className="bg-violet-600 text-white py-2 px-4 rounded hover:bg-violet-700"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Editprofile;
