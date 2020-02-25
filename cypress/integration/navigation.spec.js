describe("Navigation", () => {
  it("Should reset the database", () => {
    cy.request("GET", "/api/debug/reset");
  });

  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.contains("[data-testid=day]", "Tuesday")
    .click()
    .should('have.class', 'day-list__item--selected')
  });
  
});