// src/pages/SignupPage.tsx
import { useRef, useState } from 'react';
import { BACKEND_URL } from '../config';
import { useNavigate } from "react-router-dom";

export const SignupPage = () => {
  const [selectedRole, setSelectedRole] = useState<'student' | 'admin' | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const countryCodeRef = useRef<HTMLInputElement>(null)
  const collegeRef = useRef<HTMLInputElement>(null)
  const hostelRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate();
  async function signup(event: React.FormEvent) {
    event.preventDefault();

    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const countryCode = countryCodeRef.current?.value || '';
    const phone = phoneRef.current?.value;
    const college = collegeRef.current?.value;
    const hostelAddress = hostelRef.current?.value;
    const password = passwordRef.current?.value;
    const role = selectedRole;

    if (!role) {
      alert("Please select a role");
      return;
    }

    const basePath = role === "admin"
      ? "/api/v1/admin/auth/signup"
      : "/api/v1/user/auth/signup";

    try {
      const response = await fetch(BACKEND_URL + basePath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          name,
          role,
          phone: `${countryCode}${phone}`,
          college,
          hostelAddress
        }),
      });
      const data = await response.json();
      const jwtToken=data.data.token;
      if (jwtToken) {
        localStorage.setItem("token", jwtToken);
      }

      if (!response.ok) {
        // Backend returned error message in `data.message` or other field
        alert(data.message || "Signup failed");
        return;
      }

      alert("Signed Up Successfully");
      navigate("/signin");

    } catch (error) {
      console.error("Fetch error:", error);
      alert("Unable to connect to server. Please try again later.");
    }
  }
  return (
    <div className="min-h-screen flex bg-[#191919] text-white font-sans">
      {/* Left side with image and heading */}
      <div className="w-1/3 relative hidden lg:flex flex-col justify-center items-center">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80"
          alt="Cooking background"
          className="absolute inset-0 object-cover w-full h-full z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#191919] via-black/70 to-transparent z-10" />
        <div className="relative z-20 p-8 text-center">
          <h1 className="text-4xl font-bold leading-snug">
            Make food magical with <br />
            <span className="text-teal-400">Aais Kitchen</span>
          </h1>
        </div>
      </div>

      {/* Right side with form */}
      <div className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-sm  space-y-4">
          <h2 className="text-2xl font-bold text-center">Create Your Free Account</h2>
          <h6 className=" font-bold text-gray-300 text-center">Sign up for smarter dining with Aais Kitchen.</h6>
          <form className="space-y-1">
            {/* Input Field */}
            <div className="space-y-1">
              <label htmlFor="name" className="text-sm text-gray-300">Full Name</label>
              <input
                ref={nameRef}
                id="name"
                type="text"
                placeholder="Prathamesh Dalavi"
                className="w-full px-4 py-1 bg-[#121212] rounded border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="text-sm text-gray-300">Email Address</label>
              <input
                ref={emailRef}
                id="email"
                type="email"
                placeholder="prathamesh@example.com"
                className="w-full px-4 py-1 bg-[#121212] rounded border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="phone" className="text-sm text-gray-300">Phone Number</label>
              <div className="flex space-x-2">
                <input
                  ref={countryCodeRef}
                  id="countryCode"
                  type="tel"
                  placeholder="+91"
                  className="w-12 px-2 py-1 bg-[#121212] rounded border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  ref={phoneRef}
                  id="phone"
                  type="tel"
                  placeholder="XXXXXX3210"
                  className="w-96 px-4 py-1 bg-[#121212] rounded border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>


            <div className="space-y-1">
              <label htmlFor="college" className="text-sm text-gray-300">College Name</label>
              <input
                ref={collegeRef}
                id="college"
                type="text"
                placeholder="IIT Bombay"
                className="w-full px-4 py-1 bg-[#121212] rounded border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="hostel" className="text-sm text-gray-300">Hostel Address</label>
              <input
                ref={hostelRef}
                id="hostel"
                type="text"
                placeholder="IIt Bombay B Block"
                className="w-full px-4 py-1 bg-[#121212] rounded border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="text-sm text-gray-300">Password</label>
              <input
                ref={passwordRef}
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-1 bg-[#121212] rounded border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Role Selector */}
            <div className="space-y-2">
              <div className="text-sm text-gray-300 font-medium">Select your role</div>
              <div className="flex space-x-4">
                {[
                  { label: 'User', value: 'student' },
                  { label: 'Admin', value: 'admin' },
                ].map(({ label, value }) => (
                  <button
                    key={value}
                    type="button"
                    className={`w-full py-1 rounded font-medium transition ${selectedRole === value
                      ? 'bg-teal-500 text-white'
                      : 'bg-slate-700 text-gray-200 hover:bg-slate-600'
                      }`}
                    // @ts-ignore
                    onClick={() => setSelectedRole(value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>


            {/* Submit */}
            <button
              onClick={signup}
              type="submit"
              className="w-full py-3 mt-4 rounded bg-teal-500 text-white font-semibold hover:bg-teal-400 transition"
            >
              Continue
            </button>
          </form>

          {/* Footer */}
          <p className="text-xs text-gray-400 text-center">
            By creating an account, you agree to the{' '}
            <span className="underline cursor-pointer">Terms of Service</span> and{' '}
            <span className="underline cursor-pointer">Privacy Policy</span>.
          </p>
          <p className="mt-2 text-sm text-center text-gray-400">
            Already have an account?{' '}
            <span onClick={() => navigate('/signin')} className="text-teal-400 hover:underline cursor-pointer">Log in</span>
          </p>
        </div>
      </div>
    </div>
  );
};
