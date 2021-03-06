import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-home-components',
  templateUrl: './home-components.component.html',
  styleUrls: ['./home-components.component.css']
})
export class HomeComponentsComponent implements OnInit {
  items: FirebaseListObservable<any>;
  constructor(private af: AngularFire, private router: Router) {
    this.items = af.database.list('/users', {
      query: {
        orderByChild: 'userType',
        equalTo: 'student'
      }
    });
  }

  ngOnInit() {
  }

  showDetails(userId) {
    this.router.navigate(['student-details', userId]);
  }

}
