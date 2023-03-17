/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';

describe('Landers correctly', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.findByPlaceholderText('Your username').type('test');
    cy.findAllByPlaceholderText('Your password').type('12345');
    cy.findByText('Login').click();
    cy.findByTestId('upload').click();
    cy.url().should('include', '/upload');
  });

  it('upload image and display description correctly', () => {
    cy.findByPlaceholderText('Title').type('test');
    cy.findByPlaceholderText('(Optional) Brush').type('test');
    cy.findByPlaceholderText('(Optional) Say something').type('test');
    cy.findByText('Submit').click();
    cy.url().should('include', 'home');
  });
});
