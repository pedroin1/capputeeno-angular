import {
  ApplicationConfig,
  provideZoneChangeDetection,
  inject,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { GlobalConfig, provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { provideAnimations } from '@angular/platform-browser/animations';

const toastrConfig: Partial<GlobalConfig> = {
  timeOut: 10000,
  preventDuplicates: true,
  progressBar: true,
  positionClass: 'toast-top-center',
};

const apolloConfig = () => {
  const httpLink = inject(HttpLink);

  return {
    link: httpLink.create({
      uri: 'http://localhost:3333/?',
    }),
    cache: new InMemoryCache(),
  };
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimations(), // required animations providers
    provideToastr(toastrConfig),
    provideApollo(apolloConfig),
  ],
};
