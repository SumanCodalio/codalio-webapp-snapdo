describe('Task Capture Flow', () => {
  beforeEach(() => {
    cy.signIn();
  });

  it('allows capturing a new task', () => {
    const title = `Buy milk ${Date.now()}`;
    cy.visit('/');
    cy.get('input[placeholder*="Add a task"]').type(`${title}{enter}`);
    cy.contains(title).should('be.visible');
  });
});
