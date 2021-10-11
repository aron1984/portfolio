import { Component, OnInit } from '@angular/core';
import { InfowdService } from 'src/app/services/infowd.service';

@Component({
  selector: 'app-porjects',
  templateUrl: './porjects.component.html',
  styleUrls: ['./porjects.component.css']
})
export class PorjectsComponent implements OnInit {
  proyectos: any[] = [];
  

  constructor(public infoProject: InfowdService) { 

    this.proyectos = this.infoProject.project;
    console.log(this.proyectos)
    
  }

  ngOnInit(): void {
  }

}
