describe('Smoke Test', () => {
  it('should load the home page', () => {
    cy.visit('/');
    cy.get('body').should('be.visible');
  });
});
