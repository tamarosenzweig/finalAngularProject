import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { User } from '../../shared/models/User.model';
import { UserService } from '../../shared/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
// import {ValidateId}from ''
// <!-- public firstfirstName: string,
// public lasstfirstName: string,
// public userfirstName: string,
// public password: string,
// public img:string -->
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: User;
  users: User[];
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]]
    });
  }
  ngOnInit() {

  }
  onSubmit() {
    if (this.registerForm.valid) {
      this.user = JSON.parse(JSON.stringify(this.registerForm.value));
      this.userService.register(this.user);
      this.router.navigate(['bookStore/products']);
    }
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }
  get password() {
    return this.registerForm.get("password");
  }
  get userName() {
    return this.registerForm.get("userName");
  }



}
