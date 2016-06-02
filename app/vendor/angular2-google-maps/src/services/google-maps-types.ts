export var google: any;

export interface GoogleMap {
  mapTypes: MapTypeRegistry;
  constructor(el: HTMLElement, opts?: MapOptions): void;
  panTo(latLng: LatLng|LatLngLiteral): void;
  setZoom(zoom: number): void;
  addListener(eventName: string, fn: Function): void;
  getCenter(): LatLng;
  setCenter(latLng: LatLng|LatLngLiteral): void;
  getZoom(): number;
  setOptions(options: MapOptions): void;
}

export interface LatLng {
  constructor(lat: number, lng: number): void;
  lat(): number;
  lng(): number;
}

export interface Marker {
  constructor(options?: MarkerOptions): void;
  setMap(map: GoogleMap): void;
  setPosition(latLng: LatLng|LatLngLiteral): void;
  setTitle(title: string): void;
  setLabel(label: string|MarkerLabel): void;
  setDraggable(draggable: boolean): void;
  setIcon(icon: string): void;
  getLabel(): MarkerLabel;
  addListener(eventType: string, fn: Function): void;
}

export interface MarkerOptions {
  position: LatLng|LatLngLiteral;
  title?: string;
  map?: GoogleMap;
  label?: string|MarkerLabel;
  draggable?: boolean;
  icon?: string;
}

export interface MarkerLabel {
  color: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  text: string;
}

export interface OverlayView {
  constructor(): void;
  setMap(map: GoogleMap): void;
  draw() : void;
  onAdd() : void;
  onRemove() : void;
  //setPosition(latLng: LatLng|LatLngLiteral): void;
  
  // setTitle(title: string): void;
  // setLabel(label: string|MarkerLabel): void;
  // setDraggable(draggable: boolean): void;
  // setIcon(icon: string): void;
  // getLabel(): MarkerLabel;
  addListener(eventType: string, fn: Function): void;
}

export interface LatLngLiteral {
  lat: number;
  lng: number;
}

export interface MouseEvent { latLng: LatLng; }

export interface MapOptions {
  center?: LatLng|LatLngLiteral;
  zoom?: number;
  disableDoubleClickZoom?: boolean;
  disableDefaultUI?: boolean;
  backgroundColor?: string;
  draggableCursor?: string;
  draggingCursor?: string;
  keyboardShortcuts?: boolean;
  zoomControl?: boolean;
  mapTypeId?: string;
  mapTypeControlOptions?: MapTypeControlOptions;
}

export interface InfoWindow {
  constructor(opts?: InfoWindowOptions): void;
  close(): void;
  getContent(): string|Node;
  getPosition(): LatLng;
  getZIndex(): number;
  open(map?: GoogleMap, anchor?: MVCObject): void;
  setContent(content: string|Node): void;
  setOptions(options: InfoWindowOptions): void;
  setPosition(position: LatLng|LatLngLiteral): void;
  setZIndex(zIndex: number): void;
}

export interface MVCObject { constructor(): void; }

export interface Size {
  height: number;
  width: number;
  constructor(width: number, height: number, widthUnit?: string, heightUnit?: string): void;
  equals(other: Size): boolean;
  toString(): string;
}

export interface InfoWindowOptions {
  content?: string|Node;
  disableAutoPan?: boolean;
  maxWidth?: number;
  pixelOffset?: Size;
  position?: LatLng|LatLngLiteral;
  zIndex?: number;
}

export interface MapTypeRegistry { set(id: string, mapType: any): void; }

export interface MapTypeControlOptions { mapTypeIds: string[]; }

export interface ImageMapTypeCoord {
  x: number;
  y: number;
}
export interface ImageMapTypeTileSize {
  height: number;
  width: number;
}

export interface ImageMapTypeOptions {
  tileSize?: ImageMapTypeTileSize;
  maxZoom: number;
  minZoom: number;
  radius: number;
  name: string;
  alt?: string;
  getTileUrl(coord: ImageMapTypeCoord, zoom: number): string;
}

export class OverlayViewBla {
  public latlng : any;
  id: number;
  overlayView: any;
  
  constructor(options: any, google: any) {
    this.latlng = new google.maps.LatLng(options.position.lat, options.position.lng);
    
    this.overlayView = new google.maps.OverlayView();
    
    var self = this;
    this.overlayView.draw = function() {
      var div = this.div;
      
      if (!div) {
      
        div = this.div = document.createElement('div');
        
        div.className = 'marker';
        
        div.style.position = 'absolute';
        div.style.cursor = 'pointer';
        div.style.width = '20px';
        div.style.height = '20px';
        div.style.background = 'blue';
        
        // if (typeof(self.id) !== 'undefined') {
        //   div.dataset.marker_id = self.id;
        // }

        google.maps.event.addDomListener(div, "click", function(event: any) {
          google.maps.event.trigger(self, "click");
        });
        
        var panes = this.getPanes();
        panes.overlayImage.appendChild(div);
      }
      
      var point = this.getProjection().fromLatLngToDivPixel(self.latlng);
      
      if (point) {
        div.style.left = (point.x - 10) + 'px';
        div.style.top = (point.y) + 'px';
      }
    }
  }
  
  getOverlayView() : any {
      return this.overlayView;
    }
}