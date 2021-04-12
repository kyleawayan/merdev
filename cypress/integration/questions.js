describe("Test Questions", function () {
  it("Creating Questions", function () {
    cy.visit("/ask");
    cy.get("#titleTextBox")
      .find("input")
      .filter('[type="text"]')
      .type("How to make a file", {delay: 100})
      .should("have.value", "How to make a file")

    cy.get("class")
      .find("input")
      .filter('[type="question"]')
      .type("I'm having issues with creating a new file.", {delay: 100})
      .should("have.value", "I'm having issues with creating a new file.")

    cy.get("form").find("button").filter('[type="submit"]').click();
  });
});