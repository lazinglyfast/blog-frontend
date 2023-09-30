describe("Blog app", () => {
  beforeEach(() => {
    cy.request("POST", `${Cypress.env("backendUrl")}/api/reset`)
  })

  it("Login form is shown", () => {
    cy.visit("")
    cy.contains("username").get("input")
    cy.contains("password").get("input")
    cy.contains("login").get("button")
  })

  describe("with an existing user", () => {
    beforeEach(() => {
      cy.createUser()
    })

    it("User can successfully login with correct credentials", () => {
      cy.visit("")
      cy.get("#username").type("coala")
      cy.get("#password").type("bear")
      cy.contains("login").click()
      cy.contains("coala logged in")
    })

    it("User login fails with incorrect credentials", () => {
      cy.visit("")
      cy.get("#username").type("coala")
      cy.get("#password").type("this is not my password")
      cy.contains("login").click()
      cy.contains("Invalid username and/or password")
        .should("have.css", "color", "rgb(255, 0, 0)")
    })

    describe("with a logged in user", () => {
      beforeEach(() => {
        cy.login()
      })

      it("user can create new blog", () => {
        cy.visit("")
        cy.contains("create new blog").click()
        cy.get("#title").type("this is a new blog")
        cy.get("#author").type("teddy")
        cy.get("#url").type("http://helsinki.fullstack/rocks")
        cy.contains("create").click()
        cy.contains("this is a new blog")
      })

      describe("with an existing blog", () => {
        beforeEach(() => {
          cy.createBlog()
        })

        it("user can like a blog", () => {
          cy.visit("")
          cy.contains("this is an existing blog").as("theBlog")

          cy.get("@theBlog")
            .contains("view")
            .click()

          cy.get("@theBlog")
            .contains("likes 0")

          cy.get("@theBlog")
            .contains("like")
            .click()

          cy.get("@theBlog")
            .contains("likes 1")
        })

        it("user can deleta a blog they created", () => {
          cy.visit("")
          cy.contains("this is an existing blog")
            .contains("remove")
            .click()

          cy.contains("this is an existing blog")
            .should("not.exist")

          cy.get("body")
            .find("this is an existing blog")
            .should("have.length", 0)
        })
      })
    })
  })
})
