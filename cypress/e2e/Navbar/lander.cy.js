/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';

describe('Landers correctly', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.findByPlaceholderText('Your username').type('test');
    cy.findAllByPlaceholderText('Your password').type('12345');
    cy.findByText('Login').click();
  });

  it('display logo and the buttons of home, upload, user and logout correctly', () => {
    cy.findByTestId('logo').should('exist');
    cy.findByTestId('home').should('exist');
    cy.findByTestId('upload').should('exist');
    cy.findByText('test').should('exist');
    cy.findByTestId('logout').should('exist');
  });
});
