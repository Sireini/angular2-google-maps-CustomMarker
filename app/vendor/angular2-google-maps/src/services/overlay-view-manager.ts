import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

import {SebmGoogleMapOverlayView} from '../directives/google-map-overlay-view';

import {GoogleMapsAPIWrapper} from './google-maps-api-wrapper';
import {OverlayView} from './google-maps-types';


@Injectable()
export class OverlayViewManager {
  private _overlayViews: Map<SebmGoogleMapOverlayView, Promise<OverlayView>> =
      new Map<SebmGoogleMapOverlayView, Promise<OverlayView>>();

  constructor(private _mapsWrapper: GoogleMapsAPIWrapper, private _zone: NgZone) {}

  deleteoverlayView(overlayView: SebmGoogleMapOverlayView): Promise<void> {
    const m = this._overlayViews.get(overlayView);
    if (m == null) {
      // overlayView already deleted
      return Promise.resolve();
    }
    return m.then((m: OverlayView) => {
      return this._zone.run(() => {
        m.setMap(null);
        this._overlayViews.delete(overlayView);
      });
    });
  }

  // draw(overlayView: SebmGoogleMapOverlayView): Promise<void> {
  //   return this._overlayViews.get(overlayView).then(
  //       (m: OverlayView) => {
  //         // m.draw();
  //       });
  // }

  // updateoverlayViewPosition(overlayView: SebmGoogleMapOverlayView): Promise<void> {
  //   return this._overlayViews.get(overlayView).then(
  //       (m: OverlayView) => m.setPosition({lat: overlayView.latitude, lng: overlayView.longitude}));
  // }

  // updateTitle(overlayView: SebmGoogleMapOverlayView): Promise<void> {
  //   return this._overlayViews.get(overlayView).then((m: OverlayView) => m.setTitle(overlayView.title));
  // }

  // updateLabel(overlayView: SebmGoogleMapOverlayView): Promise<void> {
  //   return this._overlayViews.get(overlayView).then((m: OverlayView) => { m.setLabel(overlayView.label); });
  // }

  // updateDraggable(overlayView: SebmGoogleMapOverlayView): Promise<void> {
  //   return this._overlayViews.get(overlayView).then((m: OverlayView) => m.setDraggable(overlayView.draggable));
  // }

  // updateIcon(overlayView: SebmGoogleMapOverlayView): Promise<void> {
  //   return this._overlayViews.get(overlayView).then((m: OverlayView) => m.setIcon(overlayView.iconUrl));
  // }
  
   
  addOverlayView(overlayView: SebmGoogleMapOverlayView) {
    console.log(overlayView.objectId,'test');
    
    const overlayViewPromise = this._mapsWrapper.createOverlayView({
        position: {lat: overlayView.latitude, lng: overlayView.longitude},
        objectId: overlayView.objectId
    });
    
    this._overlayViews.set(overlayView, overlayViewPromise);
  }

  getNativeoverlayView(overlayView: SebmGoogleMapOverlayView): Promise<OverlayView> {
    return this._overlayViews.get(overlayView);
  }

  createEventObservable<T>(eventName: string, overlayView: SebmGoogleMapOverlayView): Observable<T> {
    return Observable.create((observer: Observer<T>) => {
      this._overlayViews.get(overlayView).then((m: OverlayView) => {
        m.addListener(eventName, (e: T) => this._zone.run(() => observer.next(e)));
      });
    });
  }
}
