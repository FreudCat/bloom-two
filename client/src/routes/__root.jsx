import { createRootRoute, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import Header from "../components/Header"
import Footer from "../components/Footer"

export const Route = createRootRoute({
  component: () => {
    return (
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    )
  }
})
