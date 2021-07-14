// eslint-disable-next-line import/no-extraneous-dependencies
import 'cypress-file-upload';
import { BASE_URL } from '../mocks/shared';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'cypress-wait-until';

Cypress.Commands.add(
  'login',
  function ({ email = 'user@mail.com', password = 'qwerty' }) {
    cy.intercept('GET', '*api/user', {
      fixture: 'user/current-user.json',
    }).as('preloadCurrentUser');

    cy.request({
      method: 'POST',
      url: `${BASE_URL}/api/login`,
      body: {
        email,
        password,
      },
    })
      .its('body')
      .then(body =>
        cy
          .window()
          .its('sessionStorage')
          .invoke('setItem', 'authData', JSON.stringify(body.tokenData)),
      );

    cy.visit('/system/dashboard/schedule/day');
    cy.wait('@preloadCurrentUser');
  },
);

Cypress.Commands.add('logout', function () {
  cy.window().its('localStorage').invoke('clear');
  cy.window().its('sessionStorage').invoke('clear');
});
