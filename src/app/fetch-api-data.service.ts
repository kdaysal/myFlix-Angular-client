import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://kdaysal-my-flix.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  //Methods to call each endpoint

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(`userDetails from userRegistration(): ${userDetails}`);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for the user login endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(`userDetails from userLogin(): ${userDetails}`);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for the get all movies endpoint
  public getAllMovies(): Observable<any> {
    console.log(`getAllMovies endpoint called`);
    return this.http.get(apiUrl + 'movies').pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for the get one movie endpoint
  public getOneMovie(title: any): Observable<any> {
    console.log(`title: ${title}`);
    return this.http.get(apiUrl + `movies/${title}`).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for the get director endpoint
  public getDirector(name: any): Observable<any> {
    console.log(`Director name: ${name}`);
    return this.http.get(apiUrl + `movies/directors/${name}`).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for the get genre endpoint
  public getGenre(genre: any): Observable<any> {
    console.log(`Genre name: ${genre}`);
    return this.http.get(apiUrl + `movies/genres/${genre}`).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for the get user endpoint
  //note - after all the logic works, return to this method and refactor uppercase 'Username' to match lowercase variables of all the others ('username'). 
  //will need to correct this in my movie_api/index.js file first
  public getUser(Username: any): Observable<any> {
    console.log(`Username: ${Username}`);
    return this.http.get(apiUrl + `/users/${Username}`).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for the get favorite movies for a user endpoint
  public getFavoriteMovies(username: any): Observable<any> {
    console.log(`username: ${username}`);
    return this.http.get(apiUrl + `/users/${username}/movies`).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for the add a movie to the favorites movies list endpoint
  //code here

  // Making the api call for the edit user endpoint
  //code here

  // Making the api call for the delete user endpoint
  //code here

  // Making the api call for the delete a movie from the user's favorites list endpoint
  //code here

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}

