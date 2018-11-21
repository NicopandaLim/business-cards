import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard/dashboard.service';
declare var gtag: Function;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  timer: any;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private dashService: DashboardService, 
  ) { }

  ngOnInit() {
  }

  onLoginEmail(): void {
    if (this.validateForm(this.email, this.password)) {
      this.emailLogin(this.email, this.password);
    }
  }

  validateForm(email: string, password: string): boolean {
    if (email.length === 0) {
      return false;
    }

    if (password.length === 0) {
      return false;
    }

    if (password.length < 6) {
      return false;
    }
    return true;
  }

  emailLogin(email: string, password: string) {
    this.startTimer();
    this.loginService.loginWithEmail(this.email, this.password)
        .then(() => {
        gtag('event', 'Email login seccessfully!');
        this.dashService.addHistory('User Loged in using email');
        this.router.navigate(['/dashboard']);
      })
        .catch( error => {
          console.log(error);
          this.router.navigate(['/login']);
        });
  }

  startTimer() {
    this.timer = setTimeout(this.timeoutLogout.bind(this), 300000);
  }

  timeoutLogout() {
    console.log('5 mins is up, log out automatically.')
    this.dashService.addHistory("User loged out automatically for time up.")
    this.loginService.signOut();
  }

}
