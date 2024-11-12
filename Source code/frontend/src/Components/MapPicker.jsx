import '@geoapify/geocoder-autocomplete/styles/round-borders.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl from 'maplibre-gl';
import './Styling/Map.css'

import React, { useState, useRef, useEffect } from "react";

//setDistance is the setter for distance as there's no way to return the result
export default function Map({address, onChangeAddress, changed} ){
    let marker = useRef(null); 
    const mapContainer = useRef(null);
    const map = useRef(null);
    let lng = useRef(0);
    let lat = useRef(0);

    const zoom = 18;
    const APIKey = import.meta.env.VITE_GEOAPIFY_APIKEY;
    if( APIKey == null )
        console.error("Missing VITE_GEOAPIFY_APIKEY from .env");
    const url = "https://maps.geoapify.com/v1/styles/osm-carto/style.json?";
    const style = "osm-bright";

    function updateMarker({ latidude, longtidude }){
            lng.current = longtidude;
            lat.current = latidude;
        if (marker.current) {
            marker.current.remove();
            marker.current.setLngLat([longtidude, latidude]);
            marker.current.addTo(map.current);
        console.log(lat + ", " + lng );
        GetAddress({lng: lng.current, lat: lat.current}).then( result => {
            onChangeAddress(result);
        });
        }
    }

    useEffect(() => {
        if( map.current ){
            GetGeoLocation({address: address}).then( temp => {
                console.log( temp );
                if( marker.current ){
                    updateMarker({ latidude: temp[1], longtidude: temp[0]});
                }
                map.current.setCenter([temp[0], temp[1]]);
            })
            return; //Stop map from initialing twice
        }
        GetGeoLocation({address: address}).then( temp => {
            console.log( temp );
            if( marker.current ){
                updateMarker({ latidude: temp[1], longtidude: temp[0]});
            }
            map.current = new maplibregl.Map({
                container: mapContainer.current,
                style: `${url}style=${style}&apiKey=${APIKey}`,
                center: [lng.current, lat.current],
                zoom: zoom
            });
            map.current.addControl( new maplibregl.NavigationControl() );
            marker.current = new maplibregl.Marker({
                color: "#FF0000",
                draggable: false
            }).setLngLat([lng.current, lat.current])
                .addTo(map.current);
            map.current.on('click', (e) => {
                OnMapClick( e );
            });
            map.current.setCenter([temp[0], temp[1]]);
        })

    }, [lng, lat, zoom, changed]);

    function OnMapClick( e ){
        updateMarker({ latidude: e.lngLat.lat, longtidude: e.lngLat.lng})
        //this line below will get result in syncronous function
        //CalculateDistance( { lng: lng, lat: lat } ).then( result => console.log( result ) );
        // CalculateDistance( { lng: lng, lat: lat } ).then( result => setDistance( result ) );
    }

    return (
        <div className="map-wrap">
        <div ref={mapContainer} className="map" />
        </div>
    );
}

export async function GetGeoLocation( {address} ){
    if( address == null ){
        return [0.0, 0.0];
    }
    const APIKey = import.meta.env.VITE_GEOAPIFY_APIKEY;
    if( APIKey == null )
        console.error("Missing VITE_GEOAPIFY_APIKEY from .env");

    let url = `https://api.geoapify.com/v1/geocode/search?text=${address}&filter=countrycode:vn&limit=1&apiKey=${APIKey}`    
    const response = await fetch(url).catch( error => console.error(error) );
    if( !response.ok )
        return [0.0, 0.0];
    const json = await response.json();
    return [json?.features[0]?.properties.lon || 0, json?.features[0]?.properties.lat || 0 ];
}

export async function GetAddress( {lng, lat} ){
    if( lng == null || lat == null ){
        return "Unknown";
    }
    const APIKey = import.meta.env.VITE_GEOAPIFY_APIKEY;
    if( APIKey == null )
        console.error("Missing VITE_GEOAPIFY_APIKEY from .env");

    let url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&type=amenity&limit=1&apiKey=${APIKey}`    
    const response = await fetch(url).catch( error => console.error(error) );
    if( !response.ok )
        return "Unknown";
    const json = await response.json();
    
    return json.features[0].properties.formatted;
}

export async function CalculateDistance( {lng, lat} ){
    if( lng == 0.0 || lat == 0.0 )
        return 0;
    const APIKey = import.meta.env.VITE_GEOAPIFY_APIKEY;
    if( APIKey == null )
        console.error("Missing VITE_GEOAPIFY_APIKEY from .env");
    const currentLng = import.meta.env.VITE_HEADQUARTER_LNG;
    if( currentLng == null )
        console.error("Missing VITE_HEADQUARTER_LNG from .env");
    const currentLat = import.meta.env.VITE_HEADQUARTER_LAT;
    if( currentLat == null )
        console.error("Missing VITE_HEADQUARTER_LAT from .env");

    let url = `https://api.geoapify.com/v1/routing?waypoints=${currentLat},${currentLng}|${lat},${lng}&mode=medium_truck&apiKey=${APIKey}`    
    const response = await fetch(url).catch( error => console.error(error) );
    if( !response.ok )
        return 0;
    const json = await response.json();
    return json.features[0].properties.distance ;
}

