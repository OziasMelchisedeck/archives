import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Livre } from 'src/app/models/archive.model';
import { ArchiveService } from 'src/app/services/archive.service';

@Component({
  selector: 'app-livres-card',
  templateUrl: './livres-card.component.html',
  styleUrls: ['./livres-card.component.scss']
})
export class LivresCardComponent implements OnInit {
@Input() livre!:Livre;

 constructor(
  private router:Router,
  private archiveService : ArchiveService
 ){}
  ngOnInit(): void {
  }
  goToSingle(){
    this.router.navigateByUrl("single");
    this.archiveService.currentLivre = this.livre;
  }
}
