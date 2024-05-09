import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(githubUsername: string) {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}`);
  }
  // getRepos(githubUsername: string) {
  //   return this.httpClient.get(`https://api.github.com/users/${githubUsername}/repos`);
  // }

  getRepos(githubUsername: string) {
    const url = `https://api.github.com/users/${githubUsername}/repos`;
    return this.httpClient.get(url).pipe(
      catchError(error => {
        console.error('Error fetching repositories:', error);
        return throwError('Could not fetch repositories. Please try again later.');
      })
    );
}

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 
}
