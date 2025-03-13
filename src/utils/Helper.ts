import { Selector } from 'testcafe';

// Helper function to wait for an element to appear
export async function waitForElementToAppear(selector: Selector, timeout: number = 5000, testController: TestController) {
    // Use the 'testController' (which is 't') to check if the element exists within the specified timeout
    await testController.expect(selector.exists).ok(`Element did not appear within ${timeout}ms`, { timeout });
}
