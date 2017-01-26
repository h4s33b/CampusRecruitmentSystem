import { Component, OnInit } from '@angular/core';
import { IAppState } from '../../store';
import { CounterAction } from '../../store/actions/index';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  private updateSettingsFormData;
  constructor(private counterAction:CounterAction) {
    this.updateSettingsFormData = {
      email : "test@testing.com",
      CompanyName : "Panacloud",
      Industry : "IT Industry",
      CompanyInfo : "Panacloud is a very good company",
      Address : "DHA",
      NTN : "123456",
      userType : 'company'
    };
   }

  ngOnInit() {
  }
  
  updateSettings(isValid: boolean, f: any){
    f.userID = '123355555';
    f.email = this.updateSettingsFormData.email;
    this.counterAction.updateUserSettings(f);
  }
}
