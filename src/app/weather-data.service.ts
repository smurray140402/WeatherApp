import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  // Variables to store city and coordinates
  private city: string = '';
  private lat: string = '';
  private long: string = '';

  setCity(city: string) {
    this.city = city;
  }

  getCity(): string {
    return this.city;
  }

  setCoordinates(lat: string, long: string) {
    this.lat = lat;
    this.long = long;
  }

  getCoordinates(): { lat: string; long: string } {
    return { lat: this.lat, long: this.long };
  }

  // Clear all stored values
  clear() {
    this.city = '';
    this.lat = '';
    this.long = '';
  }
}
