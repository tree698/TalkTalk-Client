/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';

describe('renders correctly', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('display logo', () => {
    cy.findByAltText('logo').should('exist');
  });

  it('display sub-title', () => {
    cy.findByText('Upload drawing, then enjoy talking').should('exist');
  });

  it('display carosel', () => {
    cy.findAllByRole('img').should('exist');
  });

  it('display login sub-page', () => {
    cy.findByText('Welcome Back').should('exist');
    cy.findByText('Username').should('exist');
    cy.findByText('Password').should('exist');
    cy.findByText('SIGN UP').should('exist');
    cy.findByText('Login').should('exist');
    cy.findAllByRole('button').should('exist');
  });
});
