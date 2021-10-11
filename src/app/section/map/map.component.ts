import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import * as Mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  
  accessToken: any;
  mapa1!: Mapboxgl.Map;
  

  constructor() {
    
   }

  ngOnInit (){
    
    (Mapboxgl as typeof Mapboxgl).accessToken = environment.mapboxKey;

    this.mapa1 = new Mapboxgl.Map({
    container: 'map-mb', // container ID
    style: 'mapbox://styles/ronconialejandro/ckukr9xij8ei319nyp7shtvnc', // style URL
    center: [-60.486567, -31.741975], // starting position [lng, lat]
    zoom: 11 // starting zoom
    });
    
        // Set marker options.
    const marker = new Mapboxgl.Marker({
      color: "#49ca69",
      draggable: true
    }).setLngLat([-60.486567, -31.741975])
      .addTo(this.mapa1);

      
  }

}

