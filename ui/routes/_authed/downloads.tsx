import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/downloads")({
  beforeLoad: () => {
    throw redirect({
      to: "/view",
      search: {
        type: "downloads",
        page: 1,
      },
    });
  },
});