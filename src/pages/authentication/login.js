import React, { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { Eye, EyeClosed } from "lucide-react";

function Login() {
  const router = useRouter();
  const [viewpass, setViewpass] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setMessage("");
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
    setMessage("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    const result = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (result.error) {
      setMessage("Invalid email or password");
    } else {
      setMessage("Login successful!");
      router.push("/dashboard");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex xs:flex-col tb:flex-col items-center justify-center bg-gradient-to-tl from-sky-300 to-violet-400 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6 xs:order-2 tb:order-2 "
      >
        <h2 className="text-3xl font-semibold text-center text-violet-600">
          Login
        </h2>

        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-400 outline-none"
          />{" "}
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-medium">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            id="password"
            name="password"
            type={viewpass ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-400 outline-none"
          />{" "}
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>
        <span className="flex relative bottom-[54px] overflow-hidden xs:w-[20px] xs:left-[280px] left-[340px] tb:w-[20px] lp:left-[340px] xb:left-[350px]">
          {viewpass ? (
            <Eye onClick={() => setViewpass(!viewpass)} />
          ) : (
            <EyeClosed onClick={() => setViewpass(!viewpass)} />
          )}
        </span>
        {message && (
          <p
            className={`text-center font-medium ${
              message.toLowerCase().includes("success")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 bg-violet-600 text-white rounded-lg font-semibold transition duration-200 ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-violet-700"
          }`}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>

        <div className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <a
            href="/authentication/signup"
            className="text-violet-600 hover:text-violet-800 font-semibold cursor-pointer"
          >
            Sign Up
          </a>
        </div>
      </form>
      <div
        className="w-[30%] ml-32 xs:ml-0 xb:ml-48 xs:top-0 xs:order-1 tb:order-1 tb:mr-36 xs:p-4 xs:mr-44 xs:mb-14 "
        onClick={() => {
          router.push("/");
        }}
      >
        <svg
          width="250"
          height="100"
          viewBox="0 0 200 60"
          fill="none"
          fontStyle="italic"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="200" height="60" rx="12" ry="12" fill="#8F87F1" />

          <text
            x="20"
            y="45"
            fontFamily="Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
            fontSize={36}
            fontWeight="700"
            fill="white"
          >
            KIK
          </text>

          <circle cx="140" cy="20" r="5" fill="teal" />
          <rect x="160" y="15" width="10" height="10" fill="blue" />
          <rect x="160" y="35" width="5" height="5" fill="black" />
          <circle cx="185" cy="40" r="3" fill="red" />

          <text
            x="95"
            y="45"
            fontFamily="Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
            fontSize="24"
            fill="white"
            fontWeight="600"
          >
            QRcards
          </text>
        </svg>
      </div>
    </div>
  );
}

export default Login;
