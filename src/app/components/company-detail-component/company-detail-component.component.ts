import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Location } from '@angular/common';



@Component({
  selector: 'dialog-result-example-dialog',
  templateUrl: './dialog-result-example-dialog.html',
})
export class DialogResultExampleDialog {
  applyJobData: any;
  constructor(public dialogRef: MdDialogRef<DialogResultExampleDialog>) {
    this.applyJobData = { "email": "", "cellNumber": "", "message": "" };
  }

  submitJobForm(isValid: boolean, f: any) {
    this.dialogRef.close(f);
  }

}






@Component({
  selector: 'app-company-detail-component',
  templateUrl: './company-detail-component.component.html',
  styleUrls: ['./company-detail-component.component.css']
})
export class CompanyDetailComponentComponent implements OnInit {
  id: number;
  private sub: any;
  selectedOption: string;
  private items: FirebaseListObservable<any>;
  private allJobs: FirebaseListObservable<any>;

  dialogRef: MdDialogRef<DialogResultExampleDialog>;
  constructor(private af: AngularFire, private route: ActivatedRoute, private router: Router, public dialog: MdDialog, public _location: Location) {
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

  applyForJob() {
    this.dialogRef = this.dialog.open(DialogResultExampleDialog, {
      disableClose: false
    });

    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    });
  }

}
