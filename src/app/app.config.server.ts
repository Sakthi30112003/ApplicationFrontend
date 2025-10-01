// app.config.server.ts

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  HTTP_INTERCEPTORS
} from '@angular/common/http';

import {
  MSAL_INSTANCE,
  MSAL_GUARD_CONFIG,
  MSAL_INTERCEPTOR_CONFIG,
  MsalService,
  MsalInterceptor,
  MsalBroadcastService,
  MsalGuard
} from '@azure/msal-angular';

import { InteractionType } from '@azure/msal-browser';
import { msalInstance, msalAngularConfig } from './msal.config';

const protectedResourceMap = new Map<string, string[]>([
  ['https://applicationbackend-cpazegbufnhaenae.canadacentral-01.azurewebsites.net/api',['api://9536cbf5-1a05-481d-a2f5-28e259c1f9a8/access_as_user']]
]);

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),

    { provide: MSAL_INSTANCE, useValue: msalInstance },
    { provide: MSAL_GUARD_CONFIG, useValue: msalAngularConfig },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useValue: {
        interactionType: InteractionType.Redirect,
        protectedResourceMap,
      },
    },
    { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true },

    MsalService,
    MsalGuard,
    MsalBroadcastService
  ]
};
