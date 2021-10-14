import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'leaflet';
import { InfoWeb } from '../interface/infoweb.interface';
import { General } from './general';



@Injectable({
  providedIn: 'root'
})
export class InfowdService {
  
 
  public persona: any [] = [];
  public project: any [] = [];
  url: string;
  

  
  constructor( private http: HttpClient) { 

    console.log("servicio de infoPagina listo")
    this.url = General.url;
    this.cargarPersona(); 
    this.getProject();
   
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

   private getProject(){
     this.http.get(this.url+'projects.json')
      .subscribe( (res:any) => {
        /*console.log(res);*///funcciona y por eso lo desactivo

        this.project = res;
       /* console.log(this.project); *///Esto funciona y por eso lo desavtio

      },
        error=>{
          console.log(<any>error);
        });
   }

   
}