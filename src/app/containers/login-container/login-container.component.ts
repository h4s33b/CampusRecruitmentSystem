import { Component, OnInit, Output } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../../store';
import { CounterAction } from '../../store/actions/index';
import { LoginComponentsComponent } from '../../components/login-components/login-components.component';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {LocalStorage, SessionStorage} from "angular2-localstorage/WebStorage";



@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.css']
})
export class LoginContainerComponent implements OnInit {

  @select() isLoggedIn$: Observable<boolean>;
  public isLoggedIn;
  public userData;
  public lastSearchQuery:Object = {}
  constructor(private counterAction: CounterAction,private router: Router) {
    this.isLoggedIn$.subscribe(val=>{
      console.log("val",val);
      this.isLoggedIn = val;
      /**
       * TODO have to set it up.
       */
      if(!this.isLoggedIn.isLoggedIn){
        this.router.navigate(['']);
      }else if(this.isLoggedIn.isLoggedIn && this.isLoggedIn.userData.userType!='student'){
        this.router.navigate(['home']);
      }else if(this.isLoggedIn.userData && this.isLoggedIn.userData.userType=='student'){
        this.router.navigate(['company-list']);
      }
    })
   }

  ngOnInit() {
  }

  public loginUserData(data) {
    this.userData = data;
    this.counterAction.userSignIn(data);
  }

}
