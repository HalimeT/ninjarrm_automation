import { LoginPage } from '../pages/LoginPage';
import { config } from '../config';
import * as fs from 'fs';
import { MfaPage } from '../pages/MfaPage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { ClientFunction } from 'testcafe';
import { ERROR_MESSAGES, URL_CONTAINS } from '../constants';
import { ResetPasswordPage } from '../pages/ResetPasswordPage';

fixture `Login Page Tests`
  .page(config.loginUrl)
  .beforeEach(async t => {
    await t.setTestSpeed(0.80);
  })

const testData = JSON.parse(fs.readFileSync('src/data.json', 'utf-8'));
const loginPage = new LoginPage();
const mfaPage = new MfaPage();
const registerPage = new RegistrationPage();
const resetPassPage = new ResetPasswordPage();
const getUrl = ClientFunction(() => window.location.href);

test('Login Page: Content and Fields', async t => {
    await t.expect(getUrl()).contains(URL_CONTAINS.LOGIN, 'URL does not contain "/login"');
    await t.expect(loginPage.isLogoDisplayed).ok('Logo is not displayed');
    await t.expect(loginPage.isEmailFieldDisplayed).ok('Email field is not displayed');
    await t.expect(loginPage.isPasswordFieldDisplayed).ok('Password field is not displayed');
    await t.expect(loginPage.isKeepMeSignedInCheckboxDisplayed).ok('"Keep Me Signed In" checkbox is not displayed')
    await t.expect(loginPage.isSignInButtonDisplayed).ok('"Sign In" Button is not displayed');
    await t.expect(loginPage.isDoNotHaveAnAccountHyperLinkDisplayed).ok('"Do not have an account?" is not displayed');
    await t.expect(loginPage.isForgotYourPasswordHyperLinkDisplayed).ok('"Forgot your password?" is not displayed');
    
   });

test('Login Page: User entered valid data and validation is passed.', async t => {
  await loginPage.setUsername(config.credentials.validUser);
  await loginPage.setPassword(config.credentials.validPassword);
  await loginPage.clickLoginButton();
  await t.expect(mfaPage.isMfaHeadingTextDisplayed).ok('MFA Page title is not displayed');
 
});

test('Login Page: User entered invalid data and validation is failed', async t => {
  for (const { username, password } of testData) {
    await loginPage.setUsername(username);
    await loginPage.setPassword(password);
    await loginPage.clickLoginButton();
    const errorMessage1 = await loginPage.getErrorMessage1();
    await t.expect(errorMessage1).eql(ERROR_MESSAGES.INVALID_CREDENTIALS);
    await loginPage.clearEmail();
    await loginPage.clearPassword();
  }
});

  test('Login Page: Clicking "Do not have an account?" Hyperlink ', async t => {

    await loginPage.clickOnDoNotHaveAnAccountHyperLink();
    await t.expect(getUrl()).contains(URL_CONTAINS.REGISTER, 'URL does not contain "/register"');
    await t.expect(registerPage.isRegistrationHeadingTextDisplayed).ok('Registration title is not displayed');

});

test('Login Page: Clicking "Forgot your password?" Hyperlink ', async t => {

    await loginPage.clickOnForgotYourPasswordHyperLink();
    await t.expect(getUrl()).contains(URL_CONTAINS.RESET_PASSWORD, 'URL does not contain "/resetPassword"');
    await t.expect(resetPassPage.isVerifyIdentityByLabelDisplayed).ok('"Verify identity By" label is not displayed');

});