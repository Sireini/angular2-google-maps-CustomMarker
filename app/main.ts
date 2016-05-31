import {provide} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';

import {ANGULAR2_GOOGLE_MAPS_PROVIDERS, LazyMapsAPILoaderConfig} from 'angular2-google-maps';

import {GoogleMapComponent} from './app.component';

bootstrap(GoogleMapComponent, [
  ANGULAR2_GOOGLE_MAPS_PROVIDERS,
  provide(LazyMapsAPILoaderConfig,
          {
            useFactory: () => {
              let config = new LazyMapsAPILoaderConfig();
              config.apiKey = 'AIzaSyCqkkQeSmgHXci2cHDnGU9RTgXP3FONdcE';
              return config;
            }
          })
]);
