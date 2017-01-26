import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgReduxModule } from 'ng2-redux';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from './providers/gaurd';
import { StudentGuard } from './providers/student';
import { AdminGuard } from './providers/admin';

import { StoreModule } from './store';
import { MaterialModule } from '@angular/material';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import 'hammerjs';

import { AppComponent } from './app.component';
import { LoginContainerComponent } from './containers/login-container/login-container.component';
import { LoginComponentsComponent } from './components/login-components/login-components.component';
import { HomeContainerComponent } from './containers/home-container/home-container.component';
import { HomeComponentsComponent } from './components/home-components/home-components.component';
import { SettingsComponent } from './components/settings/settings.component';
import { StudentSettingsComponent } from './components/student-settings/student-settings.component';
import { StudentDetailComponentComponent } from './components/student-detail-component/student-detail-component.component';
import { CompanyDetailComponentComponent } from './components/company-detail-component/company-detail-component.component';
import { CompanyListComponentComponent } from './components/company-list-component/company-list-component.component';
import { CompanyPostJobComponentComponent } from './components/company-post-job-component/company-post-job-component.component';
import { CompanyViewJobComponentComponent, DialogResultExample2Dialog } from './components/company-view-job-component/company-view-job-component.component';
import { SignupComponentComponent } from './components/signup-component/signup-component.component';
import { CompanyDetailsSmallComponentComponent, DialogResultExampleDialog } from './components/company-details-small-component/company-details-small-component.component';
import { StudentContainerComponent } from './containers/student-container/student-container.component';
import { AdminContainerComponent } from './containers/admin-container/admin-container.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeContainerComponent, canActivate: [LoggedInGuard] },
  { path: 'signUp', component: SignupComponentComponent },
  { path: 'settings', component: SettingsComponent, canActivate: [LoggedInGuard] },
  { path: 'students-settings', component: StudentSettingsComponent, canActivate: [StudentGuard] },
  { path: 'company-list', component: StudentContainerComponent, canActivate: [StudentGuard] },
  { path: 'student-details/:id', component: StudentDetailComponentComponent, canActivate: [LoggedInGuard] },
  {
    path: 'company-details-small/:id', component: CompanyDetailsSmallComponentComponent, canActivate: [StudentGuard]
  },
  {
    path: 'company-details/:id', component: CompanyDetailComponentComponent,
    children: [
      { path: '', redirectTo: 'viewJobs;', pathMatch: 'full' },
      { path: 'viewJobs', component: CompanyViewJobComponentComponent },
      { path: 'postJob', component: CompanyPostJobComponentComponent }
    ], canActivate: [LoggedInGuard]
  },
  { path: 'admin', component: AdminContainerComponent,canActivate: [AdminGuard] },
  { path: '', component: LoginContainerComponent }

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
    HomeComponentsComponent,
    SettingsComponent,
    StudentSettingsComponent,
    StudentDetailComponentComponent,
    CompanyDetailComponentComponent,
    CompanyListComponentComponent,
    CompanyPostJobComponentComponent,
    CompanyViewJobComponentComponent,
    SignupComponentComponent,
    CompanyDetailsSmallComponentComponent,
    DialogResultExampleDialog,
    DialogResultExample2Dialog,
    StudentContainerComponent,
    AdminContainerComponent
  ],
  entryComponents: [DialogResultExampleDialog, DialogResultExample2Dialog],
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
  providers: [LoggedInGuard, StudentGuard,AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
