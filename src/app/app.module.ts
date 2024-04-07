import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LivresComponent } from './components/livres/livres.component';
import { LivresCardComponent } from './components/livres-card/livres-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArchiveService } from './services/archive.service';
import { ArchiveResolver } from './resolvers/livres.resolver';
import { HttpClientModule } from '@angular/common/http';
import { SingleArchiveComponent } from './components/single-archive/single-archive.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserService } from './services/user.service';
import { LoginComponent } from './components/login/login.component';
import { InitialPipe } from './pipes/initial.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LivresComponent,
    LivresCardComponent,
    SingleArchiveComponent,
    UserFormComponent,
    LoginComponent,
    InitialPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    ArchiveService,
    ArchiveResolver,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
