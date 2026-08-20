import { createHashHistory } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();
  const hashHistory = createHashHistory();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    history: hashHistory,
    // Note: When using basepath in createRouter, TanStack Router handles the prefix automatically
    // for all <Link> and router.navigate calls.
    basepath: "/sass-luxe-reveal",
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
