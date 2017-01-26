import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { MdDialog, MdDialogRef } from '@angular/material';
import { IAppState } from '../../store';
import { CounterAction } from '../../store/actions/index';
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
  selector: 'app-company-details-small-component',
  templateUrl: './company-details-small-component.component.html',
  styleUrls: ['./company-details-small-component.component.css']
})
export class CompanyDetailsSmallComponentComponent implements OnInit {
  id: number;
  private sub: any;
  selectedOption: string;
  private items: FirebaseListObservable<any>;
  private allJobs: FirebaseListObservable<any>;

  dialogRef: MdDialogRef<DialogResultExampleDialog>;

  constructor(private af: AngularFire, private route: ActivatedRoute, private router: Router, public dialog: MdDialog, private counterAction: CounterAction, private _location:Location) {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      console.log(this.id);
      this.items = af.database.list('/users', {
        query: {
          orderByChild: 'userID',
          equalTo: this.id
        }
      })
      this.allJobs = af.database.list('/jobs/' + this.id);
    })
  };

  ngOnInit() {
  }

  applyForJob(abc) {
    this.dialogRef = this.dialog.open(DialogResultExampleDialog, {
      disableClose: false
    });

    this.dialogRef.afterClosed().subscribe(result => {
      result.jobID = abc;
      console.log('result: ', result);
      this.counterAction.applyForJob(result);
      this.dialogRef = null;
    });
  }

  backClicked() {
    this._location.back();
  }

}
