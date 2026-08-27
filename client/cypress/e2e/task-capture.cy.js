describe('Task Capture Flow', () => {
  it('allows capturing a new task', () => {
    cy.visit('/');
    cy.get('input[placeholder*="Add a task"]').type('Buy milk tomorrow{enter}');
    cy.contains('Today').should('be.visible');
  });
});
