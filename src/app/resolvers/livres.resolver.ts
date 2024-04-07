import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ArchiveService } from "../services/archive.service";
import { Livre } from "../models/archive.model";

@Injectable()
export class ArchiveResolver implements Resolve<Livre[]>{
    constructor(private archiveService : ArchiveService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<Livre[]>{
        return this.archiveService.getAllLivres()
    }
}