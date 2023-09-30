describe("Blog app", () => {
  beforeEach(() => {
    cy.request("POST", `${Cypress.env("backendUrl")}/api/reset`)
    cy.visit("")
  })

  it("Login form is shown", () => {
    cy.contains("username").get("input")
    cy.contains("password").get("input")
    cy.contains("login").get("button")
  })
})
