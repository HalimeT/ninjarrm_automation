import { Selector, t } from 'testcafe';
import { waitForElementToAppear } from '../utils/Helper';

export class LoginPage {
  emailField = Selector('input[name="email"]');
  passwordField = Selector('input[name="password"]');
  signInButton = Selector('button').withText('Sign In');
  errorMessage1 = Selector('.alert.alert-danger').withText('Invalid username/password. Please contact your system administrator for assistance.');
  doNotHaveAnAccountHyperLink = Selector('a').withText('Do not have an account?');
  forgotYourPasswordHyperLink = Selector('a').withText('Forgot your password?');
  logo = Selector('img[alt="logo"]');
  keepMeSignedInCheckbox = Selector('#staySignedIn');

  async setUsername(username: string) {
    await t.typeText(this.emailField, username);
  }

  async setPassword(password: string) {
    await t.typeText(this.passwordField, password);
  }

  async clickLoginButton() {
    await t.click(this.signInButton);
  }

  async getErrorMessage1() {
    return this.errorMessage1.innerText;
  }

  async clearEmail() {
    await t.selectText(this.emailField).pressKey('delete');
  }

  async clearPassword() {
    await t.selectText(this.passwordField).pressKey('delete');
  }

  async clickOnDoNotHaveAnAccountHyperLink() {
    await t.click(this.doNotHaveAnAccountHyperLink);
  }

  async clickOnForgotYourPasswordHyperLink() {
    await t.click(this.forgotYourPasswordHyperLink);
  }

  get isLogoDisplayed() {
    return this.logo.exists;
  }

  get isEmailFieldDisplayed() {
    return this.emailField.exists;
  }

  get isPasswordFieldDisplayed() {
    return this.passwordField.exists;
  }

  get isSignInButtonDisplayed(){
    return this.signInButton.exists;
  }

  get isKeepMeSignedInCheckboxDisplayed(){
    return this.keepMeSignedInCheckbox.exists;
  }


  get isForgotYourPasswordHyperLinkDisplayed(){
    return this.forgotYourPasswordHyperLink.exists;
  }

  get isDoNotHaveAnAccountHyperLinkDisplayed(){
    return this.doNotHaveAnAccountHyperLink.exists;
  }

}