import { Link, useLocation } from "@tanstack/react-router";
import { siteConfig } from "@/ui/config/site";
import { Card, CardBody } from "@heroui/react";
import clsx from "clsx";

export const SideNav = () => {
  const location = useLocation();

  return (
    <Card className={clsx(
      "absolute bottom-0 left-0 md:top-20 z-50 flex gap-2 md:w-36 md:h-full md:flex-col",
      "w-full h-16 top-auto justify-around md:justify-start"
    )}>
      <CardBody className="flex md:flex-col flex-row gap-2 p-2 items-center justify-around md:justify-start md:items-start">
        {siteConfig.navItems.map((item, _) => {
          // Check if current path matches any of the item's matchPaths or the main path
          const matchPaths = (item as any).matchPaths || [item.path];
          let isHighlighted = matchPaths.some((path: string) => 
            location.pathname.startsWith(path)
          );
          
          // Also check for viewMatch (for /view?type=torrents/downloads)
          const viewMatch = (item as any).viewMatch;
          if (viewMatch && location.pathname === viewMatch.path) {
            const searchParams = new URLSearchParams(location.search);
            if (searchParams.get('type') === viewMatch.type) {
              isHighlighted = true;
            }
          }

          return (
            <Link
              key={item.id}
              to={item.path}
              search={item.search}
              preload="intent"
            >
              {({ isActive }) => {
                const shouldHighlight = isActive || isHighlighted;
                return (
                  <div className={`flex items-center justify-center md:justify-start flex-col md:flex-row gap-1 p-2 rounded-medium hover:bg-default-100 w-full ${shouldHighlight ? 'bg-default-200' : ''}`}>
                    <div className="md:w-6 md:flex md:justify-center">
                      <item.icon />
                    </div>
                    <p className="text-xs md:text-sm md:flex-1 md:text-left">
                      {item.label}
                    </p>
                  </div>
                );
              }}
            </Link>
          );
        })}
      </CardBody>
    </Card>
  );
};
