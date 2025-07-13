import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Eye, EyeClosed } from "lucide-react";
import { auth, db } from "../../../lib/firebase/firestorecon";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
function Signup() {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [viewpass, setViewpass] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    conpass: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser && router.pathname === "/authentication/signup") {
        router.push("/authentication/login");
      } else if (!currentUser && router.pathname !== "/authentication/signup") {
        router.push("/authentication/signup");
      }
    });

    return () => unsubscribe(); // Clean up
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;

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
    const { name = "", email = "", password = "" } = formData;

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
  const onProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
      console.log("Selected file:", file.name); // Log the selected file name
    } else {
      setErrors;
      console.log("No file selected");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!profileImage) {
      setMessage("Please select a profile image.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const storage = getStorage();
      const imageRef = ref(storage, `profileImages/${user.uid}`);
      await uploadBytes(imageRef, profileImage);
      const imageURL = await getDownloadURL(imageRef);

      const userDoc = doc(db, "users", user.uid);
      const userData = {
        uid: user.uid,
        name,
        email,
        pic: imageURL,
        createdAt: new Date().toISOString(),
      };

      await setDoc(userDoc, userData);
      setMessage("Created new User");

      // Redirect to login after successful signup
      // router.push("/authentication/login");
    } catch (error) {
      console.error("Signup Error:", error.message);
      setMessage("Error creating user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex xs:flex-col tb:flex-col  items-center justify-center bg-gradient-to-br from-sky-300 to-brand p-4">
      <div
        className="w-[30%]  tb:mr-12  xs:mr-40 xs:mb-14"
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
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-violet-100 shadow-xl rounded-2xl p-8 space-y-4"
      >
        <h2 className="text-3xl font-semibold text-center text-violet-600">
          Sign Up
        </h2>
        <div className="space-y-1">
          <label htmlFor="name" className="block text-sm font-medium">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-400 outline-none"
          />
        </div>
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
          />
        </div>
        <div className="space-y-1 flex flex-col">
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
          <span className="w-[20%] relative bottom-[34px] left-[290px]  tb:left-[340px] lp:left-[340px] xb:left-[350px]">
            {viewpass ? (
              <Eye onClick={() => setViewpass(!viewpass)} />
            ) : (
              <EyeClosed onClick={() => setViewpass(!viewpass)} />
            )}
          </span>
        </div>{" "}
        <div className="space-y-1 flex flex-col">
          <label htmlFor="conpass" className="block text-sm font-medium">
            Confirm password? <span className="text-red-500">*</span>
          </label>
          <input
            id="conpass"
            name="conpass"
            type={viewpass ? "text" : "password"}
            value={formData.conpass}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-400 outline-none"
          />{" "}
          <span className="w-[20%] relative bottom-[34px] left-[290px]  tb:left-[340px] lp:left-[340px] xb:left-[350px]">
            {viewpass ? (
              <Eye onClick={() => setViewpass(!viewpass)} />
            ) : (
              <EyeClosed onClick={() => setViewpass(!viewpass)} />
            )}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-scdry-0 font-ios ">
            Select Picture:
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              onProfileImageChange(event);
              console.log("File input changed:", event.target.files[0]); // Check the file
            }}
            className="inline-block text-sm text-gray-500 border border-btton-0 rounded-md
                file:mr-4 file:py-2 file:px-2 xs:file:mr-0 xs:file:relative xs:w-[230px]
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-btton-0 file:text-bttext-0
              
                
                transition duration-150 ease-in-out"
          />
        </div>
        {/* Submit Button */}
        {Object.values(errors).length > 0 && (
          <div className="text-center text-red-600">
            {Object.values(errors).map((errMsg, index) => (
              <p key={index}>{errMsg}</p>
            ))}
          </div>
        )}
        {loading && (
          <p className="text-center text-violet-600">Creating account...</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 bg-violet-600 text-white rounded-lg font-semibold ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-violet-700"
          } transition duration-200`}
        >
          {loading ? "Processing..." : "Create Account"}
        </button>
        {/* Login Prompt */}
        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/authentication/login"
            className="text-violet-600 hover:text-violet-800 font-semibold cursor-pointer"
          >
            Login
          </a>
        </div>
      </form>
    </div>
  );
}

export default Signup;
