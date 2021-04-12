describe("Test Questions", function () {
  it("Creating Questions", function () {
    cy.visit("/ask");
    cy.get("#titleTextBox")
      .find("input")
      .type("How to make a file", {delay: 100})
      .should("have.value", "How to make a file");

    cy.get("textarea")
      .type("I'm having issues with creating a new file.", {delay: 100})
      .should("have.value", "I'm having issues with creating a new file.");

    cy.get("button")
      .contains("submit question")
      .click();
  });
});