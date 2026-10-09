import { Category as CategoryEnum } from "@/backend";
import { Layout } from "@/components/Layout";
import { CategoryPage } from "@/pages/CategoryPage";
import { GetInTouchPage } from "@/pages/GetInTouchPage";
import { HomePage } from "@/pages/HomePage";
import { IssuesOverviewPage } from "@/pages/IssuesOverviewPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ProblemPage } from "@/pages/ProblemPage";
import { WhyThisMattersPage } from "@/pages/WhyThisMattersPage";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
  notFoundComponent: NotFoundPage,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const issuesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/issues",
  component: IssuesOverviewPage,
});

const physicalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/issues/physical",
  component: () => <CategoryPage category={CategoryEnum.physical} />,
});

const mentalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/issues/mental",
  component: () => <CategoryPage category={CategoryEnum.mental} />,
});

const problemRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/issues/$category/$slug",
  component: ProblemPage,
});

const whyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/why-this-matters",
  component: WhyThisMattersPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/get-in-touch",
  component: GetInTouchPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  issuesRoute,
  physicalRoute,
  mentalRoute,
  problemRoute,
  whyRoute,
  contactRoute,
]);

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFoundPage,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
