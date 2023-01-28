import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username='';
  password ='';
  errorMessage = 'Invalid Credentials';
  successMessage= 'Login Successful';
  invalidLogin = false;
  loginSuccess = false;

  constructor(
    private route: RouterModule,
    private router: Router,
    private authenticationService: AuthenticationService) {   }

  ngOnInit() {
  }

  handleLogin() {
    this.authenticationService.authenticationService(this.username, this.password).subscribe((result)=> {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';
      this.router.navigate(['/app-root']);
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });      
  }
}