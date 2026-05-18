# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API\account_ID.spec.ts >> TS-04: Verify the specific details (Type/ID) of the new account match the UI request via API. >> TC-10: Check that a wrong account ID gives an error response
- Location: tests\API\account_ID.spec.ts:23:8

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
  5  | test.describe('TS-04: Verify the specific details (Type/ID) of the new account match the UI request via API.', () => {
  6  | 
  7  |   const accountId = testData.apiTestData.validAccountId;
  8  |   const wrongAccountId = testData.apiTestData.invalidAccountId;
  9  |   const customerId = testData.apiTestData.validCustomerId;
  10 | 
  11 |   test('TC-09: Check that a valid account ID returns the correct details', async ({ apiRequest }) => {
  12 | 
  13 |     const response = await apiRequest.get(`accounts/${accountId}`);
  14 |     expect(response.status()).toBe(200);
  15 | 
  16 |     const responseBody = await response.text();
  17 |     logger.info('Response from the server:\n' + responseBody);
  18 | 
  19 |     expect(responseBody).toContain(`<id>${accountId}</id>`);
  20 |     expect(responseBody).toContain(`<customerId>${customerId}</customerId>`);
  21 |   });
  22 | 
  23 |   test.fail('TC-10: Check that a wrong account ID gives an error response', async ({ apiRequest }) => {
  24 | 
  25 |     const response = await apiRequest.get(`accounts/${wrongAccountId}`);
> 26 |     expect(response.status()).toBe(200);
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  27 |   });
  28 | 
  29 | });
  30 | 
```