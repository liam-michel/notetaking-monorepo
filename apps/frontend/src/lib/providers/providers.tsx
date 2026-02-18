import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './queryclient'
import { ThemeProvider } from './theme-provider'
function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  )
}

export default Providers
