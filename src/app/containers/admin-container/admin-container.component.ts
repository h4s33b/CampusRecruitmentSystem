import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-admin-container',
  templateUrl: './admin-container.component.html',
  styleUrls: ['./admin-container.component.css']
})
export class AdminContainerComponent implements OnInit {
  items: FirebaseListObservable<any>;
  constructor(private af: AngularFire) {
    this.items = af.database.list('/users');
  }

  ngOnInit() {
  }


  deleteUser(abc){
    this.items.remove(abc);
  }

}
