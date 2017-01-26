import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import {Location} from '@angular/common';

@Component({
  selector: 'app-student-detail-component',
  templateUrl: './student-detail-component.component.html',
  styleUrls: ['./student-detail-component.component.css']
})
export class StudentDetailComponentComponent implements OnInit {
  id: number;
  private sub: any;
  private items: FirebaseListObservable<any>;
  constructor(private af: AngularFire, private route: ActivatedRoute,private _location:Location) {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      console.log(this.id);
      this.items = af.database.list('/users', {
        query: {
          orderByChild: 'userID',
          equalTo: this.id
        }
        // In a real app: dispatch action to load the details here.
      });
      console.log(this.items);
    })
  };

  ngOnInit() {
  }

   backClicked() {
        this._location.back();
    }

}
