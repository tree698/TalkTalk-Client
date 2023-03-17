/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';

describe('Landers correctly', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.findByPlaceholderText('Your username').type('test');
    cy.findAllByPlaceholderText('Your password').type('12345');
    cy.findByText('Login').click();
  });

  it('navigate to upload page', () => {
    cy.findByTestId('upload').click();
    cy.url().should('include', '/upload');
  });

  it('display title, input tag, button', () => {
    cy.findByTestId('upload').click();
    cy.url().should('include', '/upload');
    cy.findByText('Upload your drawing').should('exist');
    cy.findByText('Drag & Drop Here or Click Here').should('exist');
    cy.findByText('Title').should('exist');
    cy.findByText('Brush').should('exist');
    cy.findByText('Say something').should('exist');
    cy.findByPlaceholderText('Title').should('exist');
    cy.findByPlaceholderText('(Optional) Brush').should('exist');
    cy.findByPlaceholderText('(Optional) Say something').should('exist');
    cy.findByText('Submit').should('exist');
  });
});
