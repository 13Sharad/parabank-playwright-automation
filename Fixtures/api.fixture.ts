import { test as base, expect, request as playwrightRequest, APIRequestContext } from '@playwright/test';
import testData from '../test_data/login.json';
import { API_CONFIG } from '../config/api.config';

type ApiFixtures = {
  apiRequest: APIRequestContext;
};

export const test = base.extend<ApiFixtures>({
  apiRequest: async ({}, use) => {

    const session = await playwrightRequest.newContext({
      baseURL: API_CONFIG.baseUrl,
      extraHTTPHeaders: {
        Accept: 'application/xml',
      },
    });


    await session.post('https://parabank.parasoft.com/parabank/login.htm', {
      form: { 
        username: testData.validUser.username, 
        password: testData.validUser.password 
      },
    });

    await use(session);
    await session.dispose();
  },
});

export { expect };
