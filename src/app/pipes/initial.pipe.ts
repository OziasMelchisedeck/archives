import { Pipe, PipeTransform } from "@angular/core";
import { User } from "../models/user.model";


@Pipe({
    name:'initial'
})
export class InitialPipe implements PipeTransform{
    transform(user : User) : string{
        return user.Nom.charAt(0).toUpperCase() + user.Prenom.charAt(0).toUpperCase()
    }
}