// Custom Cypress commands
Cypress.Commands.add('signIn', (email = 'user@snap.app', password = 'password123') => {
  cy.request('POST', '/api/auth/sign_in', { email, password }).then((response) => {
    if (response.headers['access-token']) {
      localStorage.setItem('access-token', response.headers['access-token']);
      localStorage.setItem('client', response.headers['client']);
      localStorage.setItem('uid', response.headers['uid']);
      localStorage.setItem('expiry', response.headers['expiry']);
    }
  });
});
