import { test, expect } from '../../Fixtures/api.fixture';
import { logger } from '../../Util/Logger';
import testData from '../../test_data/login.json';

test.describe('TS-03: Verify the GET Accounts list retrieves the account created in the UI.', () => {

  const customerId = testData.apiTestData.validCustomerId;
  const wrongCustomerId = testData.apiTestData.invalidCustomerId;

  test('TC-11: Check that we can get all accounts for a valid customer', async ({ apiRequest }) => {

    const res = await apiRequest.get(`customers/${customerId}/accounts`);
    expect(res.status()).toBe(200);

    const body = await res.text();
    logger.info('Response from the server:\n' + body);

    expect(body).toContain(`<customerId>${customerId}</customerId>`);
  });

  test.fail('TC-12: Check that a wrong customer ID gives an error response', async ({ apiRequest }) => {
    const res = await apiRequest.get(`customers/${wrongCustomerId}/accounts`);
    expect(res.status()).toBe(200);
  });

});
