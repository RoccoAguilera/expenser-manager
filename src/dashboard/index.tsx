import { Outlet } from "react-router";
import { ContextSettingProvider, ContextStateProvider } from "./environment";
import Sidebar from "./sidebar";
import Form from "./components/Form"
import "./index.css"

/* Dashboard layout - Initial Route "/" */
export default function App() {
  return (
    <>
      <ContextSettingProvider>
        <ContextStateProvider>
          <main className="relative flex h-dvh">
            <Form />
            <Sidebar />
            <div className="flex-1 max-w-screen-lg mx-auto pt-2 px-5">
              <Outlet />
            </div>
          </main>
        </ContextStateProvider>
      </ContextSettingProvider>
    </>
  )
}