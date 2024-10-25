import '@geoapify/geocoder-autocomplete/styles/round-borders.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl from 'maplibre-gl';
import './Styling/Map.css'

import { GeoapifyContext, GeoapifyGeocoderAutocomplete } from '@geoapify/react-geocoder-autocomplete';
import React, { useState, useRef, useEffect } from "react";

//function MapPicker( {mapIsReadyCallback} ){
//    let address = "411 Nguyễn Văn Tăng, Long Thạnh Mỹ, Quận 9, Hồ Chí Minh, Vietnam";
//    let mapContainer;
//    useEffect(() => {
//        let ApiKey = "1e375620e6474ac2b7bd4eb2570e3091";
//        //let ApiKey = "temp";
//        
//        let mapStyle = "https://maps.geoapify.com/v1/styles/osm-carto/style.json";
//        let initialState = {
//            lng: 11,
//            lat: 49,
//            zoom: 4
//        };
//        let map = new Maplibre.Map( { 
//            container: mapContainer,
//            style: `${mapStyle}?apiKey=${ApiKey}`,
//            center: [initialState.lng, initialState.lat],
//            zoom: initialState.zoom
//        } );
//
//    }, [mapContainer]);
//
//    return (
//        <div className="map-container" ref={el => mapContainer = el}>
//        </div>
//    );
//}
//
//
//export default function Map() {
//
//  const mapIsReadyCallback = (map) => {
//    console.log(map);
//  };
//
//  return (
//    <MapPicker mapIsReadyCallback={mapIsReadyCallback}/>
//  );
//}
//

export default function Map(){
    let marker = useRef(null); 
    const mapContainer = useRef(null);
    const map = useRef(null);
    let lng = useRef(106.84452525554275);
    let lat = useRef(10.846653659695292);
    const zoom = 18;
    const APIKey = "1e375620e6474ac2b7bd4eb2570e3091";
    const url = "https://maps.geoapify.com/v1/styles/osm-carto/style.json?";
    const style = "osm-bright";

    useEffect(() => {
        if( map.current ){
            return; //Stop map from initialing twice
        }

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: `${url}style=${style}&apiKey=${APIKey}`,
            center: [lng.current, lat.current],
            zoom: zoom
        });

        map.current.addControl( new maplibregl.NavigationControl() );
        marker = new maplibregl.Marker({
            color: "#FF0000",
            draggable: false
        }).setLngLat([lng.current, lat.current])
            .addTo(map.current);
        map.current.on('click', (e) => {
            OnMapClick( e );
        });
    }, [lng, lat, zoom]);

    function OnMapClick( e ){
        console.log( marker );
        if (marker) {
            marker.remove();
            lng.current = e.lngLat.lng;
            lat.current = e.lngLat.lat;
            marker.setLngLat([lng.current, lat.current]);
            marker.addTo(map.current);
        }
        console.log('A click event has occurred at ' + e.lngLat);
    }

    return (
        <div className="map-wrap">
        <div ref={mapContainer} className="map" />
        </div>
    );
}

