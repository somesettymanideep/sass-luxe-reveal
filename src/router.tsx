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
    basepath: "/sass-luxe-reveal/",
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
