describe('Authentication Flow', () => {
  it('allows user to sign up', () => {
    cy.visit('/signup');
    cy.get('input#name').type('Test User');
    cy.get('input#email').type(`test_${Date.now()}@snap.app`);
    cy.get('input#password').type('password123');
    cy.get('[role="checkbox"]').click();
    cy.contains('button', 'Create account').click();
    cy.url().should('include', '/onboarding');
  });

  it('allows user to sign in', () => {
    cy.visit('/login');
    cy.get('input#email').type('test@example.com');
    cy.get('input#password').type('password');
    cy.contains('button', 'Sign in').click();
    cy.contains('Today').should('be.visible');
  });

  it('rejects bad credentials without leaving the login page', () => {
    cy.visit('/login');
    cy.get('input#email').type('test@example.com');
    cy.get('input#password').type('wrong-password');
    cy.contains('button', 'Sign in').click();
    cy.contains('Invalid credentials').should('be.visible');
    cy.location('pathname').should('eq', '/login');
  });

  it('allows admin to sign in', () => {
    cy.visit('/admin/login');
    cy.get('input#admin-email').type('admin@demo.com');
    cy.get('input#admin-password').type('password');
    cy.contains('button', 'Sign In to Admin').click();
    cy.url().should('include', '/admin/analytics');
  });

  // The bug this guards: a signed-out visit to a data page used to 401, and the
  // API client answered a 401 by sending the browser to "/", which loaded the
  // same data page and 401'd again — the page flickered through a reload loop.
  it('sends a signed-out visitor to the login page once, without reloading', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        // Survives a client-side redirect but not a document reload, so it
        // tells the two apart.
        win.__notReloaded = true;
      },
    });
    cy.location('pathname').should('eq', '/login');
    cy.contains('Sign in to Snap').should('be.visible');
    cy.window().its('__notReloaded').should('eq', true);
  });
});
