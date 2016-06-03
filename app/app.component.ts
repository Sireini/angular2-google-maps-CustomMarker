import {Component} from '@angular/core';

import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES, 
        MapTypeId, 
        MapTypeControlOptions, 
        ImageMapTypeOptions,
        SebmGoogleMap,
        SebmGoogleMapMarker,
        SebmGoogleMapOverlayView,
        SebmGoogleMapInfoWindow, 
        ImageMapTypeCoord, 
        GoogleMapsAPIWrapper} from './vendor/angular2-google-maps';
        
export var google: any;

@Component({
  moduleId: module.id,
  selector: 'map',
  directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES, SebmGoogleMap, SebmGoogleMapMarker, SebmGoogleMapOverlayView],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class GoogleMapComponent {
  lat: number = 51.522081;
  lng: number = 5.118985;
  zoom: number = 16;
  maptype: string = 'Beeksebergen';
  isClicked: boolean;
  selectedLocation: marker;
  ID: string;
  content: string;
  lastClicked: SebmGoogleMapInfoWindow;
  
  locations: marker[] = [
    {id: '1',  lat: 51.5239935252832,    lng:  5.137663903579778,   content: 'Kids Jungalow (5p)'},
    {id: '2',  lat: 51.523853342911906,  lng:  5.1377765563584035,  content: 'Kids Jungalow (5p)'},
    {id: '3',  lat: 51.5237298485607,    lng:  5.137969675407476,   content: 'Kids Jungalow (5p)'},
    {id: '4',  lat: 51.52355628836575,   lng:  5.138066234932012,   content: 'Kids Jungalow (5p)'},
    {id: '5',  lat: 51.52340275379578,   lng:  5.138211074218816,   content: 'Kids Jungalow (5p)'},
    {id: '6',  lat: 51.523199152806626,  lng:  5.138382735595769,   content: 'Kids Jungalow (5p)'},
    {id: '7',  lat: 51.5229955509073,    lng:  5.138511481628484,   content: 'Kids Jungalow (5p)'},
    {id: '8',  lat: 51.52280529912936,   lng:  5.138543668136663,   content: 'Kids Jungalow (5p)'},
    {id: '9',  lat: 51.523596340777075,  lng:  5.138463201866216,   content: 'Kids Jungalow (5p)'},
    {id: '700',lat: 51.523372714362736,  lng:  5.1386992362595265,  content: 'Kids Jungalow (5p)'},
    {id: '101', lat: 51.52329594683302,  lng:  5.138838711128301,   content: 'Kids Jungalow Giraffe'}
];
  
  imageMapOptions : ImageMapTypeOptions;
  
  constructor(){
    this.imageMapOptions = {
      getTileUrl: (coord: ImageMapTypeCoord, zoom: number) => {
        return `http://www.sylvanreinieren.com/tiles/${zoom}/${coord.x}/${coord.y}.jpg`
      },
      tileSize: { height: 256, width: 256 },
      maxZoom: 18,
      minZoom: 16,
      radius: 1738000,
      name: 'Beeksebergen'
    };    
  }
  mapTypeControlOptions: MapTypeControlOptions = {
    mapTypeIds: ['Beeksebergen']
  };
  
  updateDiv(location: marker, infoWindow:SebmGoogleMapInfoWindow) {
    console.log(location);
    this.selectedLocation = location;
    this.isClicked = true;
    this.ID = location.id;
    this.content = location.content;
    
   $(() => {
      $('.gm-style-iw').parent().append(
        '<div class="test">'+
          '<span class="content">'+
            '<span class="ID">'+ this.ID + '</span>'+
            '<span class="content-infowindow">' + this.content + '</span>'+
          '</span>'+
        '</div>');      
    });
             
    if (this.lastClicked && this.lastClicked !== infoWindow){
        this.lastClicked.close();
    }
    
    this.lastClicked = infoWindow;
      
    setTimeout(function() {
      
    //     $('.result-number').css('color', 'red');
    //     $('div.sebm-google-map-info-window-content').find('#0').css('color', 'blue')
    }, 0);  
}

  mapClicked($event: MouseEvent) {
        this.isClicked = false;
        
        if(this.lastClicked) {
            this.lastClicked.close();
            this.lastClicked = null;
        }
    }
}

interface marker {
  id: string;
  lat: number;
  lng: number;
  content: string;
}