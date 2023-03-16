/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';
import { faker } from '@faker-js/faker';

const username = faker.internet.userName();
const email = faker.internet.email();
const password = faker.internet.password();

describe('Signup', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('navigate to signup page', () => {
    cy.findByText('SIGN UP').click();
    cy.url().should('include', 'signup');
  });

  it('renders correctly', () => {
    cy.findByText('SIGN UP').click();
    cy.findByText('Create an account').should('exist');
    cy.findAllByRole('textbox').should('have.length', 3);
    cy.findByText('Create account').should('exist');
    cy.findByText('Already have an account?').should('exist');
  });

  it('navigate to home when clicking signup button', () => {
    cy.findByText('SIGN UP').click();

    cy.findByPlaceholderText('Username (* Required)').type(username);
    cy.findByPlaceholderText('Email (* Required)').type(email);
    cy.findByPlaceholderText('Password (* Required)').type(password);

    cy.findByText('Create account').click();

    cy.url().should('include', 'login');
  });
});
