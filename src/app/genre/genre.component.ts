import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service'

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {

  /**
     * Takes data from the MovieCard component and injects it via the MAT_DIALOG_DATA injection token.
     * This data will be used to populate the dialog via the template.
     * @param data
     */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string,
      Description: string
    }

  ) { }

  ngOnInit(): void {
  }

}
