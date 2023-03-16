/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';

describe('Landers correctly', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.findByPlaceholderText('Your username').type('test');
    cy.findAllByPlaceholderText('Your password').type('12345');
    cy.findByText('Login').click();
  });

  it('display more drawings or message when clicking view more button', () => {
    cy.findByText('View More').click();
    cy.findByText('No more drawings').should('exist');
  });
});
