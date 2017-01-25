import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-login-components',
  templateUrl: './login-components.component.html',
  styleUrls: ['./login-components.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponentsComponent implements OnInit {

  public genderOption: { "value": string, viewValue: string }[];
  public userLoginData: { "email": string, "password": string };

  @Output() loginData: EventEmitter<any>;
  constructor() {
    this.genderOption = [
      { value: 'male', viewValue: 'Male' },
      { value: 'female', viewValue: 'Female' }
    ];
    this.userLoginData = { "email": "", "password": "" };
    this.loginData = new EventEmitter<any>();
  }

  ngOnInit() {
  }

  public userLogin(isValid: boolean, f: any) {
    this.loginData.emit(f);
  }

}
