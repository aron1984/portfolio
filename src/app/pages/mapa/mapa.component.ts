import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import * as Mapboxgl from 'mapbox-gl';
import * as L from 'leaflet';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  accessToken: any;
  mapa!: Mapboxgl.Map;

  constructor() { }

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
      color: "#f07816",
      draggable: true
    }).setLngLat([-60.486567, -31.741975])
      .addTo(this.mapa);
    

  }

}
