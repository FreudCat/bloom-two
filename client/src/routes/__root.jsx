import { createRootRoute, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import Header from "../components/Header"

function RootLayout() {
  return (
    <>
      <div>
        <Header />
        <Outlet />
      </div>

      <TanStackRouterDevtools />
    </>
  )
}

export const Route = createRootRoute({
  component: RootLayout
})
