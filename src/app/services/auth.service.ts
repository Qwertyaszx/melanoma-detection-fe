import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    
  // http options used for making API calls
  private httpOptions: any;

  private baseUrl = environment.baseUrl;

  // the actual JWT tokens
  public accessToken: string;
  public refreshToken: string;
  
  // the token expiration date
  public accessTokenExpires: Date;
  public refreshTokenExpires: Date;
  
  // the username of the logged in user
  public username: string;
  
  // error messages received from the login attempt
  public errors: any = [];

  private http: HttpClient
  
  constructor(private _handler: HttpBackend, private _router: Router) {
    this.http = new HttpClient(_handler);
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE','Access-Control-Allow-Headers': 'X-Requested-With,content-type'})
    };
  }
   
  // Uses http.post() to get an auth token from djangorestframework-jwt endpoint
  public login(user) {
    this.http.post(this.baseUrl + '/api/token/obtain/', JSON.stringify(user), this.httpOptions).subscribe(
      data => {
        this.updateData(data);
        this._router.navigate(['home']);
      },
      err => {
        console.log(err)
        this.errors = err['error'];
      }
    );
  }
  
  // Refreshes the JWT token, to extend the time the user is logged in
  public refreshAccessToken() {
    this.http.post(this.baseUrl + '/api/token/refresh/', JSON.stringify({refresh: this.refreshToken}), this.httpOptions).subscribe(
      data => {
        this.updateData(data);
      },
      err => {
        console.log(err)
        this.errors = err['error'];
      }
    );
  }
  
  public logout() {
    this.accessToken = null;
    this.refreshToken = null;
    this.accessTokenExpires = null;
    this.refreshTokenExpires = null;
    this.username = null;
    this._router.navigate(['login']);
  }

  public getAccessToken() {
    console.log(this.accessTokenExpires);
    console.log(new Date());
    if (this.accessToken != null && this.accessTokenExpires != null && this.accessTokenExpires > new Date()) {
      return this.accessToken;
    } else {
      this.refreshAccessToken();
      return this.accessToken;
    }
  }
  
  private updateData(data) {
    this.accessToken = data['access'];
    this.refreshToken = data['refresh'];
    this.errors = [];
  
    // decode the token to read the username and expiration timestamp
    const accessTokenParts = this.accessToken.split(/\./);
    const refreshTokenParts = this.refreshToken.split(/\./);
    const accessTokenDecoded = JSON.parse(window.atob(accessTokenParts[1]));
    const refreshTokenDecoded = JSON.parse(window.atob(refreshTokenParts[1]));
    this.accessTokenExpires = new Date(accessTokenDecoded.exp * 1000);
    this.refreshTokenExpires = new Date(refreshTokenDecoded.exp * 1000);
    this.username = accessTokenDecoded.username;

    console.log('Refresh Token: ' + this.refreshToken);
    console.log('Access Token: ' + this.accessToken);
  }

  public isLoggedIn(): boolean {
    return this.accessToken != null;
  }
}
