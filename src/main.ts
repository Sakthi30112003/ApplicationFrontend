import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {
  MsalService,
  MsalGuard,
  MsalInterceptor,
  MsalBroadcastService,
  MSAL_INSTANCE,
  MSAL_GUARD_CONFIG,
  MSAL_INTERCEPTOR_CONFIG,
} from '@azure/msal-angular';
import { InteractionType } from '@azure/msal-browser';
import { msalInstance, msalAngularConfig } from './app/msal.config';

// Define protected resources
const protectedResourceMap = new Map<string, Array<string>>([
  ['https://graph.microsoft.com/v1.0/me', ['user.read']],
]);

msalInstance.initialize().then(() => {
  bootstrapApplication(AppComponent, {
    ...appConfig,
    providers: [
          provideRouter(routes),
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
      MsalBroadcastService,
    ],
  }).catch(err => console.error(err));
});
