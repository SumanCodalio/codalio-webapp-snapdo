describe('Authentication Flow', () => {
  it('allows user to sign up', () => {
    cy.visit('/signup');
    cy.get('input#name').type('Test User');
    cy.get('input#email').type(`test_${Date.now()}@snap.app`);
    cy.get('input#password').type('password123');
    cy.get('input[type="checkbox"]').check({ force: true });
    cy.contains('button', 'Create account').click();
    cy.url().should('include', '/onboarding');
  });

  it('allows admin to sign in', () => {
    cy.visit('/admin/login');
    cy.get('input#admin-email').type('admin@snap.app');
    cy.get('input#admin-password').type('password123');
    cy.contains('button', 'Sign In to Admin').click();
    cy.url().should('include', '/admin/analytics');
  });
});
