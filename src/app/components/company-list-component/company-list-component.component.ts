import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-company-list-component',
  templateUrl: './company-list-component.component.html',
  styleUrls: ['./company-list-component.component.css']
})
export class CompanyListComponentComponent implements OnInit {

  items: FirebaseListObservable<any>;
  constructor(private af: AngularFire, private router: Router) {
    this.items = af.database.list('/users', {
      query: {
        orderByChild: 'userType',
        equalTo: 'company'
      }
    });
  }

  ngOnInit() {
  }

  showDetails(userId) {
    this.router.navigate(['company-details-small', userId]);
  }

}
