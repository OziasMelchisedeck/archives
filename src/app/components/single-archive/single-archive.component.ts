import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Livre } from 'src/app/models/archive.model';
import { ArchiveService } from 'src/app/services/archive.service';

@Component({
  selector: 'app-single-archive',
  templateUrl: './single-archive.component.html',
  styleUrls: ['./single-archive.component.scss']
})
export class SingleArchiveComponent implements OnInit {
  livre!:Livre;
  livres!: Livre[];
  resultats:any[]=[];
  type = "Général";
  typeCtrl!:FormControl;
  price = Math.floor(Math.random() * (5000 - 500 + 1)) +500;
  constructor(
    private archiveService : ArchiveService,
    private form : FormBuilder
  ){}
  ngOnInit(): void {
    this.typeCtrl = this.form.control("Général");
    console.log(this.archiveService.currentLivre);
    this.livre = this.archiveService.currentLivre;
    this.livres = this.archiveService.livres
    this.resultats = this.similarRecommandations(this.livre, this.livres);
    this.typeCtrl.valueChanges.subscribe(value => {
      this.customRecommandations(value)
    })
  }

  similarRecommandations(livre: Livre, livres: Livre[]){
    let Recommandations: any[]=[];
    livres.forEach((elt)=>{
      if(livre._id != elt._id){
        let score = 0;
        // score = score + Math.abs(parseInt(livre.Date.toString().split("-")[0])-parseInt(elt.Date.toString().split("-")[0]))
        score = score + livre.Autres.filter((element) => elt.Autres.includes(element) ).length
        if(livre.Creator === elt.Creator){score = score + 1}
        // score = score + Math.abs(livre.Vues - elt.Vues);
        Recommandations.push({distance : score, livre:elt})
      }
    })
    // console.log(Recommandations.sort((a, b)=>(b.distance ?? 0) - (a.distance ?? 0)).slice(0, 10));
    return  Recommandations.sort((a, b)=>(b.distance ?? 0) - (a.distance ?? 0)).slice(0, 10);
  }
  
  changeLivre(livre :Livre){
    this.archiveService.currentLivre = livre;
    this.livre = livre;
    this.resultats = this.similarRecommandations(this.livre, this.livres);
  }

  customRecommandations(value : string){
    
    if(value == "Général"){
       this.resultats = this.similarRecommandations(this.livre, this.livres);
    }
    else if(value == "Les plus vus"){
      this.resultats = this.similarRecommandations(this.livre, this.livres).sort((a, b)=>(b.livre.Vues ?? 0) - (a.livre.Vues ?? 0));
    }
    else if(value == "Les plus récents"){
    this.resultats = this.similarRecommandations(this.livre, this.livres).sort((a, b)=>(parseInt(b.livre.Date.toString().split("-")[0] )?? 0) - parseInt(a.livre.Date.toString().split("-")[0] ))
    }
  }

}
