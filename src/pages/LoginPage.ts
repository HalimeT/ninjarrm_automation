import { Selector, t } from 'testcafe';
import { waitForElementToAppear } from '../utils/Helper';

export class LoginPage {
  usernameField = Selector('input[name="email"]');
  passwordField = Selector('input[name="password"]');
  loginButton = Selector('button').withText('Sign In');
  errorMessage1 = Selector('.alert.alert-danger').withText('Invalid username/password. Please contact your system administrator for assistance.');

  async setUsername(username: string) {
    await t.typeText(this.usernameField, username);
  }

  async setPassword(password: string) {
    await t.typeText(this.passwordField, password);
  }

  async clickLoginButton() {
    await t.click(this.loginButton);
  }

  async getErrorMessage1() {
    return this.errorMessage1.innerText;
  }

  async clearUsername() {
    await t.selectText(this.usernameField).pressKey('delete');
  }

  async clearPassword() {
    await t.selectText(this.passwordField).pressKey('delete');
  }
}