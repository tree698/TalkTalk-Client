/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';

describe('Landers correctly', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.findByPlaceholderText('Your username').type('test');
    cy.findAllByPlaceholderText('Your password').type('12345');
    cy.findByText('Login').click();
  });

  it('display all drawings when click AllDrawing button', () => {
    cy.findByText('All Drawings').click();
    cy.url().should('include', 'alldrawings');
    cy.findByText('My friedn').should('exist');
    cy.findByText('Field of Garden').should('exist');
  });

  it('display my drawings when click MyDrawing button', () => {
    cy.findByText('My Drawings').click();
    cy.url().should('include', 'mydrawings');
    cy.findByText('My friedn').should('exist');
  });

  it('display the result of search when click search button', () => {
    cy.findByPlaceholderText('Search...').type('Garden');
    cy.findByText('Field of Garden').should('exist');
  });

  it('display more drawings or message when clicking view more button', () => {
    cy.findByText('View More').click();
    cy.findByText('No more drawings').should('exist');
  });
});
