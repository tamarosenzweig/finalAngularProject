import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/User.model';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  localStorage=localStorage;
  JSON=JSON;
  user: User;
  constructor(private userService: UserService) {
    this.user = this.userService.user;
  }

  ngOnInit() {
  }

}
