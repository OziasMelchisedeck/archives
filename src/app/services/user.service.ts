import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { User } from "../models/user.model";

@Injectable()
export class UserService {
    user!:User;
    token!:string;
    connected = false;
    constructor(
        private http : HttpClient
    ){}

    createUser(user : any){
        return this.http.post<any>(`${environment.apiUrl}/livres/auth/signup`, user)
        .pipe(
            tap((res) =>
            {console.log(res);}
            )
        )
    }

    login(info :any){
        return this.http.post<any>(`${environment.apiUrl}/livres/auth/login`, info)
        .pipe(
            tap((res) =>
            {console.log(res);}
            )
        )
    }

    logout(){
        const token = localStorage.getItem('token'); // Récupérer le token depuis le stockage local
        console.log(token);
        
        const headers = new HttpHeaders({
          'authorization': `${token}` // Ajouter l'en-tête d'autorisation avec le token
        });
        console.log(headers);
        
        return this.http.get(`${environment.apiUrl}/livres/auth/logout`, { headers: headers })
    }

    autoConnect(){
        this.user = JSON.parse(localStorage.getItem('user') || '{}');
        this.token = (localStorage.getItem("token") || "");
        if(this.token !=""){
            this.connected = true
        }
    }
}