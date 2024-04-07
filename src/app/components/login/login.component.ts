import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  mailCtrl!: FormControl;
  passwordCtrl!:FormControl;
  loginForm!:FormGroup;

  constructor(
    private form:FormBuilder,
    private userService : UserService
  ){}
  ngOnInit(): void {
    this.initCtrl();
    this.initForm();
  }

  private initCtrl(){
    this.mailCtrl = this.form.control("user@gmail.com");
    this.passwordCtrl = this.form.control("password");
  }
  private initForm(){
    this.loginForm = this.form.group({
      Email : this.mailCtrl,
      Password : this.passwordCtrl
    })
  }
  login(){
    this.userService.login(this.loginForm.value).subscribe((res)=>{
      this.userService.user = res.user
      localStorage.setItem('token', res.token)
      localStorage.setItem('user', JSON.stringify(res.user));
      this.userService.connected = true;
    })
  }
}
