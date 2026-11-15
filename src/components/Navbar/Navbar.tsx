
import { useEffect, useState } from "react";

import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  TextInput,
} from "flowbite-react";

import Logo from "../../assets/images/home-movie-background.png";

import {
  Search,
  Sun,
  Moon,
} from "lucide-react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

type Theme = "light" | "dark";

const NavbarComp = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Get saved theme
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme");

    return savedTheme === "dark" ? "dark" : "light";
  });

  // Apply theme to the entire application
  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );

    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle between dark and light
  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "light" ? "dark" : "light"
    );
  };

  return (
    <Navbar
      fluid
      rounded
      className="my-2 border border-gray-200 bg-white shadow-md transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900"
    >
      {/* Logo */}
      <NavbarBrand>
        <img
          src={Logo}
          className="mr-3 h-9 w-9 rounded-full object-cover"
          alt="Movie App Logo"
        />

        <span className="self-center whitespace-nowrap text-xl font-bold text-gray-900 dark:text-white">
          Movie App
        </span>
      </NavbarBrand>

      {/* Right Section */}
      <div className="flex items-center gap-3 md:order-2">

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          className="rounded-full border border-gray-200 bg-gray-100 p-2.5 text-gray-700 transition-all duration-300 hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-yellow-400 dark:hover:bg-gray-700"
        >
          {theme === "dark" ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} />
          )}
        </button>

        {/* User Dropdown */}
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">
              Bonnie Green
            </span>

            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </DropdownHeader>

          <DropdownItem>Dashboard</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Earnings</DropdownItem>

          <DropdownDivider />

          <DropdownItem>Sign out</DropdownItem>
        </Dropdown>

        <NavbarToggle />
      </div>

      {/* Navigation Links */}
      <NavbarCollapse>
        <NavbarLink
          className="cursor-pointer"
          onClick={() => navigate("/")}
          active={pathname === "/"}
        >
          Home
        </NavbarLink>

        <NavbarLink
          className="cursor-pointer"
          onClick={() => navigate("/movies")}
          active={pathname === "/movies"}
        >
          Movies
        </NavbarLink>

        <NavbarLink
          className="cursor-pointer"
          onClick={() => navigate("/tvShows")}
          active={pathname === "/tvShows"}
        >
          TV Shows
        </NavbarLink>

        <NavbarLink
          className="cursor-pointer"
          onClick={() => navigate("/favorites")}
          active={pathname === "/favorites"}
        >
          Favorites
        </NavbarLink>
      </NavbarCollapse>

      {/* Search */}
      <div className="flex items-center gap-2">
        <TextInput
          type="text"
          placeholder="Search movies..."
          className="lg:w-72"
        />

        <button
          type="button"
          aria-label="Search"
          className="shrink-0 rounded-full p-2 text-gray-700 transition hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
        >
          <Search size={21} />
        </button>
      </div>
    </Navbar>
  );
};

export default NavbarComp;
