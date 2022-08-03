import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service'


@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss']
})
export class DirectorComponent implements OnInit {
  director: any = {};//may not be necessary anymore - delete before production

  constructor(
    @Inject(MAT_DIALOG_DATA)
    /* CANNOT have the 2 lines below...this is where the compile errors came from */
    //public dialogRef: MatDialogRef<DirectorComponent>,
    //public fetchApiData: UserRegistrationService,
    public data: {
      Name: string,
      Bio: string,
      Birth: Date,
      Death: Date
    }

  ) { }

  ngOnInit(): void {
    /* NO LONGER NECESSARY TO CALL getDirector endpoint - delete before production */
    //call to get director info here, if @Inject won't work
    // this.getDirector("Quentin%20Tarantino"); //to test the API call with a hard-coded director name
  }

  /* NO LONGER NECESSARY TO CALL getDirector endpoint...I finally got the @injector to work */
  /* DELETE BELOW CODEBLOCK before production */
  /* ********************************** */
  // getDirector(name: string): void {
  //   this.fetchApiData.getDirector(name).subscribe((resp: any) => {
  //     this.director = resp;
  //     console.log(this.director);
  //     return this.director;
  //   });
  // }
  /* ********************************** */


}
