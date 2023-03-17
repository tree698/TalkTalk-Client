/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';

describe('navigate correctly', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.findByPlaceholderText('Your username').type('test');
    cy.findAllByPlaceholderText('Your password').type('12345');
    cy.findByText('Login').click();
  });

  it('navigate to home page from upload page when clicking the button of home', () => {
    cy.findByTestId('upload').click();
    cy.url().should('include', 'upload');
    cy.findByTestId('home').click();
    cy.url().should('include', 'home');
  });

  it('navigate to home page from upload page when clicking the logo', () => {
    cy.findByTestId('upload').click();
    cy.url().should('include', 'upload');
    cy.findByTestId('logo').click();
    cy.url().should('include', 'home');
  });

  it('navigate to home page from talk page when clicking the button of home', () => {
    cy.findByText('Field of Garden').click();
    cy.url().should('include', 'talk');
    cy.findByTestId('home').click();
    cy.url().should('include', 'home');
  });

  it('navigate to home page from talk page when clicking the button of home', () => {
    cy.findByText('Field of Garden').click();
    cy.url().should('include', 'talk');
    cy.findByTestId('logo').click();
    cy.url().should('include', 'home');
  });

  it('logout when clicking the button of logout', () => {
    cy.findByTestId('logout').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });
});
