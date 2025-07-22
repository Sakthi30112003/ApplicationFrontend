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
    clientId: '9bdb2c88-630c-4314-ae11-3f57379c6b87',
    authority: 'https://login.microsoftonline.com/b41b72d0-4e9f-4c26-8a69-f949f367c91d',
    redirectUri: 'https://azurefronendapplication-fhc0a0dygmgsbbam.canadacentral-01.azurewebsites.net',
     postLogoutRedirectUri: 'https://azurefronendapplication-fhc0a0dygmgsbbam.canadacentral-01.azurewebsites.net/',
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
    scopes: ['api://f5ce4693-a450-4ba9-852d-e0db1a6b248a/access_as_user'],

  },
};
