// src/pages/MfaPage.ts
import { Selector, t } from 'testcafe';
import { waitForElementToAppear } from '../utils/Helper';

export class MfaPage {
  mfaHeadingText = Selector('h2').withText('Multi-Factor Authentication');
 


  get isMfaHeadingTextDisplayed() {
    return this.mfaHeadingText.exists;
  }
}
