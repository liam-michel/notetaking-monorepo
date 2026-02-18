import { createRootRouteWithContext, createRoute, redirect } from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import type { QueryClient } from '@tanstack/react-query'
import { createRouter } from '@tanstack/react-router'
import { queryClient } from './lib/providers/queryclient'
import { ModeToggle } from './components/mode-toggle'
import Signup from './pages/signup/SignUp'
import Login from './pages/login/Login'
import { authClient } from './lib/auth-client'
export interface RouterContext {
  queryClient: QueryClient
}

const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <div className="fixed top-4 right-4 z-50">
        <ModeToggle />
      </div>
      <Outlet />
    </>
  ),
})
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <div>Home</div>,
})

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'about',
  component: About,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'login',
  component: Login,
})

const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'signup',
  component: Signup,
})

export const protectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'dashboard',
  component: Dashboard,
  loader: async () => {
    //auth check with betterauth
    const authResult = await authClient.getSession()
    if (!authResult.data?.session) {
      redirect({ to: '/login' })
    }
  },
})

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute, loginRoute, signUpRoute, protectedRoute])

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
})

declare module '@tanstack/react-router' {
  export interface RegisterRouter {
    router: typeof router
  }
}
