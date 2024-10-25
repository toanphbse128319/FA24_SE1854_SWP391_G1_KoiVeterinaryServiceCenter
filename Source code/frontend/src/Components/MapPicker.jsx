import '@geoapify/geocoder-autocomplete/styles/round-borders.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl from 'maplibre-gl';
import './Styling/Map.css'

import React, { useState, useRef, useEffect } from "react";

//setDistance is the setter for distance as there's no way to return the result
export default function Map( {setDistance}){
    let marker = useRef(null); 
    const mapContainer = useRef(null);
    const map = useRef(null);
    let lng = useRef(106.84452525554275);
    let lat = useRef(10.846653659695292);
    const zoom = 18;
    const APIKey = import.meta.env.VITE_GEOAPIFY_APIKEY;
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
        if (marker) {
            marker.remove();
            lng.current = e.lngLat.lng;
            lat.current = e.lngLat.lat;
            marker.setLngLat([lng.current, lat.current]);
            marker.addTo(map.current);
        }
        //this line below will get result in syncronous function
        //CalculateDistance( { lng: lng.current, lat: lat.current } ).then( result => console.log( result ) );
        CalculateDistance( { lng: lng.current, lat: lat.current } ).then( result => setDistance( result ) );
    }

    return (
        <div className="map-wrap">
        <div ref={mapContainer} className="map" />
        </div>
    );
}

async function CalculateDistance( {lng, lat} ){
    const APIKey = import.meta.env.VITE_GEOAPIFY_APIKEY;
    const currentLng = import.meta.env.VITE_HEADQUARTER_LNG;
    const currentLat = import.meta.env.VITE_HEADQUARTER_LAT;
    let url = `https://api.geoapify.com/v1/routing?waypoints=${currentLat},${currentLng}|${lat},${lng}&mode=medium_truck&apiKey=${APIKey}`    
    const response = await fetch(url).catch( error => console.error(error) );
    const json = await response.json();
    return json.features[0].properties.distance ;
}

