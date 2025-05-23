// src/pages/SignupPage.tsx
import { useState } from 'react';

export const SignupPage = () => {
  const [selectedRole, setSelectedRole] = useState<'User' | 'Admin' | null>(null);

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
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-2xl font-bold text-center">Create Your Free Account</h2>
          <h6 className=" font-bold text-gray-300 text-center">Sign up for smarter dining with Aais Kitchen.</h6>
          <form className="space-y-1">
            {/* Input Field */}
            <div className="space-y-1">
              <label htmlFor="name" className="text-sm text-gray-300">Full Name</label>
              <input
                id="name"
                type="text"
                placeholder="Prathamesh Dalavi"
                className="w-full px-4 py-3 bg-[#121212] rounded border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="text-sm text-gray-300">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="prathamesh@example.com"
                className="w-full px-4 py-3 bg-[#121212] rounded border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="phone" className="text-sm text-gray-300">Phone Number</label>
              <input
                id="phone"
                type="tel"
                placeholder="XXXXXX3210"
                className="w-full px-4 py-3 bg-[#121212] rounded border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="college" className="text-sm text-gray-300">College Name</label>
              <input
                id="college"
                type="text"
                placeholder="IIT Bombay"
                className="w-full px-4 py-3 bg-[#121212] rounded border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="text-sm text-gray-300">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-[#121212] rounded border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Role Selector */}
            <div className="space-y-2">
              <div className="text-sm text-gray-300 font-medium">Select your role</div>
              <div className="flex space-x-4">
                {['User', 'Admin'].map((role) => (
                  <button
                    key={role}
                    type="button"
                    className={`w-full py-2 rounded font-medium transition ${
                      selectedRole === role
                        ? 'bg-teal-500 text-white'
                        : 'bg-slate-700 text-gray-200 hover:bg-slate-600'
                    }`}
                    onClick={() => setSelectedRole(role as 'User' | 'Admin')}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
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
            <span className="text-teal-400 hover:underline cursor-pointer">Log in</span>
          </p>
        </div>
      </div>
    </div>
  );
};
