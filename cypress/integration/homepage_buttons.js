describe("Homepage buttons work", () => {
  it("Homepage buttons work", () => {
    cy.visit("/");
    cy.contains("Sign Up Now").click();

    cy.url().should("includes", "/signup");
  });
});
