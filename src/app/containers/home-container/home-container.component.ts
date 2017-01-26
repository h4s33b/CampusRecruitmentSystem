import { Component, OnInit } from '@angular/core';
import { IAppState } from '../../store';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CounterAction } from '../../store/actions/index';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.css']
})
export class HomeContainerComponent implements OnInit {

  @select() isLoggedIn$: Observable<boolean>;
  public isLoggedIn;
  constructor(private counterAction:CounterAction, private router:Router) { 
    this.isLoggedIn$.subscribe(val=>{
      this.isLoggedIn = val;
    })
  }

  ngOnInit() {
  }

  logoutUser(){
    this.counterAction.logoutUser();
  }

  gotoSettings(){
    this.router.navigate(['settings']);
  }

    gotoOldJobs(){
    this.router.navigate(['company-details',this.isLoggedIn.userEmail]);
  }

}
