describe("Should book an Appointment", () => {

  before(function() {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("[data-testid=day]", "Monday")
  });

  it("Should click on an empty appointment", () => {
    cy.get("img[alt=Add]")
    .first()
    .click();
  });

  it("Should type in student name to input field", () => {
    cy.get("[data-testid=student-name-input]")
    .type("Lydia Miller-Jones");
  });

  it("Should click on Sylvia Palmer interviewer icon", () => {
    cy.get("img[alt='Sylvia Palmer']")
    .click();
  });

  it("Should click the save button", () => {
    cy.contains('Save')
    .click();
  });

  it("Should see the newly added user", () => {
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
  });
});

describe("Should edit an Appointment", () => {

  before(function() {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("[data-testid=day]", "Monday")
  });

  it("Should click on an edit button", () => {
    cy.contains(".appointment__card--show", "Archie Cohen")
    .get("img[alt=Edit]")
    .click({force: true});
  });

  it("Should clear the input and enter a new name", () => {
    cy.get("[data-testid=student-name-input]")
    .clear()
    .type("Johnny Boi");
  });

  it("Should click on interviewer Tori Malcom", () => {
    cy.get("img[alt='Tori Malcolm']")
    .click();
  });

  it("Should click the save button", () => {
    cy.contains('Save')
    .click();
  });

  it("Should see the newly added user", () => {
    cy.contains(".appointment__card--show", "Johnny Boi");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });
});

describe("Should cancel an Appointment", () => {

  before(function() {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("[data-testid=day]", "Monday")
  });

  it("Should click on an cancel button", () => {
    cy.contains(".appointment__card--show", "Archie Cohen")
    .get("img[alt=Delete]")
    .click({force: true});
  });

  it("Should click confirm on the confirm delete page", () => {
    cy.contains('Confirm')
    .click();
  });

  it("Should see the Deleting status", () => {
    cy.get(".appointment__card--status")
  });

  it("Deleting status should dissapear", () => {
    cy.get(".appointment__card--status")
    .should("not.exist");
  });

  it("Deleted interview should be gone", () => {
    cy.contains(".appointment__card--show", "Archie Cohen")
    .should("not.exist");
  });
});