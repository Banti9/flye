import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  username: string = ''; // Define the 'username' property
  userProfile: any; // Define the 'userProfile' property
  isLoading: boolean = false; // Define the 'isLoading' property
  repositories: any[] = []; // Define the 'repositories' property
  page: number = 1; // Define the 'page' property
  perPage: number = 10; // Define the 'perPage' property



  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.apiService.getUser('johnpapa').subscribe(console.log);
  }
  changePage(page: number) {
    // Implement the logic to change the page
    if (page < 1) {
      page = 1; // Ensure page number doesn't go below 1
    }
    this.page = page; // Update the 'page' property
    this.fetchRepositories(); // Call the method to fetch repositories with the updated page number
  }
  changePageSize(size: any) {
    // Implement the logic to change the page size
    if (size && size.target) {
      const pageSize = size.target.value;
      this.perPage = pageSize; // Update perPage
      this.fetchRepositories(); // Fetch repositories with updated page size
    }
  }
  searchUser() {
    // Implement the logic to search for the user with the entered username
    if (this.username.trim() !== '') {
      this.isLoading = true; // Set isLoading to true while fetching user data
      this.apiService.getUser(this.username).subscribe(
        (userProfile: any) => {
          this.userProfile = userProfile; // Update userProfile
          this.isLoading = false; // Set isLoading to false after fetching user data
        },
        (error: any) => {
          console.error('Error fetching user profile:', error);
          this.isLoading = false; // Set isLoading to false if an error occurs
        }
      );
      this.fetchRepositories(); // Fetch repositories for the entered username
    }
  }

  fetchRepositories(): void {
    this.isLoading = true;
    this.apiService.getRepos(this.username).subscribe(
      (repositories:any) => {
        this.repositories = repositories;
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error fetching repositories:', error);
        this.isLoading = false;
      }
    );
}




}
