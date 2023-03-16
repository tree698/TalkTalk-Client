/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('login correctly', () => {
    cy.findByPlaceholderText('Your username').type('test');
    cy.findAllByPlaceholderText('Your password').type('12345');

    cy.findByText('Login').click();

    cy.url().should('include', 'home');
  });
});
