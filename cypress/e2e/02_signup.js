/// <reference types="cypress" />

describe("Signup & Login", () => {
  let randomString = Math.random().toString(36).substring(2);
  let username = "Auto" + randomString;
  let email = "Auto_email" + randomString + "@gmail.com";

  it("Test Valid Signup", () => {
    cy.intercept("POST", "**/*.realworld.io/api/users").as("newUser");

    cy.visit("http://localhost:4200/");

    cy.get(".nav").contains("Sign up").click();
    cy.get("[placeholder='Username']").type(username);
    cy.get("[placeholder='Email']").type(email);
    cy.get("[placeholder='Password']").type("Password1");
    cy.get("button").contains("Sign up").click();

    cy.wait("@newUser").then(({ request, response }) => {
      cy.log("Request: " + JSON.stringify(request));
      cy.log("Response: " + JSON.stringify(response));

      expect(response.statusCode).to.eq(200);
      expect(request.body.user.username).to.eq(username);
      expect(request.body.user.email).to.eq(email);
    });
  });
});
