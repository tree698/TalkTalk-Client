/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';

describe('Landers correctly', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.findByPlaceholderText('Your username').type('test');
    cy.findAllByPlaceholderText('Your password').type('12345');
    cy.findByText('Login').click();
  });

  it('display action button', () => {
    cy.findByText('All Drawings').should('exist');
    cy.findByText('My Drawings').should('exist');
    cy.findByPlaceholderText('Search...').should('exist');
    cy.findByText('View More').should('exist');
    cy.findAllByRole('img').should('exist');
  });
});
