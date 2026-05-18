import { test, expect } from '../../Fixtures/api.fixture';
import { logger } from '../../Util/Logger';
import testData from '../../test_data/login.json';

test.describe('TS-04: Verify the specific details (Type/ID) of the new account match the UI request via API.', () => {

  const accountId = testData.apiTestData.validAccountId;
  const wrongAccountId = testData.apiTestData.invalidAccountId;
  const customerId = testData.apiTestData.validCustomerId;

  test('TC-09: Check that a valid account ID returns the correct details', async ({ apiRequest }) => {

    const response = await apiRequest.get(`accounts/${accountId}`);
    expect(response.status()).toBe(200);

    const responseBody = await response.text();
    logger.info('Response from the server:\n' + responseBody);

    expect(responseBody).toContain(`<id>${accountId}</id>`);
    expect(responseBody).toContain(`<customerId>${customerId}</customerId>`);
  });

  test.fail('TC-10: Check that a wrong account ID gives an error response', async ({ apiRequest }) => {

    const response = await apiRequest.get(`accounts/${wrongAccountId}`);
    expect(response.status()).toBe(200);
  });

});
