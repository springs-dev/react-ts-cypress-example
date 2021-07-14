import BasePO from '../BasePO';

export default class AuthPO extends BasePO {
  visit() {
    cy.visit('/login');
  }

  preload() {
    cy.intercept('POST', '*api/login').as('preloadLogin');
  }

  preloadWait() {
    cy.wait(['@preloadLogin']);
  }

  loginUI({ email = 'user@mail.com', password = 'qwerty' }) {
    cy.visit('/login');
    this.getInput('email').type(email);
    this.getInput('password').type(password);

    cy.intercept('POST', '*api/login').as('preloadLogin');
    cy.intercept('GET', '*api/user', {
      fixture: 'user/current-user.json',
    }).as('preloadCurrentUser');

    this.getButton('login').click();

    cy.wait('@preloadLogin');
    cy.wait('@preloadCurrentUser');
  }

  logoutUI() {
    this.getButton('menu').click();
    this.getButton('logout').click();
  }
}
