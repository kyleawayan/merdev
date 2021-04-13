describe("Test Login", function () {
    it("Visit Page Login", function () {
      cy.visit("/login");
  
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
      cy.get("form")
        .find("button")
        .filter('[type="submit"]')
        .click();
      cy.get("span")
      .contains("dave");
      cy.get("button")
        .contains("sign out");
    });
  });
  