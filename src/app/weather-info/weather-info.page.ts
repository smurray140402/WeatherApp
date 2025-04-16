import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { WeatherDataService } from '../weather-data.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.page.html',
  styleUrls: ['./weather-info.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, HttpClientModule]
})
export class WeatherInfoPage {

  // Variables
  weatherData: any;

  constructor(private weatherService: WeatherDataService, private http: HttpClient) { }

  // When component loads determine which metric to use to get weather data.
  ngOnInit() {
    const city = this.weatherService.getCity();
    const coords = this.weatherService.getCoordinates();

    if (city) {
      this.getWeatherByCity(city);
    } else if (coords.lat && coords.long) {
      this.getWeatherByCoords(coords.lat, coords.long);
    } else {
      console.log("No city or coordinates provided.")
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
