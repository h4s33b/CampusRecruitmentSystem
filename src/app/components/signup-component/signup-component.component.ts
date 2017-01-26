import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { IAppState } from '../../store';
import { CounterAction } from '../../store/actions/index';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-component',
  templateUrl: './signup-component.component.html',
  styleUrls: ['./signup-component.component.css']
})
export class SignupComponentComponent implements OnInit {
  private studentSignUpData: any;
  private companySignUpData: any;
  private userTypeStudent: boolean;
  @select() isLoggedIn$: Observable<boolean>;
  public isLoggedIn;
  constructor(private counterAction: CounterAction, private router: Router) {
    this.userTypeStudent = true;
    this.studentSignUpData = { "email": "", "password": "", "FullName": "", "Industry": "", "Bio": "" };
    this.companySignUpData = {
      "email": "", "password": "",
      CompanyName: "",
      Industry: "",
      CompanyInfo: "",
      Address: "",
      NTN: ""
    };

    this.isLoggedIn$.subscribe(val => {
      console.log("val", val);
      this.isLoggedIn = val;
      /**
       * TODO have to set it up.
       */
      if (this.isLoggedIn.isSignUp && this.userTypeStudent) {
        this.router.navigate(['company-list']);
      } else if (this.isLoggedIn.isSignUp && !this.userTypeStudent) {
        this.router.navigate(['home']);
      }
    })


  }

  ngOnInit() {
  }

  changeFormType(userTypeStudent: boolean): void {
    this.userTypeStudent = userTypeStudent;
  }


  signUpStudent(isValid: boolean, f: any) {
    f.userType = "student";
    console.log(f);
    this.counterAction.signupStudent(f);
  }

  signUpCompany(isValid: boolean, f: any) {
    f.userType = "company";
    console.log(f);
    this.counterAction.signupCompany(f);
  }

}
