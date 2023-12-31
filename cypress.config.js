import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    setupNodeEvents() {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:5175",
  },
  env: {
    backendUrl: "http://localhost:3003",
  },
})
