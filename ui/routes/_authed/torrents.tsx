import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/torrents")({
  beforeLoad: () => {
    throw redirect({
      to: "/view",
      search: {
        type: "torrents",
        page: 1,
      },
    });
  },
});