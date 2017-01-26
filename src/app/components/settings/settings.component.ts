import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../../store';
import { CounterAction } from '../../store/actions/index';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  public isLoggedIn;
  public userData;
  public lastSearchQuery: Object = {};
  private items: FirebaseListObservable<any>;
  @select() isLoggedIn$: Observable<boolean>;
  private updateStudentsSettingsFormData;
  private updateSettingsFormData;
  public userData2;
  constructor(private counterAction: CounterAction, private router: Router, private af: AngularFire, private _location: Location) {

    this.updateSettingsFormData = {
      email: "",
      CompanyName: "",
      Industry: "",
      CompanyInfo: "",
      Address: "",
      NTN: "",
      userType: ''
    };

    this.isLoggedIn$.subscribe(val => {
      console.log("val", val);
      this.isLoggedIn = val;
      this.af.database.list('/users', {
        query: {
          orderByChild: 'email',
          equalTo: this.isLoggedIn.userData.email
        }
        // In a real app: dispatch action to load the details here.
      }).subscribe(val => {
        this.userData2 = val;
        this.updateSettingsFormData = {
          email: this.userData2[0].email,
          CompanyName: this.userData2[0].CompanyName,
          Industry: this.userData2[0].Industry,
          CompanyInfo: this.userData2[0].CompanyInfo,
          NTN: this.userData2[0].NTN,
          Address: this.userData2[0].Address
        };
      });
    })
  }

  ngOnInit() {
  }

  updateSettings(isValid: boolean, f: any) {
    f.userID = this.userData2[0].userID;
    f.email = this.updateSettingsFormData.email;
    f.userType = 'company';
    this.counterAction.updateUserSettings(f);
  }

  backClicked() {
    this._location.back();
  }
}
