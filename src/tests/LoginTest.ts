import { LoginPage } from '../pages/LoginPage';
import { config } from '../config';
import * as fs from 'fs';
import { MfaPage } from '../pages/MfaPage';

fixture `Login Page Tests`
  .page(config.loginUrl)
  .beforeEach(async t => {
    await t.setTestSpeed(0.80);
  })

const testData = JSON.parse(fs.readFileSync('src/data.json', 'utf-8'));
const loginPage = new LoginPage();
const mfaPage = new MfaPage();

test('should login successfully with valid credentials', async t => {
  await loginPage.setUsername(config.credentials.validUser);
  await loginPage.setPassword(config.credentials.validPassword);
  await loginPage.clickLoginButton();
  await t.expect(mfaPage.isMfaHeadingTextDisplayed).ok('MFA Set Up title is displayed');
  await t.expect(mfaPage.isMfaMessageDisplayed).ok('MFA message did not displayed');
});

test('should show error for invalid credentials', async t => {
  for (const { username, password } of testData) {
    await loginPage.setUsername(username);
    await loginPage.setPassword(password);
    await loginPage.clickLoginButton();
    const errorMessage1 = await loginPage.getErrorMessage1();
    await t.expect(errorMessage1).eql('Invalid username/password. Please contact your system administrator for assistance.');
    await loginPage.clearUsername();
    await loginPage.clearPassword();
  }
});