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
        cy.request({
          method: "POST",
          url: `${Cypress.env("backendUrl")}/api/login`,
          body: {
            username: "coala",
            password: "bear",
          },
        }).then((response) => {
          window.localStorage.setItem("loggedUserJson", JSON.stringify(response.body))
        })
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
          cy.request({
            method: "POST",
            url: `${Cypress.env("backendUrl")}/api/blogs`,
            headers: {
              authorization: JSON.parse(window.localStorage.getItem("loggedUserJson")).token,
            },
            body: {
              title: "this is an existing blog",
              author: "teddy",
              url: "http://i.exist/yeah",
            },
          })
        })

        it.only("user can like a blog", () => {
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
      })
    })
  })
})
