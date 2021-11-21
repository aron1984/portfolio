import { Component, OnInit } from '@angular/core';
import { InfowdService } from 'src/app/services/infowd.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  

   constructor(public infowe : InfowdService) { 

    console.log(this.infowe);
  }

  ngOnInit(): void {
  }

}
