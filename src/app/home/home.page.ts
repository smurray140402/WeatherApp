import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonButton } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonButton, FormsModule],
})
export class HomePage {

  // Variable to hold the city name
  city: string = "";

  constructor() {}

  // Function called when search button is clicked
  searchWeather() {
    console.log('Searching weather for: ', this.city);
  }
}
