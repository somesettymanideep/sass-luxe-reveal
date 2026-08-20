import { createHashHistory, createMemoryHistory } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();
  
  // Use MemoryHistory on server to avoid window/DOM dependencies, HashHistory on client
  const history = typeof window !== "undefined" ? createHashHistory() : createMemoryHistory();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    history,
    basepath: "/sass-luxe-reveal",
  });

  return router;
};
