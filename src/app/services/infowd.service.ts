import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoWeb } from '../interface/infoweb.interface';
import { General } from './general';


@Injectable({
  providedIn: 'root'
})
export class InfowdService {
  
 
  public persona: any [] = [];
  url: string;

  
  constructor( private http: HttpClient) { 

    console.log("servicio de infoPagina listo")
    this.url = General.url;
    this.cargarPersona(); 
   
   }

   private cargarPersona(){

    //leer peticion a base de datos firebird
    this.http.get('https://portafolio-html-afca8-default-rtdb.firebaseio.com/person.json')
      .subscribe ( (res: any) => {  // se agrega ( :any) para decirle que la respuesta puede ser cualquier tipo. 
        console.log(res);

        this.persona = res;
        console.log(this.persona);
      },
      
        error=>{
          console.log(<any>error);
      });
      
   }
}