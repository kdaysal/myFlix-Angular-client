import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service'

@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss']
})
export class SynopsisComponent implements OnInit {

  /**
       * Takes data from the MovieCard component and injects it via the MAT_DIALOG_DATA injection token.
       * This data will be used to populate the dialog via the template.
       * @param data
       */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string,
      Description: string
    }

  ) { }

  ngOnInit(): void {
  }
}//end SynopsisComponent
