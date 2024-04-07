import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LivresComponent } from './components/livres/livres.component';
import { ArchiveResolver } from './resolvers/livres.resolver';
import { SingleArchiveComponent } from './components/single-archive/single-archive.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"archives", component:LivresComponent, resolve:{ArchiveResolver}},
  {path: "single", component:SingleArchiveComponent},
  {path : "signup", component:UserFormComponent},
  {path : "login", component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
