import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import * as Mapboxgl from 'mapbox-gl';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

import { InfowdService } from 'src/app/services/infowd.service';
import { cinesG } from 'src/assets/data/cinesgeoson';



@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  accessToken: any;
  mapa!: Mapboxgl.Map;
  json: any;
  
  

  constructor(
    private http: HttpClient,
    public infowe : InfowdService,
    
) { }
    

  ngOnInit(): void {

    (Mapboxgl as typeof Mapboxgl).accessToken = environment.mapboxKey;

    this.mapa = new Mapboxgl.Map({
    container: 'mapa-mapbox', // container ID
    style: 'mapbox://styles/ronconialejandro/ckukqivcb474l19mw85tohnq7', // style URL
    center: [-60.486567, -31.741975], // starting position [lng, lat]
    zoom: 13 // starting zoom
    });
    
     // Set marker options.
    const marker = new Mapboxgl.Marker({
      color: "#16c4f0",
      draggable: true
    }).setLngLat([-60.486567, -31.741975])
      .addTo(this.mapa);
    
     
      // Popup markers
     const popup = new Mapboxgl.Popup({ closeOnClick: false })
     .setLngLat([-60.486567, -31.741975])
     .setHTML('<h4>Hello World!</h4><p>Welcome to my web site.</p>')
     .addTo(this.mapa);



     // ================= MAPA LEAFLET ==============//

     var map = L.map('mapa-leaflet').setView([-31.741975, -60.486567], 13);

     L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
      maxZoom: 20,
      attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    
      }).addTo(map);

      // seteamos el icono
      var myIcon = L.icon({
        iconUrl: '../../assets/img/icon_map1_web.svg',
        iconSize: [38, 38], /*tamaño de lado por lado*/
        iconAnchor: [40, 50], /*posicion horizontal y vertical respectivamente*/
        popupAnchor: [-3, -50],
        /*shadowUrl: 'my-icon-shadow.png',*/
        shadowSize: [68, 95],
        shadowAnchor: [22, 94]
      });

      // añadimos un marcador + el icono creado antes
      L.marker([-31.741975, -60.486567],{icon: myIcon}).addTo(map)
          .bindPopup('Map created with Leaflett.<br> Easily customizable -  by Alejandro.')
          .openPopup();

          // creamos un círculo simulando un área de interés//

          var circle = L.circle([-31.741975, -60.486567], {
            color: '#1565C0',
            fillColor: '#27AE60',
            fillOpacity: 0.5,
            radius: 600
        }).addTo(map);


        // OTRO PUNTO DE INTERES
        /*==========PLAZA DE MAYO==========*/
        L.marker([-31.733190, -60.529610],{
          icon: myIcon,
          draggable:true,
          title: 'This marker is movable.',
          opacity: 0.5
          }).addTo(map)
          .bindPopup('This marker is movable.<br>Try to move it all over the map.<p><img class="imgPopup" src="../../assets/img/wolverine_original.jpg"></p>')
          .openPopup();

        /* área de influencia */ 
          var circle = L.circle([-31.733190, -60.529610], {
            color: '#1565C0',
            fillColor: '#000000',
            fillOpacity: 0.5,
            radius: 1200
        }).addTo(map);




        /*==========COPIO Y PEGO UN ARCHIVO GEOJSON Y LO HAGO VARIABLE===========*/
        // NOTE: ME FALTA IMPORTAR EL .GEOJSON Y PODER TRABAJARLO.

        //creamos una variable GeoJson que tambien podríamos importarla de un archivo externo.

        var myGeoJson: any = {
          "type": "FeatureCollection",
          "name": "cines_parana",
          "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
          "features": [
          { "type": "Feature", "properties": { "id": 1, "name": "Cine Círculo Paraná", "direccion": "Andrés Pazos 339", "url": "cine_circulo" }, "geometry": { "type": "Point", "coordinates": [ -60.524877855641378, -31.733216169914318 ] } },
          { "type": "Feature", "properties": { "id": 2, "name": "Cine Rex Paraná", "direccion": "Monte Caseros 266","url": "cine_rex" }, "geometry": { "type": "Point", "coordinates": [ -60.530600694891064, -31.735428750822436 ] } },
          { "type": "Feature", "properties": { "id": 3, "name": "Inst. Audiovisual ER", "direccion": "Greg. Mat. de San Martín 880","url": "instituto_audiovisual" }, "geometry": { "type": "Point", "coordinates": [ -60.523223480277458, -31.721803854549616 ] } }
          ]
          }

         
          
         
          // NOTE: solucionado el cambio de iconos para los geojson
          // SE CREA UNA FUNCION DE CREAR ICONO
      function createCustomIcon (_feature: any, latlng: L.LatLngExpression) {
          var myIconFilm = L.icon({
            iconUrl: '../../assets/img/film.svg',
            iconSize: [20, 20], /*tamaño de lado por lado*/
            iconAnchor: [40, 50], /*posicion horizontal y vertical respectivamente*/
            popupAnchor: [-3, -50],
            
            shadowSize: [68, 95],
            shadowAnchor: [22, 94]
        })
        return L.marker(latlng, { icon: myIconFilm })
      }
       // create an options object that specifies which function will called on each feature
       // SE CREA UNA VARIABLE DE OPCIONES, QUE SE PASARÁ COMO SEGUNDO ARGUMENTO DESPUES.
       let myLayerOptions = {
        pointToLayer: createCustomIcon,
        onEachFeature: function (feature:any, layer:any) {
          layer.bindPopup('<h3>'+feature.properties.name+'</h3><p>Dirección: '+feature.properties.direccion+'</p>'+'<p><img class="imgPopup" src="../../assets/img/'+feature.properties.url+'.jpg">'+'</p>');
        }
        }
      

      // create the GeoJSON layer
      // SE PASA COMO SEGUNDO ARGUMENTO myLayerOptions que habiamo configuarado antes.
      L.geoJSON(myGeoJson, myLayerOptions).addTo(map)

       // onEachFeature es una funcion de Leaflet para leer las propiedades de todos los elementos y así poder mostrar en pantalla
/*
       var layerGroup = L.geoJSON(myGeoJson,  {
        onEachFeature: function (feature, layer) {
          layer.bindPopup('<h3>'+feature.properties.name+'</h3><p>name: '+feature.properties.direccion+'</p>'+'<p><img class="imgPopup" src="../../assets/img/'+feature.properties.url+'.jpg">'+'</p>');
        }
        }).addTo(map);
*/
      
       
      
        /*=========== OTRA OPCIÓN PARA LLAMAR AL NUESTRO GEOJSON ============*/
        // NOTE: no puede hacer funcionar importar el archivo geojson
       /* 
        this.http.get(geojson)
          .subscribe((json: any) => {
          console.log(json);

          this.json = json;

          });

          L.geoJSON(this.json, {
          onEachFeature: function (feature, layer) {
            layer.bindPopup('<h1>'+feature.properties.name+'</h1><p>name: '+feature.properties.direccion+'</p>'+'<p><img class="imgPopup" src="../../assets/img/'+feature.properties.url+'.jpg">'+'</p>');
          }
          }).addTo(map);
*/
        

          
       
        
   
           
        
    
  }
 

}


