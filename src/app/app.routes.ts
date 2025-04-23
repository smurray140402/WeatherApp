import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'weather-info',
    loadComponent: () => import('./weather-info/weather-info.page').then( m => m.WeatherInfoPage)
  },
  {
    path: 'info-page',
    loadComponent: () => import('./info-page/info-page.page').then( m => m.InfoPagePage)
  },
];
