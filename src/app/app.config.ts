import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
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

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

const protectedResourceMap = new Map<string, string[]>([
 ['https://azurepracwebapp-abgegahdakaebff7.canadacentral-01.azurewebsites.net/api',['api://f5ce4693-a450-4ba9-852d-e0db1a6b248a/access_as_user']]
]);

export const appConfig: ApplicationConfig = {
 providers: [
   provideBrowserGlobalErrorListeners(),
   provideZoneChangeDetection({ eventCoalescing: true }),
   provideRouter(routes), 
   provideClientHydration(withEventReplay()),
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