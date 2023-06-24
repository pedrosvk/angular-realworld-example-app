/// <reference types="cypress" />

describe("Signup & Login", () => {
  let randomString = Math.random().toString(36).substring(2);
  let username = "Auto" + randomString;
  let email = "Auto_email" + randomString + "@gmail.com";
  let password = "Password1";

  it.skip("Test Valid Signup", () => {
    cy.intercept("POST", "**/*.realworld.io/api/users").as("newUser");

    cy.visit("http://localhost:4200/");

    cy.get(".nav").contains("Sign up").click();
    cy.get("[placeholder='Username']").type(username);
    cy.get("[placeholder='Email']").type(email);
    cy.get("[placeholder='Password']").type(password);
    cy.get("button").contains("Sign up").click();

    cy.wait("@newUser").should(({ request, response }) => {
      cy.log("Request: " + JSON.stringify(request));
      cy.log("Response: " + JSON.stringify(response));

      expect(response.statusCode).to.eq(200);
      expect(request.body.user.username).to.eq(username);
      expect(request.body.user.email).to.eq(email);
    });
  });

  it("Test Valid Login & Mock Popular Tags", () => {
    cy.intercept("GET", "**/tags", { fixture: "popularTags.json" });
    cy.visit("http://localhost:4200/");
    cy.get(".nav").contains("Sign in").click();
    cy.get("[placeholder='Email']").type(email);
    cy.get("[placeholder='Password']").type(password);
    cy.get("button").contains("Sign in").click();
    cy.get(":nth-child(4) > .nav-link").contains(username);

    cy.get(".tag-list")
      .should("contain", "JavaScript")
      .and("contain", "cypress");
  });

  it("Mock global feed data", () => {
    cy.intercept("GET", "**/api/articles*", {
      fixture: "testArticles.json",
    }).as("articles");
    cy.visit("http://localhost:4200/");
    cy.get(".nav").contains("Sign in").click();
    cy.get("[placeholder='Email']").type(email);
    cy.get("[placeholder='Password']").type(password);
    cy.get("button").contains("Sign in").click();
    cy.get(":nth-child(4) > .nav-link").contains(username);
    cy.wait("@articles");
  });
});
