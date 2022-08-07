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

  /**
   * Takes data from the MovieCard component and injects it via the MAT_DIALOG_DATA injection token.
   * This data will be used to populate the dialog via the template.
   * @param data
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)

    //Define all variables for the Director info
    public data: {
      Name: string,
      Bio: string,
      Birth: Date,
      Death: Date
    }

  ) { }

  ngOnInit(): void {
    //intentionally blank
  }
}//end DirectorComponent
