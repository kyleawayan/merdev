describe("Homepage buttons work", () => {
  it("Homepage buttons work", () => {
    cy.visit("/");
    cy.contains("SIGN UP NOW").click();

    cy.url().should("includes", "/signup");
  });
});
