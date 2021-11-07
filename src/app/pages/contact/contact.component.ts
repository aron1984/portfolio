import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public formContact!: FormGroup;
  
  constructor( ) {
    
   }

  ngOnInit(): void {
     /* this.formContact = this.formBuilder.group({
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
    })  */
  }

  /* send(): any {
    console.log("Message sent:")
    console.log(this.formContact.value);
    

  } */
 
}



/* <form action="https://formsubmit.co/your@email.com" method="POST">
     <input type="text" name="name" required>
     <input type="email" name="email" required>
     <button type="submit">Send</button>
</form> */