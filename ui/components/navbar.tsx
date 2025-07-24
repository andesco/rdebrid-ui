import { Link } from "@tanstack/react-router";

export const Navbar = () => {
  return (
    <header className="h-12 flex w-full justify-between items-center px-6 pt-3 z-50">
      <Link
        className="flex max-w-20 cursor-pointer gap-2"
        to="/downloader/$tabId"
        params={{ tabId: "links" }}
      >
        <p className="font-bold text-inherit">Rdebrid</p>
      </Link>
    </header>
  );
};
