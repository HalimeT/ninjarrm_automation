import { Selector, t } from 'testcafe';
import { waitForElementToAppear } from '../utils/Helper';

export class MfaPage {
  mfaHeadingText = Selector('.css-1066lcq eo7gr5w2').child('.css-1hie37q eo7gr5w0');
  mfaMessage = Selector('span').withText('Your account requires you to configure at least one form of MFA. Please select a PRIMARY MFA method below.');

  async isMfaHeadingTextDisplayed() {
    await waitForElementToAppear(this.mfaHeadingText, 3000, t);
    return await t.expect(this.mfaHeadingText.exists).ok('Element does not exist');
  }

  async isMfaMessageDisplayed() {
    await waitForElementToAppear(this.mfaMessage, 3000, t);
    await t.expect(this.mfaMessage.exists).ok('MFA message is not displayed');
  }
}