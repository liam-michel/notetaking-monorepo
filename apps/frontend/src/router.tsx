import { createRootRouteWithContext, createRoute, redirect } from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import { createRouter } from '@tanstack/react-router'
import { queryClient } from './lib/providers/queryclient'
import { ModeToggle } from './components/mode-toggle'
import Signup from './pages/signup/SignUp'
import Login from './pages/login/Login'
import { authClient } from './lib/auth-client'
import UserStrategies from './pages/user-strategies/UserStrategies'
import { MainLayout } from './layouts/MainLayout'
import StrategyDetail from './pages/user-strategy/UserStrategy'
export interface User {
  id: string
  name: string
  email: string
}
export interface RouterContext {
  queryClient: QueryClient
  user: User | null
}

const redirectIfAuthenticated = async () => {
  const authResult = await authClient.getSession()
  if (authResult.data?.session) {
    throw redirect({ to: '/' })
  }
}

const redirectIfUnauthenticated = async (): Promise<{ user: User }> => {
  const authResult = await authClient.getSession()
  if (!authResult.data?.session) {
    throw redirect({ to: '/login' })
  }
  const contextUser: User = {
    id: authResult.data.user.id,
    name: authResult.data.user.name || '',
    email: authResult.data.user.email || '',
  }
  return {
    user: contextUser as User,
  }
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

// 1. Public layout — no auth required, passes user or null
export const mainLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'main',
  component: MainLayout,
  beforeLoad: async () => {
    const authResult = await authClient.getSession()
    const user = authResult.data?.session
      ? {
          id: authResult.data.user.id,
          name: authResult.data.user.name || '',
          email: authResult.data.user.email || '',
        }
      : null
    return { user }
  },
})

// 2. Protected layout — auth required, reuses main layout
export const protectedLayoutRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  id: 'protected',
  beforeLoad: async ({ context }) => {
    // ← use context instead of redirectIfUnauthenticated
    if (!context.user) {
      throw redirect({ to: '/login' })
    }
  },
})

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'login',
  component: Login,
  beforeLoad: redirectIfAuthenticated,
})

export const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'signup',
  component: Signup,
  beforeLoad: redirectIfAuthenticated,
})

// Dashboard is now a child of the layout, not root
export const dashboardRoute = createRoute({
  getParentRoute: () => mainLayoutRoute, // ← parent is layout, not root
  path: '/',
  component: () => <div>Dashboard</div>,
})

export const userStrategiesRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: 'strategies',
  component: UserStrategies,
})

export const strategyRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: 'strategy/$id',
  component: StrategyDetail,
})

const routeTree = rootRoute.addChildren([
  loginRoute,
  signUpRoute,
  mainLayoutRoute.addChildren([dashboardRoute, protectedLayoutRoute.addChildren([userStrategiesRoute, strategyRoute])]),
])
export const router = createRouter({
  routeTree,
  context: {
    queryClient,
    user: null,
  },
})

export { rootRoute }
declare module '@tanstack/react-router' {
  export interface RegisterRouter {
    router: typeof router
  }
}
