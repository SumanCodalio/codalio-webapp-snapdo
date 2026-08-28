describe('Page Load Smoke Tests', () => {
  const routes = [
    { path: '/', title: 'Today' },
    { path: '/focus', title: 'Focus session' },
    { path: '/upcoming', title: 'Upcoming Tasks' },
    { path: '/archive', title: 'Task Archive' },
    { path: '/settings', title: 'Settings' },
    { path: '/settings/voice', title: 'Voice assistants' },
    { path: '/settings/theme', title: 'Theme & Ergonomics' },
    { path: '/login', title: 'Sign in to Snap' },
    { path: '/signup', title: 'Welcome to Snap' },
    { path: '/onboarding', title: 'Welcome to Snap' },
    { path: '/dashboard', title: 'Dashboard' },
    { path: '/voice-capture', title: 'Voice Capture API' },
    { path: '/admin/login', title: 'Snap System Portal' },
    { path: '/admin/analytics', title: 'Admin Analytics & Telemetry' },
    { path: '/admin/feature-flags', title: 'Admin Feature Flags' },
  ];

  // Everything but the auth screens is behind the login guard now.
  beforeEach(() => {
    cy.signIn();
  });

  routes.forEach(({ path, title }) => {
    it(`loads ${path} successfully`, () => {
      cy.visit(path);
      cy.contains(title, { timeout: 10000 }).should('be.visible');
    });
  });
});
