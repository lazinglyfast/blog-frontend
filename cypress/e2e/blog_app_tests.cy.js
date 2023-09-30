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

  describe("with an existing user", () => {
    beforeEach(() => {
      const user = {
        name: "oswald",
        username: "coala",
        password: "bear",
      }
      cy.request({
        method: "POST",
        url: `${Cypress.env("backendUrl")}/api/users`,
        body: user,
      })
    })

    it("User can successfully login with correct credentials", () => {
      cy.get("#username").type("coala")
      cy.get("#password").type("bear")
      cy.contains("login").click()
      cy.contains("coala logged in")
    })

    it("User login fails with incorrect credentials", () => {
      cy.get("#username").type("coala")
      cy.get("#password").type("this is not my password")
      cy.contains("login").click()
      cy.contains("Invalid username and/or password")
        .should("have.css", "color", "rgb(255, 0, 0)")
    })
  })
})
