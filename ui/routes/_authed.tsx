import { AppNavbar } from "@/ui/components/navbar";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useSelectModalStore } from "@/ui/utils/store";
import { FileSelectModal } from "@/ui/components/list/debrid";
import { SideNav } from "@/ui/components/side-nav";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const Route = createFileRoute("/_authed")({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const open = useSelectModalStore((state) => state.open);

  useEffect(() => {
    // Check for missing credentials and show warnings
    const checkCredentials = async () => {
      console.log('Checking credentials...');
      try {
        // Check if DEBRID_TOKEN is set by making a request to the API
        const response = await fetch('/api/debrid/user');
        if (!response.ok) {
          toast.error('Real Debrid Token (DEBRID_TOKEN) is not set', {
            duration: 6000,
            id: 'missing-debrid-token'
          });
        }
      } catch (error) {
        toast.error('Real Debrid Token (DEBRID_TOKEN) is not set', {
          duration: 6000,
          id: 'missing-debrid-token'
        });
      }

      // Check if basic auth is configured
      try {
        const response = await fetch('/api/health');
        // If we get here without auth challenge, check for Cloudflare Access protection
        if (response.ok) {
          // Check if we're protected by Cloudflare Access
          // CF Access adds specific headers to requests when active
          const cfAccessJWT = document.cookie.includes('CF_Authorization');
          const cfAccessAuth = response.headers.get('cf-access-authenticated-user-email');
          const cfAccessUserId = response.headers.get('cf-access-authenticated-user-id');
          
          // Check if Cloudflare Access is enabled
          if (cfAccessJWT || cfAccessAuth || cfAccessUserId) {
            // Check if we've shown this toast today
            const today = new Date().toDateString();
            const lastShown = localStorage.getItem('cf-access-toast-shown');
            
            if (lastShown !== today) {
              toast.success('Cloudflare Access', {
                duration: 4000,
                id: 'cf-access-enabled'
              });
              localStorage.setItem('cf-access-toast-shown', today);
            }
          } else {
            // If no Cloudflare Access indicators are found, show warning
            toast.error('set username & password or enable Cloudflare Access', {
              duration: 8000,
              id: 'missing-auth-protection'
            });
          }
        }
      } catch (error) {
        // Auth challenge means basic auth is working, so we're good
      }
    };

    checkCredentials();
  }, []);

  return (
    <div className="flex min-h-screen overflow-hidden">
      <div className="relative z-0 flex-1">
        <AppNavbar />
        <SideNav />
        <main className="absolute left-0 right-0 md:bottom-0 md:left-36 bottom-20 top-0 md:top-16 max-w-screen-xl mx-auto overflow-y-auto p-4">
          <Outlet />
        </main>
        {open && <FileSelectModal />}
      </div>
    </div>
  );
}
