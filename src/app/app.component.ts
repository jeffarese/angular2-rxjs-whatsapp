import { Component } from '@angular/core';
import { UserService } from './core/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private user;

  constructor(private userService: UserService) {
    this.userService.userSource$.subscribe((user)=> {
      this.user = user;
    });
  }
  login() {
    this.userService.login();
  }
}
