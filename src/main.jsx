import React from "react"
import { Provider } from "react-redux"
import ReactDOM from "react-dom/client"
import App from "./App"
import store from "./store"
import { NotificationContextProvider } from "./components/NotificationContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  <NotificationContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </NotificationContextProvider>,
)
