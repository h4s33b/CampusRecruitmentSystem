import { Component, OnInit } from '@angular/core';
import { IAppState } from '../../store';
import { CounterAction } from '../../store/actions/index';

@Component({
  selector: 'app-student-settings',
  templateUrl: './student-settings.component.html',
  styleUrls: ['./student-settings.component.css']
})
export class StudentSettingsComponent implements OnInit {

  private updateStudentsSettingsFormData;
  constructor(private counterAction:CounterAction) {
    this.updateStudentsSettingsFormData = {
      email: "test@testing.com",
      FullName: "Haseeb2",
      Industry: "IT Industry",
      Bio: "This is testing."
    };
  }

  ngOnInit() {
  }

    updateStudentSettings(isValid: boolean, f: any){
    f.userID = '123315255';
    f.email = this.updateStudentsSettingsFormData.email;
    f.userType =  'student';
    this.counterAction.updateUserSettings(f);
  }

}
