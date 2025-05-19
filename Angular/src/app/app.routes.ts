import { Routes } from '@angular/router';
import { AllUsersComponent } from '../components/all-users/all-users.component';
import { StatisticsChartComponent } from '../components/statistics-chart/statistics-chart.component';
import { HomeComponent } from '../components/home/home.component';
import { AuthGuard } from '../guard/auth.guard';

// export const routes: Routes = [
//     { path: '', component: HomeComponent },
//     { path: 'users', component: AllUsersComponent },
//     { path: 'statistics', component: StatisticsChartComponent }

// ];
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'users', component: AllUsersComponent, canActivate: [AuthGuard] },
    { path: 'statistics', component: StatisticsChartComponent, canActivate: [AuthGuard] },
  ];
  