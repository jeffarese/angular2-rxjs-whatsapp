import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(private userService: UserService) {

  }

  ngOnInit() {
  }

}
