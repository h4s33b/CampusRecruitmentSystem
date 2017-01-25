import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgReduxModule } from 'ng2-redux';
import { RouterModule, Routes } from '@angular/router';

import { StoreModule } from './store';
import { MaterialModule } from '@angular/material';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import 'hammerjs';

import { AppComponent } from './app.component';
import { LoginContainerComponent } from './containers/login-container/login-container.component';
import { LoginComponentsComponent } from './components/login-components/login-components.component';
import { HomeContainerComponent } from './containers/home-container/home-container.component';
import { HomeComponentsComponent } from './components/home-components/home-components.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeContainerComponent },
  { path: '', component: LoginContainerComponent },
  // { path: '**', component: NotFoundComponent }

];


export const firebaseConfig = {
  apiKey: "AIzaSyDTvh3om4MPFcThDzCjIHKQSUIwSBg4_jI",
  authDomain: "campusrecruitmentsystem-7617c.firebaseapp.com",
  databaseURL: "https://campusrecruitmentsystem-7617c.firebaseio.com",
  storageBucket: "campusrecruitmentsystem-7617c.appspot.com",
  messagingSenderId: "454779730558"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Password
};


@NgModule({
  declarations: [
    AppComponent,
    LoginContainerComponent,
    LoginComponentsComponent,
    HomeContainerComponent,
    HomeComponentsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    NgReduxModule,
    StoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
