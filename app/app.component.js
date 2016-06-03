"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var angular2_google_maps_1 = require('./vendor/angular2-google-maps');
var GoogleMapComponent = (function () {
    function GoogleMapComponent() {
        this.lat = 51.522081;
        this.lng = 5.118985;
        this.zoom = 16;
        this.maptype = 'Beeksebergen';
        this.locations = [
            { id: '1', lat: 51.5239935252832, lng: 5.137663903579778, content: 'Kids Jungalow (5p)' },
            { id: '2', lat: 51.523853342911906, lng: 5.1377765563584035, content: 'Kids Jungalow (5p)' },
            { id: '3', lat: 51.5237298485607, lng: 5.137969675407476, content: 'Kids Jungalow (5p)' },
            { id: '4', lat: 51.52355628836575, lng: 5.138066234932012, content: 'Kids Jungalow (5p)' },
            { id: '5', lat: 51.52340275379578, lng: 5.138211074218816, content: 'Kids Jungalow (5p)' },
            { id: '6', lat: 51.523199152806626, lng: 5.138382735595769, content: 'Kids Jungalow (5p)' },
            { id: '7', lat: 51.5229955509073, lng: 5.138511481628484, content: 'Kids Jungalow (5p)' },
            { id: '8', lat: 51.52280529912936, lng: 5.138543668136663, content: 'Kids Jungalow (5p)' },
            { id: '9', lat: 51.523596340777075, lng: 5.138463201866216, content: 'Kids Jungalow (5p)' },
            { id: '700', lat: 51.523372714362736, lng: 5.1386992362595265, content: 'Kids Jungalow (5p)' },
            { id: '101', lat: 51.52329594683302, lng: 5.138838711128301, content: 'Kids Jungalow Giraffe' }
        ];
        this.mapTypeControlOptions = {
            mapTypeIds: ['Beeksebergen']
        };
        this.imageMapOptions = {
            getTileUrl: function (coord, zoom) {
                return "http://www.sylvanreinieren.com/tiles/" + zoom + "/" + coord.x + "/" + coord.y + ".jpg";
            },
            tileSize: { height: 256, width: 256 },
            maxZoom: 18,
            minZoom: 16,
            radius: 1738000,
            name: 'Beeksebergen'
        };
    }
    GoogleMapComponent.prototype.updateDiv = function (location, infoWindow) {
        var _this = this;
        console.log(location);
        this.selectedLocation = location;
        this.isClicked = true;
        this.ID = location.id;
        this.content = location.content;
        $(function () {
            $('.gm-style-iw').parent().append('<div class="test">' +
                '<span class="content">' +
                '<span class="ID">' + _this.ID + '</span>' +
                '<span class="content-infowindow">' + _this.content + '</span>' +
                '</span>' +
                '</div>');
        });
        if (this.lastClicked && this.lastClicked !== infoWindow) {
            this.lastClicked.close();
        }
        this.lastClicked = infoWindow;
        setTimeout(function () {
            //     $('.result-number').css('color', 'red');
            //     $('div.sebm-google-map-info-window-content').find('#0').css('color', 'blue')
        }, 0);
    };
    GoogleMapComponent.prototype.mapClicked = function ($event) {
        this.isClicked = false;
        if (this.lastClicked) {
            this.lastClicked.close();
            this.lastClicked = null;
        }
    };
    GoogleMapComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'map',
            directives: [angular2_google_maps_1.ANGULAR2_GOOGLE_MAPS_DIRECTIVES, angular2_google_maps_1.SebmGoogleMap, angular2_google_maps_1.SebmGoogleMapMarker, angular2_google_maps_1.SebmGoogleMapOverlayView],
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], GoogleMapComponent);
    return GoogleMapComponent;
}());
exports.GoogleMapComponent = GoogleMapComponent;
