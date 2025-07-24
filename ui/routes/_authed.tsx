import { Navbar } from "@/ui/components/navbar";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useSelectModalStore } from "@/ui/utils/store";
import { FileSelectModal } from "@/ui/components/list/debrid";
import clsx from "clsx";
import { SideNav } from "@/ui/components/side-nav";
import { scrollClasses } from "@/ui/utils/classes";

export const Route = createFileRoute("/_authed")({
  component: AuthenticatedLayout,
});
function AuthenticatedLayout() {
  const open = useSelectModalStore((state) => state.open);
  return (
    <div className="flex min-h-dvh overflow-hidden">
      <div className="relative z-0 flex-1">
        <Navbar />
        <SideNav />
        <main
          className={clsx(
            "absolute left-0 right-0 md:bottom-0 md:left-20 bottom-20 top-20 max-w-screen-xl mx-auto overflow-y-auto",
            scrollClasses,
          )}
        >
          <Outlet />
        </main>
        {open && <FileSelectModal />}
      </div>
    </div>
  );
}
