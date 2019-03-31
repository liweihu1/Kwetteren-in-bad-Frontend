import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth-jwt/guard/auth.guard';
import { SearchComponent } from './components/search/search.component';
import { KweetDashboardComponent } from './components/kweet-dashboard/kweet-dashboard.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'kweets', component: KweetDashboardComponent },
  { path: 'search', component: SearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
