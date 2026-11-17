
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Clapperboard,
  User,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  Film,
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      username,
      password,
    });
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-(--bg-primary) px-4 py-12">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-red-600/10 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-red-600/10 blur-[100px]" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-(--border-color) bg-(--bg-secondary) shadow-2xl shadow-black/10 lg:grid-cols-2">

        {/* Left Side - Branding */}
        <div className="relative hidden min-h-[650px] flex-col justify-between overflow-hidden bg-gray-950 p-10 lg:flex">

          <div className="absolute inset-0 bg-linear-to-br from-red-950 via-gray-950 to-black" />

          <div className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-red-600/20 blur-[90px]" />

          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 text-white shadow-lg shadow-red-600/30">
              <Clapperboard size={25} />
            </div>

            <span className="text-2xl font-black text-white">
              Movie<span className="text-red-500">Hub</span>
            </span>
          </div>

          <div className="relative z-10">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-red-500 backdrop-blur-md">
              <Film size={34} />
            </div>

            <h1 className="mb-5 text-5xl leading-tight font-black text-white">
              Your Next
              <br />
              <span className="text-red-500">Favorite</span>
              <br />
              Movie Awaits.
            </h1>

            <p className="max-w-sm text-base leading-8 text-gray-400">
              Discover amazing movies, explore TV shows, and keep track of
              everything you love in one place.
            </p>
          </div>

          <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6 text-xs text-gray-500">
            <span>© 2026 MovieHub</span>
            <span>Discover. Watch. Enjoy.</span>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex items-center justify-center px-6 py-12 sm:px-12 lg:px-10">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="mb-10 flex items-center gap-3 lg:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-white">
                <Clapperboard size={23} />
              </div>

              <span className="text-2xl font-black text-(--text-primary)">
                Movie<span className="text-red-600">Hub</span>
              </span>
            </div>

            {/* Heading */}
            <div className="mb-9">
              <span className="mb-3 inline-block rounded-full bg-red-600/10 px-4 py-2 text-xs font-bold tracking-wider text-red-600">
                WELCOME BACK
              </span>

              <h2 className="mb-3 text-3xl font-black text-(--text-primary) sm:text-4xl">
                Sign In
              </h2>

              <p className="text-sm leading-6 text-(--text-secondary)">
                Welcome back! Enter your details to access your account.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-bold text-(--text-primary)"
                >
                  Username
                </label>

                <div className="relative">
                  <User
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text-secondary)"
                  />

                  <input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoComplete="username"
                    className="h-13 w-full rounded-xl border border-(--border-color) bg-(--bg-primary) pl-12 pr-4 text-sm text-(--text-primary) outline-none transition-all placeholder:text-(--text-secondary) focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-bold text-(--text-primary)"
                  >
                    Password
                  </label>
                </div>

                <div className="relative">
                  <LockKeyhole
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text-secondary)"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="h-13 w-full rounded-xl border border-(--border-color) bg-(--bg-primary) pl-12 pr-12 text-sm text-(--text-primary) outline-none transition-all placeholder:text-(--text-secondary) focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-(--text-secondary) transition hover:text-red-600"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group flex h-13 w-full items-center justify-center gap-3 rounded-xl bg-red-600 font-bold text-white shadow-lg shadow-red-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-red-700 hover:shadow-xl hover:shadow-red-600/30 active:translate-y-0"
              >
                Sign In

                <ArrowRight
                  size={19}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

            </form>

            {/* Footer */}
            <div className="mt-9 border-t border-(--border-color) pt-6 text-center">
              <p className="text-xs text-(--text-secondary)">
                Your movie journey starts here.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="mt-5 w-full text-center text-sm font-semibold text-(--text-secondary) transition hover:text-red-600"
            >
              ← Back to Home
            </button>

          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
