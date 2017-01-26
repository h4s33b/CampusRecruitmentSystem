import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../../store';
import { CounterAction } from '../../store/actions/index';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-container',
  templateUrl: './student-container.component.html',
  styleUrls: ['./student-container.component.css']
})
export class StudentContainerComponent implements OnInit {
  public isLoggedIn;
  public userData;
  public lastSearchQuery: Object = {};
  @select() isLoggedIn$: Observable<boolean>;
  constructor(private counterAction: CounterAction, private router: Router) {
    this.isLoggedIn$.subscribe(val => {
      console.log("val", val);
      this.isLoggedIn = val;
      /**
       * TODO have to set it up.
       */
      if (!this.isLoggedIn.isLoggedIn) {
        this.router.navigate(['']);
      }
    })
  }

  ngOnInit() {
  }

  logoutUser() {
    this.counterAction.logoutUser();
  }

  gotoSettings(){
    this.router.navigate(['students-settings']);
  }
  

}
