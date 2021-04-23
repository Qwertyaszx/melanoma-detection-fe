import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /**
   * An object representing the user for the login form
   */
  public user: any;
 
  constructor(public _authService: AuthService, private _imageService: ImageService,  private _router: Router) { }
 
  ngOnInit() {
    this.user = {
      username: '',
      password: ''
    };
  }
 
  login() {
    this._authService.login({'username': this.user.username, 'password': this.user.password});
  }
 
  refreshToken() {
    this._authService.refreshAccessToken();
  }
 
  logout() {
    this._authService.logout();
  }

}
