import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
const mapKey = environment.mapKey;

declare var mapboxgl: any; // Avoid the mapboxgl higlight error

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})


export class MapComponent implements OnInit {

  @Input() coords: string;
  @ViewChild('map', { static: true }) map;

  constructor() { }

  ngOnInit() {
    console.log( this.coords );

    const latLng = this.coords.split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);


    mapboxgl.accessToken = mapKey;
    const map = new mapboxgl.Map({
      container: this.map.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ lng, lat ],
      zoom: 15
    });

    const marker = new mapboxgl.Marker()
                               .setLngLat( [ lng, lat ])
                               .addTo( map );

  }

}
