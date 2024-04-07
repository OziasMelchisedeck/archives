import { Component, OnInit } from '@angular/core';
import {Genres, Annees, Pays, Continents, Auteurs} from "../livres/tableaux"
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ArchiveService } from 'src/app/services/archive.service';
import { Livre } from 'src/app/models/archive.model';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-livres',
  templateUrl: './livres.component.html',
  styleUrls: ['./livres.component.scss']
})
export class LivresComponent implements OnInit {
 
  Genres = Genres;
  Annees = Annees;
  Pays = Pays;
  Continents = Continents;
  Auteurs = Auteurs;
  critereCtrl!: FormControl;
  filtreCtrl! : FormControl;
  searchCtrl! : FormControl;
  resultats!: any[]
  livres!: Livre[];
  filtres!: any[];

  user!:User;
  token!:string;
  isUser = false;

  constructor(
    private form : FormBuilder,
    private route : ActivatedRoute,
    private archiveService : ArchiveService,
    private userService : UserService
  ){}

  ngOnInit(): void {
    this.userService.autoConnect();
    this.initCtrl();
    this.route.data.subscribe((data: any) => {
      // Ici, vous pouvez manipuler les données renvoyées par le resolver
      // Pour l'exemple, nous supposerons que les données sont stockées dans data.votreResolverData
      // Vous pouvez faire ce que vous voulez avec les données ici...

      // Ensuite, indiquez que les données sont chargées en passant la variable à true
    });
    this.livres = this.archiveService.livres;
    this.resultats = this.livres;
    this.filtres = [];
    this.user = this.userService.user;
    this.token = this.userService.token;
    this.initSearch();
    this.changesValue();
    // console.log(this.user);
    
  }
  initCtrl(){
    this.critereCtrl = this.form.control("Critères");
    this.filtreCtrl = this.form.control("Filtres");
    this.searchCtrl = this.form.control("");
  }
  initSearch(){
    if(this.token!=""){
      this.resultats = this.getLivresOfUser()
    }else{
      this.search();
    }
  }
  changesValue(){
    this.critereCtrl.valueChanges.subscribe(()=> {
      this.search();
    })
    this.filtreCtrl.valueChanges.subscribe(()=>{
      this.search();
    })
    this.searchCtrl.valueChanges.subscribe(()=>{
      this.search();
    })
  }
  getFiltres(){
    if(this.critereCtrl.value!="Critères"){
      if(this.critereCtrl.value == "Genres"){
        this.filtres = Genres.sort();
      }
      else if(this.critereCtrl.value == "Pays"){
        this.filtres = Pays.sort()
      }
      else if(this.critereCtrl.value == "Continents"){
        this.filtres = Continents.sort()
      }
      else if(this.critereCtrl.value == "Annees"){
        this.filtres = Annees.sort()
      }
      else if(this.critereCtrl.value == "Auteurs"){
        this.filtres = Auteurs.sort()      }
      else{
        this.filtres =[]
      }
    }
    else{
      this.filtres =[]
    }
  }

GeneriqueSearch(value : string, livres : Livre[]){
  let results = this.livres   
  results = livres.filter((livre) => livre.Creator.toLowerCase().includes(value) || livre.Date.toString().split("-")[0] == value || livre.Title.toLowerCase().includes(value) || livre.Autres.some((autre) => autre.toLowerCase().includes(value)));
  return results
}

CriteriaSearch(){
  let results = this.livres   
  if(this.critereCtrl.value == "Auteurs"){
    results = this.livres.filter((livre) => livre.Creator.toLowerCase().includes(this.filtreCtrl.value.toLowerCase()))
  }
  else if(this.critereCtrl.value == "Annees"){
    results = this.livres.filter((livre) => livre.Date.toString().split('-')[0] == this.filtreCtrl.value)
  }
  else{
    results = this.livres.filter((livre) => livre.Autres.some((autre) => autre.toLowerCase().includes(this.filtreCtrl.value.toLowerCase())))
  }
  return results
}

  search(){
    let value = this.searchCtrl.value.toLowerCase();
    let results = this.livres    
    
    if(this.filtres.length == 0 && value !=""){
      results = this.GeneriqueSearch(value, this.livres);
    }
    else if(this.filtres.length != 0 && (value =="" || value ==" ")){
      results = this.CriteriaSearch();
    }
    else if(this.filtres.length != 0 && (value !="" || value !=" ")){
      results = this.CriteriaSearch();
      results = this.GeneriqueSearch(value, results)
    }else{
      if(this.token !=""){
       results = this.getLivresOfUser()
      }
    }    
    this.resultats = results
    // console.log(results);
    
  }

  getLivresOfUser(){
    this.isUser = true;
    const resultats = this.livres.filter((livre) => { return (
      (this.user.Auteurs && livre.Autres.some(auteur => this.user.Auteurs?.includes(auteur))) ||
      (this.user.Genres && livre.Autres.some(genre => this.user.Genres?.includes(genre))) || 
      (this.user.Continents && livre.Autres.some(continent => this.user.Continents?.includes(continent))) || 
      (this.user.Pays && livre.Autres.some(pays => this.user.Pays?.includes(pays))) || 
      (this.user.Annees && livre.Autres.some(date => this.user.Annees?.includes(date.toString().split("-")[0])))
    )}
  ).sort((a,b) => (b.Vues ?? 0) - (a.Vues ?? 0))
  return resultats;
  }
}
