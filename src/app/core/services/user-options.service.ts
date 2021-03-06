import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserOptionsService {

  homeCoordinates$;
  notifactionDuration;

  constructor() { }

  getCoordinates() {

    if (!this.homeCoordinates$)
    {
      this.homeCoordinates$ = {"latitude": 24.571270, "longitude": 73.691544};
    }

    return this.homeCoordinates$;
  }

  getNotifactionDuration(){

    if(!this.notifactionDuration)
    {
      this.notifactionDuration = 5;
    }

    return this.notifactionDuration;

  }

  //TODO implement custom debounce time for autocompletes
}
