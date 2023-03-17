/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';

describe('Landers correctly', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.findByPlaceholderText('Your username').type('test');
    cy.findAllByPlaceholderText('Your password').type('12345');
    cy.findByText('Login').click();
  });

  it('navigate to talk page correctly', () => {
    cy.findByText('Field of Garden').click();
    cy.url().should('include', 'talk');
  });

  it('display clicked image correctly', () => {
    cy.findByText('Field of Garden').click();
    cy.url().should('include', 'talk');
    cy.findByText('Field of Garden').should('exist');
  });

  it('display chatting box', () => {
    cy.findByText('Field of Garden').click();
    cy.url().should('include', 'talk');
    cy.findByTestId('chatting-box').should('exist');
    cy.findByTestId('input-tweet').should('exist');
  });

  it('display message when there is no talk', () => {
    cy.findByText('Field of Garden').click();
    cy.findByText('No talk yet...').should('exist');
  });
});
