// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("login", () => {
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

Cypress.Commands.add("createUser", () => {
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

Cypress.Commands.add("createBlog", () => {
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
