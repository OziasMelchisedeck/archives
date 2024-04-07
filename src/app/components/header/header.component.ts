import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  viewMenu = false;
  user!: User;
  connected = false;
  token!:string;
  constructor(
    private router : Router,
    public userService : UserService
  ){}
  ngOnInit(): void {
    this.userService.user = JSON.parse(localStorage.getItem('user') || '{}');
    if((localStorage.getItem('token') || "") !=""){
      this.userService.connected = true
    }
  }
  connection(){
    if(this.userService.connected == true){
      this.connected = true
    }
  }

  displayMenu(){
    if(this.viewMenu == true){
      this.viewMenu = false;
    }else{
      this.viewMenu = true;
    }
  }
  signup(){
    this.router.navigateByUrl("signup");
    this.viewMenu = false;
  }
  login(){
    this.router.navigateByUrl("login");
    this.viewMenu = false;
  }
  logout(){
    this.userService.logout().pipe(
      tap(()=>{
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        this.userService.user = {Nom:"", Prenom:"",Login:"", Password:"", Email:""};
        this.userService.connected = false;
      })
    ).subscribe((res)=>{
      console.log(res);
    })
    this.viewMenu = false;
  }
}
