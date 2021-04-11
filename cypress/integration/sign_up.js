describe("Test Sign Up", function () {
  it("Visit Page Sign Up", function () {
    cy.visit("/signup");
    cy.get("form")
      .find("input")
      .filter('[type="text"]')
      .type("dave", { delay: 100 })
      .should("have.value", "dave");

    cy.get("form")
      .find("input")
      .filter('[type="email"]')
      .type("papadavejones@gmail.com", { delay: 100 })
      .should("have.value", "papadavejones@gmail.com");

    cy.get("form")
      .find("input")
      .filter('[type="password"]')
      .type("mymom123", { delay: 100 })
      .should("have.value", "mymom123");
    cy.get("form").find("button").filter('[type="submit"]').click();
  });
});
