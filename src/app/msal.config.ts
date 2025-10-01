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
    clientId: '',
    authority: '',
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
    scopes: [''],

  },
};
