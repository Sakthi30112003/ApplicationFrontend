import { PublicClientApplication, LogLevel, Configuration } from '@azure/msal-browser';
import { InteractionType } from '@azure/msal-browser';

// Optionally: define the structure of Angular config
interface AngularMsalConfig {
  interactionType: InteractionType;
  authRequest: {
    scopes: string[];
  };
}

export const msalConfig: Configuration = {
  auth: {
    clientId: 'd82babdc-a17b-4637-9f60-67771708520f',
    authority: 'https://login.microsoftonline.com/b41b72d0-4e9f-4c26-8a69-f949f367c91d',
    redirectUri: 'https://appfrontend-befph7ckbeb0euac.canadacentral-01.azurewebsites.net',
     postLogoutRedirectUri: 'https://appfrontend-befph7ckbeb0euac.canadacentral-01.azurewebsites.net/',
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      logLevel: LogLevel.Info,
    },
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);

export const msalAngularConfig: AngularMsalConfig = {
  interactionType: InteractionType.Redirect,
  authRequest: {
    scopes: [''],

  },
};
