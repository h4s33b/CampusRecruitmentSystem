import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';




@Component({
  selector: 'dialog-result-example-dialog',
  templateUrl: './dialog-result-example-dialog.html',
})
export class DialogResultExample2Dialog {
  applyJobData: any;
  items: FirebaseListObservable<any>;
  public keyToFind:any;
  constructor(public dialogRef: MdDialogRef<DialogResultExample2Dialog>,private af:AngularFire) {
    this.keyToFind = localStorage.getItem("keyToFind");
    this.items = af.database.list('/applications', {
      query: {
        orderByChild: 'jobID',
        equalTo: this.keyToFind
      }
    });
  }

  submitJobForm(isValid: boolean, f: any) {
    this.dialogRef.close(f);
  }

}







@Component({
  selector: 'app-company-view-job-component',
  templateUrl: './company-view-job-component.component.html',
  styleUrls: ['./company-view-job-component.component.css']
})
export class CompanyViewJobComponentComponent implements OnInit {
  private sub: any;
  id: number;
  selectedOption: string;
  private items: FirebaseListObservable<any>;
  private allJobs: FirebaseListObservable<any>;

  dialogRef: MdDialogRef<DialogResultExample2Dialog>;

  private parentRouteId: number;
  constructor(private af: AngularFire, private router: Router, public dialog: MdDialog, private route: ActivatedRoute) {
    this.sub = this.route.parent.params.subscribe(params => {
      this.parentRouteId = params["id"];
      this.items = af.database.list('/jobs/' + this.parentRouteId);
    });
  }

  ngOnInit() {
  }

  showDetails(abc) {
    localStorage.setItem("keyToFind", abc);
    this.dialogRef = this.dialog.open(DialogResultExample2Dialog, {
      disableClose: false
    });

    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    });
  }
}
