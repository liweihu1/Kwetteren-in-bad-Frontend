import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './services/auth-jwt/guard/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { KweetComponent } from './components/kweet/kweet.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { Constants } from './constants/api.consts';
import { SearchComponent } from './components/search/search.component';
import { TimeAgoPipe } from 'time-ago-pipe';
import { KweetDashboardComponent } from './components/kweet-dashboard/kweet-dashboard.component';
import { FollowingCardComponent } from './components/following-card/following-card.component';
import { FollowerCardComponent } from './components/follower-card/follower-card.component';
import { UserInfoCardComponent } from './components/user-info-card/user-info-card.component';
import { KweetOverviewCardComponent } from './components/kweet-overview-card/kweet-overview-card.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent,
    AdminComponent,
    LoginComponent,
    KweetComponent,
    SearchComponent,
    TimeAgoPipe,
    KweetDashboardComponent,
    FollowingCardComponent,
    FollowerCardComponent,
    UserInfoCardComponent,
    KweetOverviewCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
          return localStorage.getItem(Constants.TOKEN);
        },
        whitelistedDomains: ['localhost:4200'],
        blacklistedRoutes: ['http://localhost:4200/login']
      }
    })
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
