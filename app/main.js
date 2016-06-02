"use strict";
var core_1 = require('@angular/core');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var angular2_google_maps_1 = require('./vendor/angular2-google-maps');
var app_component_1 = require('./app.component');
platform_browser_dynamic_1.bootstrap(app_component_1.GoogleMapComponent, [
    angular2_google_maps_1.ANGULAR2_GOOGLE_MAPS_PROVIDERS,
    core_1.provide(angular2_google_maps_1.LazyMapsAPILoaderConfig, {
        useFactory: function () {
            var config = new angular2_google_maps_1.LazyMapsAPILoaderConfig();
            config.apiKey = 'AIzaSyCqkkQeSmgHXci2cHDnGU9RTgXP3FONdcE';
            return config;
        }
    })
]);
