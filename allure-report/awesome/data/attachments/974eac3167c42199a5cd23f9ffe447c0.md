# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API\customerAccount.spec.ts >> TS-03: Verify the GET Accounts list retrieves the account created in the UI. >> TC-12: Check that a wrong customer ID gives an error response
- Location: tests\API\customerAccount.spec.ts:21:8

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 400
```

# Test source

```ts
  1  | import { test, expect } from '../../Fixtures/api.fixture';
  2  | import { logger } from '../../Util/Logger';
  3  | import testData from '../../test_data/login.json';
  4  | 
  5  | test.describe('TS-03: Verify the GET Accounts list retrieves the account created in the UI.', () => {
  6  | 
  7  |   const customerId = testData.apiTestData.validCustomerId;
  8  |   const wrongCustomerId = testData.apiTestData.invalidCustomerId;
  9  | 
  10 |   test('TC-11: Check that we can get all accounts for a valid customer', async ({ apiRequest }) => {
  11 | 
  12 |     const res = await apiRequest.get(`customers/${customerId}/accounts`);
  13 |     expect(res.status()).toBe(200);
  14 | 
  15 |     const body = await res.text();
  16 |     logger.info('Response from the server:\n' + body);
  17 | 
  18 |     expect(body).toContain(`<customerId>${customerId}</customerId>`);
  19 |   });
  20 | 
  21 |   test.fail('TC-12: Check that a wrong customer ID gives an error response', async ({ apiRequest }) => {
  22 |     const res = await apiRequest.get(`customers/${wrongCustomerId}/accounts`);
> 23 |     expect(res.status()).toBe(200);
     |                          ^ Error: expect(received).toBe(expected) // Object.is equality
  24 |   });
  25 | 
  26 | });
  27 | 
```