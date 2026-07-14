import { useState } from "react";
import { Link } from "react-router-dom";
import { Wallet, Eye, EyeOff } from "lucide-react";
import Spinner from "../components/Spinner.jsx";
import AuthHero from "../components/AuthHero.jsx";
import Input from "../components/ui/Input.jsx";
import Select from "../components/ui/Select.jsx";
import Button from "../components/ui/Button.jsx";
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
    <div className="min-h-screen flex bg-(--color-bg-surface)">
      <div className="flex-1 flex flex-col px-6 sm:px-10 lg:px-14 py-8 order-1">
        <div className="flex justify-start items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-linear-to-br from-violet-400 to-violet-600 flex items-center justify-center">
            <Wallet size={18} className="text-white" />
          </div>
          <span className="font-bold text-xl text-(--color-text-main)">
            ExpenseAI
          </span>
        </div>

        <div className="flex-1 flex items-center justify-center py-6">
          <div className="w-full max-w-md">
            <h2 className="text-4xl font-bold text-(--color-text-main) tracking-tight mb-2">
              Get Started
            </h2>
            <p className="text-(--color-text-muted) mb-8">
              Create your AI-powered finance profile
            </p>

            <form onSubmit={onSubmit} className="space-y-4">
              <Input
                label="Username"
                type="text"
                required
                disabled={isLoading}
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                placeholder="johndoe"
              />

              <Input
                label="Email"
                type="email"
                required
                disabled={isLoading}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
              />

              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                required
                disabled={isLoading}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                endAdornment={
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => setShowPassword((v) => !v)}
                    className="text-(--color-text-ghost) hover:text-(--color-text-muted) transition"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
              />

              <Select
                label="Primary Currency"
                disabled={isLoading}
                value={form.currency}
                onChange={(e) =>
                  setForm({ ...form, currency: e.target.value })
                }
              >
                <option value="USD">USD ($) - US Dollar</option>
                <option value="INR">INR (₹) - Indian Rupee</option>
                <option value="EUR">EUR (€) - Euro</option>
                <option value="GBP">GBP (£) - British Pound</option>
              </Select>

              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="w-full mt-2"
              >
                {isLoading ? (
                  <>
                    <Spinner size="sm" />
                    Creating profile...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <p className="text-center mt-6 text-sm text-(--color-text-muted)">
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

        <div className="flex justify-start gap-6 text-xs text-(--color-text-muted)">
          <a className="hover:text-(--color-text-main) transition cursor-pointer">
            Privacy Policy
          </a>
          <a className="hover:text-(--color-text-main) transition cursor-pointer">
            Terms
          </a>
          <a className="hover:text-(--color-text-main) transition cursor-pointer">
            FAQ
          </a>
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
