import '@geoapify/geocoder-autocomplete/styles/round-borders.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import maplibregl from 'maplibre-gl';
import './Styling/Map.css'

import { GeoapifyContext, GeoapifyGeocoderAutocomplete } from '@geoapify/react-geocoder-autocomplete';
import React, { useRef, useEffect } from "react";

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
    const mapContainer = useRef(null);
    const map = useRef(null);
    const lng = 106.84452525554275;
    const lat = 10.846653659695292;
    const zoom = 4;
    const APIKey = "1e375620e6474ac2b7bd4eb2570e3091";
    const url = "https://maps.geoapify.com/v1/styles/osm-carto/style.json?";
    const style = "osm-bright";

    useEffect(() => {
        if( map.current ) return; //Stop map from initialing twice

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: `${url}style=${style}&apiKey=${APIKey}`,
            center: [lng, lat],
            zoom: zoom
        });
        
    }, [APIKey]);

    return (
        <div className="map-wrap">
            <div ref={mapContainer} className="map" />
        </div>
    );
}
