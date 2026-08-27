// Custom Cypress commands

// Signs in through the real login endpoint and stores the token under the key
// the Rhino client reads, so the app boots already authenticated.
Cypress.Commands.add('signIn', (email = 'test@example.com', password = 'password') => {
  cy.request('POST', '/api/auth/login', { email, password }).then((response) => {
    window.localStorage.setItem('token', response.body.token);
    if (response.body.organization_slug) {
      window.localStorage.setItem('organization_slug', response.body.organization_slug);
    }
  });
});
