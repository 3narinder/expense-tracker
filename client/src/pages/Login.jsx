import { useState } from "react";
import { Link } from "react-router-dom";
import { Wallet, Eye, EyeOff } from "lucide-react";
import Spinner from "../components/Spinner.jsx";
import AuthHero from "../components/AuthHero.jsx";
import Input from "../components/ui/Input.jsx";
import Button from "../components/ui/Button.jsx";
import { useLogin } from "../features/Authentication/useLogin.js";

const Login = () => {
  const { login, isLoading } = useLogin();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    login({ email: form.email, password: form.password });
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

        <div className="flex-1 flex items-center justify-center py-10">
          <div className="w-full max-w-md">
            <h2 className="text-4xl font-bold text-(--color-text-main) tracking-tight mb-2">
              Sign In
            </h2>
            <p className="text-(--color-text-muted) mb-10">
              Please login to continue
            </p>

            <form onSubmit={onSubmit} className="space-y-5">
              <Input
                label="Email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
              />

              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                endAdornment={
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="text-(--color-text-ghost) hover:text-(--color-text-muted) transition"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
              />

              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Spinner size="sm" />
                    Signing in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>

            <p className="text-center mt-8 text-sm text-(--color-text-muted)">
              No Account Yet?{" "}
              <Link
                to="/register"
                className="text-violet-600 font-semibold hover:text-violet-700 transition"
              >
                Get Yours Now
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
        <AuthHero headline="Empower" subHeadline="Your financial future" />
      </div>
    </div>
  );
};

export default Login;
