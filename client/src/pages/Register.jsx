import { useState } from "react";
import { Link } from "react-router-dom";
import { Wallet, Eye, EyeOff } from "lucide-react";
import Spinner from "../components/Spinner.jsx";
import AuthHero from "../components/AuthHero.jsx";
import { useRegister } from "../features/Authentication/useRegister.js";

const Register = () => {
  const { register, isLoading } = useRegister();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    currency: "USD",
  });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    register({
      username: form.username.trim(),
      email: form.email.trim(),
      password: form.password,
      currency: form.currency,
    });
  };

  return (
    <div className="min-h-screen flex bg-white">
      <div className="flex-1 flex flex-col px-6 sm:px-10 lg:px-14 py-8 order-1">
        <div className="flex justify-start items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-linear-to-br from-violet-400 to-violet-600 flex items-center justify-center">
            <Wallet size={18} className="text-white" />
          </div>
          <span className="font-bold text-xl text-slate-900">ExpenseAI</span>
        </div>

        <div className="flex-1 flex items-center justify-center py-6">
          <div className="w-full max-w-md">
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">
              Get Started
            </h2>
            <p className="text-slate-500 mb-8">
              Create your AI-powered finance profile
            </p>

            <form onSubmit={onSubmit} className="space-y-4">
              {/* Username field */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">
                  Username
                </label>
                <input
                  type="text"
                  required
                  disabled={isLoading}
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  className="w-full bg-slate-100/80 hover:bg-slate-100 focus:bg-white border-2 border-transparent focus:border-violet-500 rounded-2xl px-5 py-3.5 text-slate-900 text-sm focus:outline-none transition disabled:opacity-50"
                  placeholder="johndoe"
                />
              </div>

              {/* Email field */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  required
                  disabled={isLoading}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-slate-100/80 hover:bg-slate-100 focus:bg-white border-2 border-transparent focus:border-violet-500 rounded-2xl px-5 py-3.5 text-slate-900 text-sm focus:outline-none transition disabled:opacity-50"
                  placeholder="you@example.com"
                />
              </div>

              {/* Password field */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    disabled={isLoading}
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    className="w-full bg-slate-100/80 hover:bg-slate-100 focus:bg-white border-2 border-transparent focus:border-violet-500 rounded-2xl px-5 py-3.5 pr-12 text-slate-900 text-sm focus:outline-none transition disabled:opacity-50"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Currency field selection */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">
                  Primary Currency
                </label>
                <select
                  disabled={isLoading}
                  value={form.currency}
                  onChange={(e) =>
                    setForm({ ...form, currency: e.target.value })
                  }
                  className="w-full bg-slate-100/80 hover:bg-slate-100 focus:bg-white border-2 border-transparent focus:border-violet-500 rounded-2xl px-5 py-3.5 text-slate-900 text-sm focus:outline-none transition appearance-none cursor-pointer disabled:opacity-50"
                >
                  <option value="USD">USD ($) - US Dollar</option>
                  <option value="INR">INR (₹) - Indian Rupee</option>
                  <option value="EUR">EUR (€) - Euro</option>
                  <option value="GBP">GBP (£) - British Pound</option>
                </select>
              </div>

              {/* Form Action Submit Button controlled by isLoading */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-linear-to-br from-violet-400 to-violet-600 active:bg-violet-800 text-white font-semibold py-4 rounded-2xl transition shadow-lg shadow-violet-500/30 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Spinner size="sm" />
                    Creating profile...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <p className="text-center mt-6 text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-violet-600 font-semibold hover:text-violet-700 transition"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        <div className="flex justify-start gap-6 text-xs text-slate-500">
          <a className="hover:text-slate-900 transition cursor-pointer">
            Privacy Policy
          </a>
          <a className="hover:text-slate-900 transition cursor-pointer">
            Terms
          </a>
          <a className="hover:text-slate-900 transition cursor-pointer">FAQ</a>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] order-2">
        <AuthHero
          headline="Optimize"
          subHeadline="Your automated personal ledger"
        />
      </div>
    </div>
  );
};

export default Register;
