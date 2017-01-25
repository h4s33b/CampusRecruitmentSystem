import { Component, OnInit, Output } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../../store';
import { CounterAction } from '../../store/actions/index';
import { LoginComponentsComponent } from '../../components/login-components/login-components.component';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.css']
})
export class LoginContainerComponent implements OnInit {

  @select() isLoggedIn$: Observable<boolean>;
  public isLoggedIn;
  constructor(private counterAction: CounterAction,private router: Router) {
    this.isLoggedIn$.subscribe(val=>{
      console.log("val",val);
      this.isLoggedIn = val;
      /**
       * TODO have to set it up.
       */
      if(this.isLoggedIn.isLoggedIn){
        this.router.navigate(['home']);
      }
    })
   }

  ngOnInit() {
  }

  public loginUserData(data) {
    this.counterAction.userSignIn(data);
  }

}
