import { Link } from "@tanstack/react-router";
import { Navbar, NavbarBrand, NavbarContent, Button } from "@heroui/react";
import { Icons } from "@/ui/utils/icons";
import { useState, useEffect } from "react";

export const AppNavbar = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check if dark mode is currently active
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <Navbar className="px-0 hidden md:flex w-full">
      <NavbarBrand className="justify-start pl-4 flex-grow-0">
        <Link
          to="/"
        >
          <p className="font-bold text-inherit">rdebrid</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="flex-grow" />
      <NavbarContent className="flex-grow-0" justify="end">
        <ul className="flex items-center gap-2">
          <li>
            <Button
              as="a"
              href="https://github.com/andesco/rdebrid-worker"
              target="_blank"
              rel="noopener noreferrer"
              variant="light"
              isIconOnly
              aria-label="GitHub"
            >
              <Icons.Github />
            </Button>
          </li>
          <li>
            <Button
              onClick={toggleTheme}
              variant="light"
              isIconOnly
              aria-label="Toggle theme"
            >
              {isDark ? <Icons.Sun /> : <Icons.Moon />}
            </Button>
          </li>
        </ul>
      </NavbarContent>
    </Navbar>
  );
};
