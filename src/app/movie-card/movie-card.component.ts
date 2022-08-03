import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';

//import all components that will be used on the MovieCard
import { DirectorComponent } from '../director/director.component';

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

  //Open dialog for Director details
  openDirectorDialog(name: string, bio: string, birth: Date, death: Date): void {
    //get details for the specific director here...
    console.log(`name passed to openDirectorDialog() is: ${name}`);
    let splitName = name.split(' ');
    let nameForApiCall = splitName[0] + "%20" + splitName[1];
    console.log(`nameForAPICall = ${nameForApiCall}`);
    this.dialog.open(DirectorComponent, {
      // data: {
      //   Name: nameForApiCall,
      //   Bio: bio,
      //   Birth: birth,
      //   Death: death
      // },
      // Assign dialog width
      width: '500px'
    });
  }

  //return all movies from the db
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  //function to get the user's favorite movies from the API
  //I'm calling my `/users` endpoint because it contains all data for the user including an array of their favorite movies
  getFavoriteMovies(): void {
    const username = localStorage.getItem('user');
    this.fetchApiData.getUser(username).subscribe((resp: any) => {
      this.userData = resp;
      console.log(`user ${username}'s FavoriteMovies: ${this.userData.FavoriteMovies}`);
      return this.favoriteMovies = this.userData.FavoriteMovies;//set this.favoriteMovies to the FavoriteMovies array that was returned by the call
    });
  }

  //funtion to return a boolean that indicates whether a given movie is on the user's list of favorites or not
  isFavorite(id: string): boolean {
    return this.favoriteMovies.includes(id)
  }

  //function to add a movie title (via clicking on the movie card's heart icon) to the user's favoriteMovies array
  addToFavorites(id: string): void {
    const username = localStorage.getItem('user');
    console.log(`movie id to add: ${id}`);
    this.fetchApiData.addToFavorites(username, id).subscribe((result) => {
      console.log(`result: ${result}`);
      this.ngOnInit();//reload the component after updating the favoriteMovies array
    })
  }

  //function to remove a movie title (via clicking on the movie card's filled-in heart icon) from the user's favoriteMovies array
  removeFromFavorites(id: string): void {
    const username = localStorage.getItem('user');
    console.log(`movie id to remove: ${id}`);
    this.fetchApiData.deleteMovie(username, id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();//reload the component after updating the favoriteMovies array
    })
  }

}//end MovieCardComponent