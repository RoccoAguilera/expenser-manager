import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
  // isRouteErrorResponse,
} from "react-router";
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import './ui-system/index.css'
// import type { Route } from "@react-router-type/+types/root";

const queryClient = new QueryClient()

export default function App() {
  const { state } = useNavigation()
  return (
    <QueryClientProvider client={queryClient}>
      {state == "loading" && <span className="loader absolute top-0 left-0 z-10 block h-[3px] bg-pur-400" />}
      <Outlet />
    </QueryClientProvider>
  )
}

export function Layout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite + React + React router + TS</title>
        <Meta />
        <Links />
      </head>
      <body className="relative">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
//   if (isRouteErrorResponse(error)) {
//     return (
//       <>
//         <h1> {error.status} {error.statusText} </h1>
//         <p>{error.data}</p>
//       </>
//     );
//   } else if (error instanceof Error) {
//     return (
//       <div>
//         <h1>Error</h1>
//         <p>{error.message}</p>
//         <p>The stack trace is:</p>
//         <pre>{error.stack}</pre>
//       </div>
//     );
//   } else {
//     return <h1>Unknown Error</h1>;
//   }
// }