import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/User.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   isExist: boolean;
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.loginForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]]

    });
  }
  ngOnInit() {

  }
  onSubmit() {
    console.log("submit");
    this.isExist = true;
    if (this.loginForm.valid) {
      let res = this.userService.login(this.loginForm.get('userName').value, this.loginForm.get("password").value);
      res.subscribe(res => {
        console.log(res);
        if (res) {
          localStorage.setItem("user", JSON.stringify(res));
          this.router.navigate(['bookStore/products']);
        }
        else{
          this.isExist = false;
        }
      },
        err => {
          console.log("error");
          console.log(err);
        })
    }
  }
  get userName() {
    return this.loginForm.get('userName');
  }
  get password() {
    return this.loginForm.get("password");
  }
}
