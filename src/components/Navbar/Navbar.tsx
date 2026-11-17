
import { useEffect, useState } from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  TextInput,
} from "flowbite-react";

import {
  Search,
  Sun,
  Moon,
  Clapperboard,
  LogIn,
  UserPlus,
  Film,
  Tv,
  Heart,
} from "lucide-react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import Logo from "../../assets/images/home-movie-background.png";

type Theme = "light" | "dark";

const NavbarComp = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Theme
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "light" ? "dark" : "light"
    );
  };

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky  top-0 z-50 px-3 pt-3 sm:px-5">
      <Navbar
        fluid
        rounded
        className="mx-auto max-w-7xl border border-(--border-color) bg-(--bg-secondary)/95 shadow-lg shadow-black/5 backdrop-blur-xl transition-colors duration-300 dark:shadow-black/20"
      >
        {/* Logo */}
        <NavbarBrand
          onClick={() => navigate("/")}
          className="cursor-pointer gap-2"
        >
          <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-red-600 shadow-lg shadow-red-600/20">
            <img
              src={Logo}
              alt="Movie App"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-(--text-primary)">
              Movie<span className="text-red-600">Hub</span>
            </span>

            <span className="hidden text-[10px] font-medium tracking-[2px] text-(--text-secondary) sm:block">
              MOVIE DISCOVERY
            </span>
          </div>
        </NavbarBrand>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:order-2 sm:gap-3">

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-(--border-color) bg-(--bg-primary) text-(--text-primary) transition-all duration-300 hover:border-red-500 hover:text-red-600"
          >
            {theme === "dark" ? (
              <Sun size={19} />
            ) : (
              <Moon size={19} />
            )}
          </button>

          {/* Login / Register */}
          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => navigate("/auth/login")}
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-(--text-primary) transition hover:bg-(--bg-primary) hover:text-red-600"
            >
              <LogIn size={17} />
              Login
            </button>

            <button
              type="button"
              onClick={() => navigate("/register")}
              className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition hover:-translate-y-0.5 hover:bg-red-700"
            >
              <UserPlus size={17} />
              Sign Up
            </button>
          </div>

          {/* Mobile Login */}
          <button
            type="button"
            onClick={() => navigate("/auth/login")}
            aria-label="Login"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-white transition hover:bg-red-700 sm:hidden"
          >
            <LogIn size={19} />
          </button>

          {/* Navbar Toggle */}
          <NavbarToggle />
        </div>

        {/* Navigation */}
        <NavbarCollapse className="md:items-center">

          <NavbarLink
            active={isActive("/")}
            onClick={() => navigate("/")}
            className="cursor-pointer font-semibold"
          >
            <span className="flex items-center gap-2">
              <Clapperboard size={17} />
              Home
            </span>
          </NavbarLink>

          <NavbarLink
            active={isActive("/movies")}
            onClick={() => navigate("/movies")}
            className="cursor-pointer font-semibold"
          >
            <span className="flex items-center gap-2">
              <Film size={17} />
              Movies
            </span>
          </NavbarLink>

          <NavbarLink
            active={isActive("/tvShows")}
            onClick={() => navigate("/tvShows")}
            className="cursor-pointer font-semibold"
          >
            <span className="flex items-center gap-2">
              <Tv size={17} />
              TV Shows
            </span>
          </NavbarLink>

          <NavbarLink
            active={isActive("/favorites")}
            onClick={() => navigate("/favorites")}
            className="cursor-pointer font-semibold"
          >
            <span className="flex items-center gap-2">
              <Heart size={17} />
              Favorites
            </span>
          </NavbarLink>

          {/* Mobile Search */}
          <form
            
            className="mt-3 flex w-full items-center gap-2 md:hidden"
          >
            <TextInput
              type="text"
              placeholder="Search movies..."
              className="w-full"
            />

            <button
              type="button"
              aria-label="Search"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white transition hover:bg-red-700"
            >
              <Search size={19} />
            </button>
          </form>

          {/* Mobile Register */}
          <div className="mt-3 flex gap-2 sm:hidden">
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
            >
              <UserPlus size={17} />
              Create Account
            </button>
          </div>

        </NavbarCollapse>

        {/* Desktop Search */}
        <form
          className="hidden items-center gap-2 md:order-1 md:flex lg:ml-6"
        >
          <div className="relative w-48 lg:w-60 xl:w-72">
            <TextInput
              type="text"
              placeholder="Search movies, series..."
              
              className="w-full"
            />
          </div>

          <button
            type="button"
            aria-label="Search"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white shadow-md shadow-red-600/20 transition hover:-translate-y-0.5 hover:bg-red-700"
          >
            <Search size={19} />
          </button>
        </form>

      </Navbar>
    </header>
  );
};

export default NavbarComp;
