/// <reference types="cypress" />

describe("Signup & Login", () => {
  let randomString = Math.random().toString(36).substring(2);

  it("Test Valid Signup", () => {
    cy.visit("http://localhost:4200/");

    cy.get(".nav").contains("Sign up").click();
    cy.get("[placeholder='Username']").type("Auto" + randomString);
    cy.get("[placeholder='Email']").type(
      "Auto_email" + randomString + "@gmail.com"
    );
    cy.get("[placeholder='Password']").type("Password1");
    cy.get("button").contains("Sign up").click();
  });
});
