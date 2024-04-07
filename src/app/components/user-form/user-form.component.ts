import { Component, OnInit } from '@angular/core';
import {Genres, Annees, Pays, Continents, Auteurs} from "../livres/tableaux"
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ArchiveService } from 'src/app/services/archive.service';
import { UserService } from 'src/app/services/user.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  Genres = Genres;
  Annees = Annees;
  Pays = Pays;
  Continents = Continents;
  Auteurs = Auteurs;

  nomCtrl!:FormControl;
  prenomCtrl!:FormControl;
  loginCtrl!:FormControl;
  emailCtrl!:FormControl;
  passwordCtrl!:FormControl;
  cpassworCtrl!:FormControl;
  auteursCtrl!:FormControl;
  genresCtrl!:FormControl;
  continentsCtrl!:FormControl;
  paysCtrl!:FormControl;
  anneesCtrl!:FormControl;
  registerForm!:FormGroup;
  response = "";

  valid = false;
  constructor(
    private form:FormBuilder,
    private archiveServicee : ArchiveService,
    private userService : UserService
  ){}
  ngOnInit(): void {
    this.initCtrls();
    this.initForm();
  }
  private initCtrls(){
    this.nomCtrl = this.form.control("Nom", Validators.required);
    this.prenomCtrl = this.form.control("Prenom", Validators.required);
    this.loginCtrl = this.form.control("Login", Validators.required);
    this.emailCtrl = this.form.control("user@gmail.com", Validators.required);
    this.passwordCtrl = this.form.control("password", Validators.required);
    this.cpassworCtrl = this.form.control("password", Validators.required);
    this.auteursCtrl = this.form.control("");
    this.genresCtrl = this.form.control("");
    this.continentsCtrl = this.form.control("");
    this.paysCtrl = this.form.control("");
    this.anneesCtrl = this.form.control("");
  }

  private initForm(){
    this.registerForm = this.form.group({
      Nom : this.nomCtrl,
      Prenom : this.prenomCtrl,
      Login : this.loginCtrl,
      Password : this.passwordCtrl,
      Email : this.emailCtrl,
      Auteurs : this.auteursCtrl,
      Genres : this.genresCtrl,
      Pays : this.paysCtrl,
      Continents : this.continentsCtrl,
      Annees : this.anneesCtrl
    })
  }

  validateForm(){
    if(this.nomCtrl.value !="Nom" && this.prenomCtrl.value !="prenom" && this.loginCtrl.value !="Login" && this.emailCtrl.value !="user@gmail.com" && this.passwordCtrl.value === this.cpassworCtrl.value){
      this.valid = true
    }
    else{
      this.valid = false
    }
  }

  creer(){
    this.validateForm();
    if(this.valid){
      console.log(this.registerForm.value);
      this.userService.createUser(this.registerForm.value).pipe(
        tap((res)=>{
          if(res.message){
            this.response = "Echec adresse mail existante"
          }
          else{
            this.response = "Success";
            this.registerForm.reset();
            this.cpassworCtrl.reset();
          }
        })
      )
      .subscribe()
    }else{
      console.log("formulaire invalide");
    }
  }
  close(){
    this.response = "";
  }
}
