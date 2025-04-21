import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { WeatherDataService } from '../weather-data.service';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.page.html',
  styleUrls: ['./weather-info.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton]
})
export class WeatherInfoPage {

  // Variables
  weatherData: any;

  constructor(private weatherService: WeatherDataService, private http: HttpClient, private storage:Storage) { }

  // When component loads determine which metric to use to get weather data.
  async ngOnInit() {
    await this.storage.create();

    const city = this.weatherService.getCity();
    const coords = this.weatherService.getCoordinates();

    if (city) {
      this.getWeatherByCity(city);
    } else if (coords.lat && coords.long) {
      this.getWeatherByCoords(coords.lat, coords.long);
    } else {
      // Try to load last used city or coordinates from storage
      const storedCity = await this.storage.get('lastCity');
      const storedCoords = await this.storage.get('lastCoords');

      // Checks if there is stored data to use for city or coords
      if (storedCity) {
        this.getWeatherByCity(storedCity);
      } else if (storedCoords?.lat && storedCoords?.long) {
        this.getWeatherByCoords(storedCoords.lat, storedCoords.long);
      } else {
        console.log("No stored city or coordinates found.");
      }
    }
  }
 
  // Gets weather data using the city name and stores the data in weatherData and logs it to console.
  getWeatherByCity(city: string) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1b5376416f52d401811778655278d605`;
    this.http.get(url).subscribe(data => {
      this.weatherData = data;
      console.log('City Weather:', data);
    });
  }

  // Gets weather data using the coordinates and stores the data in weatherData and logs it to console.
   getWeatherByCoords(lat: string, long: string) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=1b5376416f52d401811778655278d605`;
    this.http.get(url).subscribe(data => {
      this.weatherData = data;
      console.log('GPS Weather:', data);
    });
  }
}
