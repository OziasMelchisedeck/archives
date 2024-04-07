import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Livre } from "../models/archive.model";
import { Observable, map, of, tap } from "rxjs";

@Injectable()
export class ArchiveService{
    livres!: Livre[];
    currentLivre!:Livre;
    loadedLivres = false;
    constructor(
        private http : HttpClient
    ){}

    getAllLivres(){
        if(this.loadedLivres == true){
            return of (this.livres)
        }else{
            return this.http.get<Livre[]>(
                `${environment.apiUrl}/livres/`
            ).pipe(
                map((response:any) =>response.Livres
                ),
                tap((data)=>{
                    this.livres = data;
                    this.loadedLivres = true
                })
            )
        }
    }
}