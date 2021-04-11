// https://docs.cypress.io/guides/getting-started/testing-your-app

describe("The homepage loads", () => {
  it("Homepage successfully loads", () => {
    cy.visit("/");
  });
});
