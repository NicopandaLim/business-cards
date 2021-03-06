// Xiao Lin(ID:1806915)
// AppUrl: https://github.com/NicopandaLim/business-cards.git
import { Component } from '@angular/core';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'business-cards';
  constructor(private loginService: LoginService) {

  }
  logout() {
    this.loginService.signOut();
  }
}
