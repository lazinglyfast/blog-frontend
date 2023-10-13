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
      cy.createUser(user)
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
      cy.contains("Invalid username and/or password").should(
        "have.css",
        "color",
        "rgb(255, 0, 0)",
      )
    })

    describe("with a logged in user", () => {
      beforeEach(() => {
        const user = {
          username: "coala",
          password: "bear",
        }

        cy.login(user)
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
          const blog = {
            title: "this is an existing blog",
            author: "teddy",
            url: "http://i.exist/yeah",
          }
          cy.createBlog(blog)
        })

        it("user can like a blog", () => {
          cy.visit("")
          cy.contains("this is an existing blog").as("theBlog")

          cy.get("@theBlog").contains("view").click()

          cy.get("@theBlog").contains("likes 0")

          cy.get("@theBlog").contains("like").click()

          cy.get("@theBlog").contains("likes 1")
        })

        it("user can deleta a blog they created", () => {
          cy.visit("")
          cy.contains("this is an existing blog").contains("remove").click()

          cy.contains("this is an existing blog").should("not.exist")

          cy.get("body")
            .find("this is an existing blog")
            .should("have.length", 0)
        })

        describe("with a blog created by a second user", () => {
          beforeEach(() => {
            const user = {
              name: "alfred",
              username: "panda",
              password: "bear",
            }
            cy.createUser(user)
            cy.login({
              username: "panda",
              password: "bear",
            })

            const blog = {
              title: "this is blog created by someone else",
              author: "panda",
              url: "http://i.exist/other_yeah",
            }

            cy.createBlog(blog)

            cy.login({
              username: "coala",
              password: "bear",
            })
          })

          it("remove button is not visible for blogs that do not belong to user", () => {
            cy.visit("")
            cy.contains("this is blog created by someone else")
              .contains("remove")
              .should("not.be.visible")
          })

          it.only("blogs with most likes come first", () => {
            cy.visit("")

            cy.contains("this is an existing blog").as("blog")
            cy.contains("this is blog created by someone else").as("otherBlog")

            cy.get("@blog").contains("view").click()
            cy.get("@blog").contains("like").click()

            cy.get("@otherBlog").contains("view").click()
            cy.get("@otherBlog").contains("like").click().click()

            cy.contains("most likes first").click()

            cy.get(".blog")
              .eq(0)
              .contains("this is blog created by someone else")
            cy.get(".blog").eq(1).contains("this is an existing blog")
          })
        })
      })
    })
  })
})
