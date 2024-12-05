// Import config at the top of the file
const config = require('../../auth-server/config.json'); 

describe('show/hide an event details', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/meet');
  });

  it('User can sign in with Google', () => {
    cy.get('.google-btn .btn-text').click();

    cy.window().then((win) => {
      win.localStorage.setItem('access_token', 'mock_token');
    });

    cy.reload();

    cy.get('.event', { timeout: 30000 }).should('be.visible');
  });

  it('An event element is collapsed by default', () => {
    cy.get('.event .event__Details').should('not.exist');
  });

  it('User can expand an event to see its details', () => {
    cy.get('.event .details-btn').first().click();
    cy.get('.event .event__Details').should('exist');
  });

  it('User can collapse an event to hide its details', () => {
    cy.get('.event .details-btn').first().click();
    cy.get('.event .details-btn').first().click();
    cy.get('.event .event__Details').should('not.exist');
  });
}); 