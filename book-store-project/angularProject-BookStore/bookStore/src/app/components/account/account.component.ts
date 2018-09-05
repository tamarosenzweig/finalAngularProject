import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/User.model';
import { UserService } from '../../shared/services/user.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  localStorage = localStorage;
  JSON = JSON;
  user: User;
  constructor(private userService: UserService, private router: Router) {
    this.user = this.userService.user;
  }
  ngOnInit() {
  }

  logOut() {
    this.userService.logOut();
    this.router.navigate(['/bookStore/home']);

  }
}
