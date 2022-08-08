import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';

//import all components that will be used on the MovieCard
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  userData: any = {};//object to hold all userData retrieved from getUser()
  favoriteMovies: any[] = [];//array to hold the user's favorite movies
  movies: any[] = [];//array to hold all movies in the db

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog
  ) { }

  //this will be called when Angular is done creating the component (similar to componentDidMount)
  ngOnInit(): void {
    this.getFavoriteMovies();//get user's favorite movies after loading the component
    this.getMovies();//get all movies from the db after loading the component
  }

  /**
   * Function to open a dialog to show director details of a given movie
   * @function openDirectorDialog
   * @param name
   * @param bio
   * @param birth
   * @param death
   */
  openDirectorDialog(name: string, bio: string, birth: Date, death: Date): void {
    //get details for the specific director here...
    console.log(`name passed to openDirectorDialog() is: ${name}`);
    console.log(`bio passed to openDirectorDialog() is: ${bio}`);
    console.log(`birth passed to openDirectorDialog() is: ${birth}`);
    console.log(`death passed to openDirectorDialog() is: ${death}`);

    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
        Death: death
      },
      // Assign dialog width
      width: '500px'
    });
  }

  /**
   * Function to open a dialog to show genre details of a given movie
   * @function openGenreDialog
   * @param name
   * @param description
   */
  openGenreDialog(name: string, description: string): void {
    //get details for the specific director here...
    console.log(`name passed to openGenreDialog() is: ${name}`);
    console.log(`description passed to openGenreDialog() is: ${description}`);

    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description
      },
      // Assign dialog width
      width: '500px'
    });
  }

  /**
   * Function to open a dialog to show synopsis details of a given movie
   * @function openSynopsisDialog
   * @param title
   * @param description
   */
  openSynopsisDialog(title: string, description: string): void {
    //get details for the specific director here...
    console.log(`title passed to openGenreDialog() is: ${title}`);
    console.log(`description passed to openGenreDialog() is: ${description}`);

    this.dialog.open(SynopsisComponent, {
      data: {
        Title: title,
        Description: description
      },
      // Assign dialog width
      width: '500px'
    });
  }

  /**
   * Function to return all movies from the database
   * @function getMovies
   * @returns an array of movie objects
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Function to return a list of the user's favorite movies from the API
   * @function getFavoriteMovies
   * @returns an array of movie ids
   */
  getFavoriteMovies(): void {
    const username = localStorage.getItem('user');
    //I'm calling the `/users` endpoint because it contains all data for the user including an array of their favorite movies
    this.fetchApiData.getUser(username).subscribe((resp: any) => {
      this.userData = resp;
      console.log(`user ${username}'s FavoriteMovies: ${this.userData.FavoriteMovies}`);
      return this.favoriteMovies = this.userData.FavoriteMovies;//set this.favoriteMovies to the FavoriteMovies array that was returned by the call
    });
  }

  /**
   * Function to return a boolean that indicates whether a given movie is on the user's list of favorites or not
   * @function isFavorite
   * @param id
   * @returns a boolean (true if the movie is on the user's favorites list, false if not)
   */
  isFavorite(id: string): boolean {
    return this.favoriteMovies.includes(id)
  }

  /**
   * Function to add a movie title (via clicking on the movie card's heart icon) to the user's favoriteMovies array
   * @function addToFavorites
   * @param id
   */
  addToFavorites(id: string): void {
    const username = localStorage.getItem('user');
    console.log(`movie id to add: ${id}`);
    this.fetchApiData.addToFavorites(username, id).subscribe((result) => {
      console.log(`result: ${result}`);
      this.ngOnInit();//reload the component after updating the favoriteMovies array
    })
  }

  /**
   * Function to remove a movie title (via clicking on the movie card's filled-in heart icon) from the user's favoriteMovies array
   * @function removeFromFavorites
   * @param id
   */
  removeFromFavorites(id: string): void {
    const username = localStorage.getItem('user');
    console.log(`movie id to remove: ${id}`);
    this.fetchApiData.deleteMovie(username, id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();//reload the component after updating the favoriteMovies array
    })
  }

}//end MovieCardComponent