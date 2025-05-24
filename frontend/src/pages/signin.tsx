// src/pages/SignInPage.tsx
import { useRef, useState } from 'react';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';

export const SignInPage = () => {
  const [selectedRole, setSelectedRole] = useState<'User' | 'Admin' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function handleSignIn(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    const email = emailRef.current?.value?.trim();
    const password = passwordRef.current?.value;
    const role = selectedRole;

    // Validation
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    if (!role) {
      setError('Please select your role');
      return;
    }

    setIsLoading(true);

    try {
      const basePath = role === "Admin"
        ? "/api/v1/admin/auth/signin"
        : "/api/v1/user/auth/signin";

      const response = await fetch(BACKEND_URL + basePath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Sign in failed');
      }

      if (!data?.data?.token) {
        throw new Error('No token received');
      }

      localStorage.setItem("token", data.data.token);
      navigate('/dashboard'); // Redirect to appropriate page
    } catch (error) {
      console.error('Sign in error:', error);
      setError(error instanceof Error ? error.message : 'Sign in failed');
    } finally {
      setIsLoading(false);
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
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-2xl font-bold text-center">Log in to your account</h2>
          <h6 className="font-bold text-gray-300 text-center">Sign in for smarter dining with Aais Kitchen.</h6>
          
          {error && (
            <div className="p-2 bg-red-500/20 text-red-300 text-sm rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-gray-300">Email Address</label>
              <input
                ref={emailRef}
                id="email"
                type="email"
                placeholder="prathamesh@example.com"
                className="w-full px-4 py-2 bg-[#121212] rounded border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm text-gray-300">Password</label>
              <input
                ref={passwordRef}
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 bg-[#121212] rounded border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
                minLength={6}
              />
            </div>

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
              {!selectedRole && (
                <p className="text-red-400 text-xs mt-1">Please select a role</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 mt-4 rounded font-semibold transition ${
                isLoading
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-teal-500 hover:bg-teal-400 text-white'
              }`}
            >
              {isLoading ? 'Signing in...' : 'Continue'}
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-400">
            Don't have an account?{' '}
            <span 
              onClick={() => navigate('/signup')} 
              className="text-teal-400 hover:underline cursor-pointer"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};