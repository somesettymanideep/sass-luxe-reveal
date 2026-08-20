import { createHashHistory, createBrowserHistory } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();
  
  // Use BrowserHistory on server, HashHistory on client (only for the browser build)
  const history = typeof window !== "undefined" ? createHashHistory() : createBrowserHistory();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    history,
    basepath: "/sass-luxe-reveal",
  });

  return router;
};
