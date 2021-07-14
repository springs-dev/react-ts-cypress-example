import LoginPO from '../../pageObjects/auth/LoginPO';
import {
  POSITIVE_DATA,
  NEGATIVE_DATA,
  ALERT_ERROR_MESSAGE,
} from '../../mocks/auth';

describe('Testing login page', () => {
  let builder;

  before(function () {
    builder = new LoginPO();
  });

  it('Should login user and have dashboard screen', function () {
    builder.loginUI({
      email: POSITIVE_DATA.email,
      password: POSITIVE_DATA.password,
    });
    cy.logout();
  });

  it('Should not login', function () {
    builder.preload();
    builder.visit();

    builder.getInput('email').type(NEGATIVE_DATA.email);
    builder.getInput('password').type(NEGATIVE_DATA.password);

    builder.getButton('login').click();

    builder.preloadWait();

    builder.getAlert('error').should('contain', ALERT_ERROR_MESSAGE);

    builder.onRoute('/login');
  });
});
