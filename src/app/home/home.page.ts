import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonButton } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms'; 
import { Geolocation } from '@capacitor/geolocation';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonButton, FormsModule, RouterLink],
})
export class HomePage {

  // Variables
  city: string = "";
  coordinates:any = ""; 
  lat:string = ""; 
  long: String = "";

  constructor() {}

  // Function called when search button is clicked
  searchWeather() {
    console.log('Searching weather for: ', this.city);
  }

  // Function to get gps coorindates and split into lat and long
  async getGPS() {
    this.coordinates = await Geolocation.getCurrentPosition();
    this.lat = this.coordinates.coords.latitude;
    this.long = this.coordinates.coords.longitude;
  }

}
