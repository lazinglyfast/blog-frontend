import React from "react"
import { Provider } from "react-redux"
import ReactDOM from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { NotificationContextProvider } from "./components/NotificationContext"
import { UserContextProvider } from "./components/UserContext"
import App from "./App"
import store from "./store"

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={client}>
    <UserContextProvider>
      <NotificationContextProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </NotificationContextProvider>
    </UserContextProvider>
  </QueryClientProvider>,
)
