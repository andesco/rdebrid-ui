import { Icons } from "@/ui/utils/icons";

export const siteConfig = {
  name: "Debrid",
  description: "Debrid",
  navItems: [
    {
      id: "btsearch",
      label: "Search",
      path: "/btsearch",
      search: {},
      icon: Icons.Search,
    },
    {
      id: "add",
      label: "Add",
      path: "/downloader/torrents",
      search: {},
      icon: Icons.Link,
      matchPaths: ["/downloader/torrents", "/downloader/links"],
    },
    {
      id: "torrents",
      label: "Torrents",
      path: "/torrents",
      search: {},
      icon: Icons.TorrentOutline,
      matchPaths: ["/torrents"],
      viewMatch: { path: "/view", type: "torrents" },
    },
    {
      id: "downloads",
      label: "Downloads",
      path: "/downloads",
      search: {},
      icon: Icons.Download,
      matchPaths: ["/downloads"],
      viewMatch: { path: "/view", type: "downloads" },
    },
  ],
} as const;
