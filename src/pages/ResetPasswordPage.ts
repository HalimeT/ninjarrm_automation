import { Selector, t } from 'testcafe';
import { waitForElementToAppear } from '../utils/Helper';

export class ResetPasswordPage {
  verifyIdentityByLabel = Selector('label').withText('Verify Identity By')
 


  get isVerifyIdentityByLabelDisplayed() {
    return this.verifyIdentityByLabel.exists;
  }
}