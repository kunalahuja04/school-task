import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { adminUsers } from '../shared/admins';
import { IAdminUser } from 'src/types/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private _router: Router) {}
  error?: string;
  form: FormGroup = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  submit() {
    const randomNumber = Math.floor(Math.random() * 3);
    const user: IAdminUser = {
      id: randomNumber,
      userName: this.form.get('userName')?.value,
      password: this.form.get('password')?.value,
    };
    const userExists = adminUsers.some(adminUser => 
      adminUser.userName === user.userName && adminUser.password === user.password
    );
    if (userExists) {
      this._router.navigate(['/home']);
    } else {
      this.error = 'User does not exist or invalid credentials!';
    }
  }
}
