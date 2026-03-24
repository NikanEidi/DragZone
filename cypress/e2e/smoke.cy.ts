describe('Smoke Test', () => {
  it('should load the home page', () => {
    cy.visit('http://localhost:5173');
    cy.get('body').should('be.visible');
  });
});
