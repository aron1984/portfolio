import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public formContact!: FormGroup;
  
  constructor( private formBuilder: FormBuilder) {
    
   }

  ngOnInit(): void {
    this.formContact = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      email: ['', [
        Validators.required,
         Validators.email
        ]],
      message: ['', [
        Validators.required,
        Validators.minLength(10)
      ]]
    })
  }

  send(): any {
    console.log(this.formContact.value);
  }
 
}
