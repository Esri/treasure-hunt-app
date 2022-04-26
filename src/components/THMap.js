import { useRef, useEffect } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Extent from "@arcgis/core/geometry/Extent";


export const THMap = ({className, selected, onSolve}) => {
    console.log("Map render")
    const _reportSolved = useRef(onSolve);
    const _selected = useRef(selected);

    useEffect(
        () => {

            console.log("map::creating map");

            const map = new Map({ basemap: "gray-vector"});

            const view = new MapView(
                {
                    map: map, 
                    container: "map", 
                    extent: new Extent({xmin: -124, ymin: 24, xmax: -67, ymax:50})
                }
            );

            view.on(
                "click", 
                (event) => {
                    _reportSolved.current(_selected.current);
                }
            );
        
            return () => {};
        },
        []
    );

    useEffect(
        ()=>{_selected.current = selected},
        [selected]
    );

    return (
    <div id="map" className={className}></div>
    );
    
}