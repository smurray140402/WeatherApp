import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonButton } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms'; 
import { Geolocation } from '@capacitor/geolocation';
import { Router } from '@angular/router';
import { WeatherDataService } from '../weather-data.service';
import { Storage } from '@ionic/storage-angular'

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

  constructor(private router: Router, private weatherService: WeatherDataService, private storage:Storage) {}

  async ngOnInit() {
    await this.storage.create();
  }

  // Function to save the city to the service, clears the GPS data and navigates to the weather page.
  async searchWeather() {
    this.weatherService.setCity(this.city);
    this.weatherService.setCoordinates('', '');

    // Stores the city in storage and clears previous coordinates
    await this.storage.set('lastCity', this.city);
    await this.storage.set('lastCoords', null);

    this.router.navigate(['/weather-info']);
  }

  // Function to get GPS coordinates, save them to the service, clear the city and navigates to the weather page.
  async getGPS() {
      this.coordinates = await Geolocation.getCurrentPosition();
      this.lat = this.coordinates.coords.latitude.toString();
      this.long = this.coordinates.coords.longitude.toString();

      // Save coordinates to the service
      this.weatherService.setCoordinates(this.lat, this.long);
      this.weatherService.setCity('');

      // Stores coordinates in storage and clears previous city
      await this.storage.set('lastCoords', { lat: this.lat, long: this.long });
      await this.storage.set('lastCity', '');

      this.router.navigate(['/weather-info']);
  }
}
