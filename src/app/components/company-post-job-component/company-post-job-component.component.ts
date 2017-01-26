import { Component, OnInit } from '@angular/core';
import { IAppState } from '../../store';
import { CounterAction } from '../../store/actions/index';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-company-post-job-component',
  templateUrl: './company-post-job-component.component.html',
  styleUrls: ['./company-post-job-component.component.css']
})
export class CompanyPostJobComponentComponent implements OnInit {
  private postJobData:any;
  public isLoggedIn;
  @select() isLoggedIn$: Observable<boolean>;
  constructor(private counterAction:CounterAction) {
    this.postJobData = {
      jobTitle : "",
      depart : "",
      shift : "",
      Expiry : "",
      Details : ""
    };
    this.isLoggedIn$.subscribe(val=>{
      this.isLoggedIn = val;
    })
   }

  ngOnInit() {
  }

  postJob(isValid: boolean, f: any){
    f.userID = this.isLoggedIn.userEmail;
    this.counterAction.postJob(f);
  }

}
