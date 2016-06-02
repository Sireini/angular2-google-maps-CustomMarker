import {Directive, SimpleChange, OnDestroy, OnChanges, EventEmitter, ContentChild, AfterContentInit} from '@angular/core';

import {MouseEvent} from '../events';
import * as mapTypes from '../services/google-maps-types';
import {OverlayViewManager} from '../services/overlay-view-manager';
//import {MarkerManager} from '../services/marker-manager';
import {SebmGoogleMapInfoWindow} from './google-map-info-window';

let markerId = 0;

/**
 * SebmGoogleMapMarker renders a map marker inside a {@link SebmGoogleMap}.
 *
 * ### Example
 * ```typescript
 * import {Component} from 'angular2/core';
 * import {SebmGoogleMap, SebmGoogleMapMarker} from 'angular2-google-maps/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  directives: [SebmGoogleMap, SebmGoogleMapMarker],
 *  styles: [`
 *    .sebm-google-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <sebm-google-map-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
 *      </sebm-google-map-marker>
 *      <sebm-google-map-overlay-view [latitude]="lat" [longitude]="lng">
 *      </sebm-google-map-overlay-view>
 *    </sebm-google-map>
 *  `
 * })
 * ```
 */
@Directive({
  selector: 'sebm-google-map-overlay-view',
  inputs: ['latitude', 'longitude'],
  outputs: ['markerClick', 'dragEnd']
})
export class SebmGoogleMapOverlayView implements OnDestroy,
    OnChanges, AfterContentInit {
  /**
   * The latitude position of the marker.
   */
  latitude: number;

  /**
   * The longitude position of the marker.
   */
  longitude: number;

//   /**
//    * The title of the marker.
//    */
//   title: string;

//   /**
//    * The label (a single uppercase character) for the marker.
//    */
//   label: string;

//   /**
//    * If true, the marker can be dragged. Default value is false.
//    */
//   draggable: boolean = false;

//   /**
//    * Icon (the URL of the image) for the foreground.
//    */
//   iconUrl: string;
  
  /**
   * This event emitter gets emitted when the user clicks on the marker.
   */
  markerClick: EventEmitter<void> = new EventEmitter<void>();

  /**
   * This event is fired when the user stops dragging the marker.
   */
  dragEnd: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  @ContentChild(SebmGoogleMapInfoWindow) private _infoWindow: SebmGoogleMapInfoWindow;

  private _overviewAddedToManager: boolean = false;
  private _id: string;

  constructor(private _overlayViewManager: OverlayViewManager) {
      this._id = (markerId++).toString();
    }

  /* @internal */
  ngAfterContentInit() {
        if (this._infoWindow != null) {
        this._infoWindow.maxWidth = 100;
        }
  }

  /** @internal */
  ngOnChanges(changes: {[key: string]: SimpleChange}) {
    if (typeof this.latitude !== 'number' || typeof this.longitude !== 'number') {
      return;
    }
    
    if (!this._overviewAddedToManager) {
      this._overlayViewManager.addOverlayView(this);
      this._overviewAddedToManager = true;
      this._addEventListeners();
      return;
    }
    // if (changes['latitude'] || changes['longitude']) {
    //   this._overlayViewManager.updateMarkerPosition(this);
    // }
    // if (changes['title']) {
    //   this._overlayViewManager.updateTitle(this);
    // }
    // if (changes['label']) {
    //   this._overlayViewManager.updateLabel(this);
    // }
    // if (changes['draggable']) {
    //   this._overlayViewManager.updateDraggable(this);
    // }
    // if (changes['iconUrl']) {
    //   this._overlayViewManager.updateIcon(this);
    // }
  }
  
//   draw () {
//     console.log(this.div);
//   }

  private _addEventListeners() {
    this._overlayViewManager.createEventObservable('click', this).subscribe(() => {
    console.log('click');
    //   if (this._infoWindow != null) {
    //     this._infoWindow.open();
    //   }
    //   this.markerClick.next(null);
    });
    this._overlayViewManager.createEventObservable<mapTypes.MouseEvent>('dragend', this)
        .subscribe((e: mapTypes.MouseEvent) => {
          //this.dragEnd.next({coords: {lat: e.latLng.lat(), lng: e.latLng.lng()}});
          console.log('drag');
        }
     );
  }

  /** @internal */
  id(): string { return this._id; }

  /** @internal */
  toString(): string { return 'SebmGoogleMapOverlayView-' + this._id.toString(); }

  /** @internal */
  ngOnDestroy() {
      this._overlayViewManager.deleteoverlayView(this);
    }
}
