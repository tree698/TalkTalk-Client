/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';
import { findByTestId } from '@testing-library/react';

describe('Landers correctly', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('display typed message correctly', () => {
    cy.findByPlaceholderText('Your username').type('test');
    cy.findAllByPlaceholderText('Your password').type('12345');
    cy.findByText('Login').click();
    cy.findByText('Field of Garden').click();
    cy.findByTestId('input-tweet').type('I am test');
    cy.findByTestId('submit-tweet').click();
    cy.findByText('I am test').should('exist');
    cy.findByText('just now').should('exist');
    cy.findByText('1').should('exist');
  });

  it('display filtered message and all message by clicking avatar and button, respectedly', () => {
    cy.findByPlaceholderText('Your username').type('Julie');
    cy.findAllByPlaceholderText('Your password').type('12345');
    cy.findByText('Login').click();
    cy.findByText('Field of Garden').click();
    cy.findByTestId('input-tweet').type('I am Julie');
    cy.findByTestId('submit-tweet').click();
    cy.get('[data-testid="tweet-owner"]').within(() => {
      cy.get('img[alt="Julie"]').click();
    });
    cy.findByText('I am test').should('not.exist');
    cy.findByTestId('allTalks').click();
    cy.findByText('I am test').should('exist');
  });
});
