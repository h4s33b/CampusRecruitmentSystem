import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../../store';
import { CounterAction } from '../../store/actions/index';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-student-settings',
  templateUrl: './student-settings.component.html',
  styleUrls: ['./student-settings.component.css']
})
export class StudentSettingsComponent implements OnInit {
  public isLoggedIn;
  public userData;
  public lastSearchQuery: Object = {};
  private items: FirebaseListObservable<any>;
  @select() isLoggedIn$: Observable<boolean>;
  private updateStudentsSettingsFormData;
  constructor(private counterAction: CounterAction, private router: Router, private af: AngularFire, private _location:Location) {

    this.isLoggedIn$.subscribe(val => {
      console.log("val", val);
      this.isLoggedIn = val;
      this.updateStudentsSettingsFormData = {
          email: "",
          FullName: "",
          Industry: "",
          Bio: ""
        };
      af.database.list('/users', {
        query: {
          orderByChild: 'email',
          equalTo: this.isLoggedIn.userData.email
        }
        // In a real app: dispatch action to load the details here.
      }).subscribe(val => {
        this.userData = val;
        this.updateStudentsSettingsFormData = {
          email: this.userData[0].email,
          FullName: this.userData[0].FullName,
          Industry: this.userData[0].Industry,
          Bio: this.userData[0].Bio
        };
      });

    })
  }

  ngOnInit() {
  }

  updateStudentSettings(isValid: boolean, f: any) {
    f.userID = this.userData[0].userID;
    f.email = this.updateStudentsSettingsFormData.email;
    f.userType = 'student';
    this.counterAction.updateUserSettings(f);
  }

    backClicked() {
    this._location.back();
  }

}
