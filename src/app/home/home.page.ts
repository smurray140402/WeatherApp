import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonButton } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms'; 
import { Geolocation } from '@capacitor/geolocation';
import { Router } from '@angular/router';
import { WeatherDataService } from '../weather-data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonButton, FormsModule],
})

export class HomePage {

  // Variables
  city: string = "";
  coordinates: any = ""; 
  lat: string = ""; 
  long: string = "";

  constructor(private router: Router, private weatherService: WeatherDataService) {}

  // Function to save the city to the service, clears the GPS data and navigates to the weather page.
  searchWeather() {
    this.weatherService.setCity(this.city);
    this.weatherService.setCoordinates('', '');
    this.router.navigate(['/weather-info']);
  }

  // Function to get GPS coordinates, save them to the service, clear the city and navigates to the weather page.
  async getGPS() {
      this.coordinates = await Geolocation.getCurrentPosition();
      this.lat = this.coordinates.coords.latitude.toString();
      this.long = this.coordinates.coords.longitude.toString();
      this.weatherService.setCoordinates(this.lat, this.long);
      this.weatherService.setCity('');
      this.router.navigate(['/weather-info']);
  }
}
