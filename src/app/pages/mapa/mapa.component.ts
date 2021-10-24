import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import * as Mapboxgl from 'mapbox-gl';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';


import { InfowdService } from 'src/app/services/infowd.service';
import * as Geo from '../../../assets/data/cinesgeoson'; //importo mi archivo geojson local
import { cinesG } from '../../../assets/data/cinesgeoson';
import { geoRecorrido } from '../../../assets/data/geolines';
import { barrioAtraa } from '../../../assets/data/geoarea';



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

     //1 - marcadores y layerGroup (no llevan addTo map)

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
      var marcador = L.marker([-31.741975, -60.486567],{icon: myIcon})
          .bindPopup('Map created with Leaflett.<br> Easily customizable -  by Alejandro.')
          .openPopup();

         // OTRO PUNTO DE INTERES
        /*==========PLAZA DE MAYO==========*/
      var plaza = L.marker([-31.733190, -60.529610],{
        icon: myIcon,
        draggable:true,
        title: 'This marker is movable.',
        opacity: 0.5
        })
        .bindPopup('This marker is movable.<br>Try to move it all over the map.<p><img class="imgPopup" src="../../assets/img/wolverine_original.jpg"></p>')
        .openPopup();

        /* área de influencia */ 
      var circle = L.circle([-31.733190, -60.529610], {
            color: '#1565C0',
            fillColor: '#000000',
            fillOpacity: 0.5,
            radius: 1200
        });

      var lugares = L.layerGroup([circle, plaza, marcador]);

                  
         
          // NOTE: solucionado el cambio de iconos para los geojson
          // SE CREA UNA FUNCION DE CREAR ICONO
      function createCustomIcon (_feature: any, latlng: L.LatLngExpression) {
        var myIconFilm = L.icon({
          iconUrl: '../../assets/img/film.svg',
          iconSize: [20, 20], /*tamaño de lado por lado*/
          iconAnchor: [15, 20], /*posicion horizontal y vertical respectivamente: puede que al hacer zoom se vea desplazado, hay que tener cuidado.*/
          popupAnchor: [-3, -25],
          
          
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
    

      //--------- Creamos una variable y le asignamos el nombre del geojson importado.
      var newGeoJson: any = cinesG;
      var dato1 = L.geoJSON(newGeoJson, myLayerOptions)/*.addTo(map);*/

      //----------Creamos una variable para Lineas y la importamos de geoRecorrido----------
      var newGeoLines: any = geoRecorrido; 
      var dato2 = L.geoJSON(newGeoLines, 
        {
          style: function (feature:any) {
            return {color: feature.properties.stroke}
        },})/*.addTo(map);*/

      //----------Creamos una variable para poligonos-------
      var newGeoPol: any = barrioAtraa;     

      let myLayerOptionsPol = {
        style: function (feature:any) {
          return {color: feature.properties.color,
                  fillColor:feature.properties.stroke}
      },
          onEachFeature: function (feature:any, layer:any) {
          layer.bindPopup('<h5>'+feature.properties.name+'</h5S>');
        }
        }

    var dato3 = L.geoJSON(newGeoPol, myLayerOptionsPol)/*.addTo(map);*/

    var geometria = L.layerGroup([dato1, dato2, dato3]);

     //2 - var mapa1 = L.tilLayer (sacamos addtoMap del final)

     var mapabase = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
      maxZoom: 20,
      attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    
      });

     //3 - var map = L.map configurando las layers

     var map = L.map('mapa-leaflet',{
       center: [-31.741975, -60.486567],
       zoom: 13,
       layers:[mapabase,lugares]
     });

     //4 - Configurar BASEMAPS y overays en variables.

    var baseMaps = {
      "Mapa base": mapabase
      
    };
    
    var overlayMaps = {
        "Places": lugares,
        "Examples": geometria
    };
     //5 - L.control.layer(basemaps, overlay).addTo(map)

     L.control.layers(baseMaps, overlayMaps).addTo(map);

     

     // REVIEW: Faltaría agregar las coordenadas del mouse, pero no es TAN IMPORTANTE POR AHORA. SALVO PARA UN PROYECTO WEB RELACIONADO A GEOGRAFIA.

    
    //6 - Agregamos coordenadas al mouse

    //L.control.mousePosition().addTo(map);

      

      
       // onEachFeature es una funcion de Leaflet para leer las propiedades de todos los elementos y así poder mostrar en pantalla
/*
       var layerGroup = L.geoJSON(myGeoJson,  {
        onEachFeature: function (feature, layer) {
          layer.bindPopup('<h3>'+feature.properties.name+'</h3><p>name: '+feature.properties.direccion+'</p>'+'<p><img class="imgPopup" src="../../assets/img/'+feature.properties.url+'.jpg">'+'</p>');
        }
        }).addTo(map);
*/
      
       
      
        /*=========== OTRA OPCIÓN PARA LLAMAR AL NUESTRO GEOJSON ============*/
        // NOTE: no puede hacer funcionar importar el archivo geojson del servidor.
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


