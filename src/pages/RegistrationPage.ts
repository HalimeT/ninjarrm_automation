import { Selector, t } from 'testcafe';
import { waitForElementToAppear } from '../utils/Helper';

export class RegistrationPage {
  registrationHeadingText = Selector('h2').withText('Registration');
 


  get isRegistrationHeadingTextDisplayed() {
    return this.registrationHeadingText.exists;
  }
}