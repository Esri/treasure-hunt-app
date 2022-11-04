/* Copyright 2022 Esri
*
* Licensed under the Apache License Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import '@arcgis/core/assets/esri/css/main.css';

import { useRef, useEffect } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Extent from "@arcgis/core/geometry/Extent";
import Point from "@arcgis/core/geometry/Point";
import esriConfig from "@arcgis/core/config";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";
import Graphic from "@arcgis/core/Graphic";
import pngMarker from "./marker.png";

const toggleViewFinder = (visible)=> {
    const display = visible ? "block" : "none";
    document.getElementById("square").style.display = display;
    document.getElementById("axis-y-top").style.display = display;
    document.getElementById("axis-y-bottom").style.display = display;
    document.getElementById("axis-x-left").style.display = display;
    document.getElementById("axis-x-right").style.display = display;
}

export const THMap = ({
    id,
    className,
    initCenter,
    homeZoom,
    minZoom,
    maxZoom,
    scaleDenominator, 
    selected, 
    onSolve}) => {

    const _initCenter = useRef(initCenter);
    const _homeZoom = useRef(homeZoom);
    const _minZoom = useRef(minZoom);
    const _maxZoom = useRef(maxZoom);
    const _reportSolved = useRef(onSolve);
    const _selected = useRef(selected);
    const _scaleDenominator = useRef(scaleDenominator);
    const _view = useRef(null);

    const _performCrossHairTest = useRef(
        () => {

            const view = _view.current;
            const square = document.getElementById("square");

            const selectedPoint = new Point(
                {
                    x: _selected.current.x, 
                    y: _selected.current.y, 
                    spatialReference: {wkid: 4326}
                }
            );

            if (boxToExtent(view, square).contains(selectedPoint)) {
                if (!_selected.current.solved) {
                    square.classList.add("blinking");
                    setTimeout(
                        ()=>view.goTo(
                            {
                                center: selectedPoint, 
                                zoom: _selected.current.zoom_level
                            },
                            {
                                animate: true,
                                duration: 2000,
                                easing: "ease-out"
                            }
                        ).then(
                            ()=>{
                                square.classList.remove("blinking");
                                toggleViewFinder(false);
                                
                                view.graphics.add(
                                    new Graphic(
                                        {
                                            geometry: selectedPoint,
                                            symbol: {
                                                type: "picture-marker",
                                                url: pngMarker,
                                                width: "24px",
                                                height: "32px",
                                                yoffset: "16px"
                                              }
                                        }
                                    )
                                );
 
                                view.popup.dockEnabled = false;
                                view.popup.open(
                                    {
                                        location: selectedPoint, 
                                        title: _selected.current.location_name
                                    }
                                );			                                
                                _reportSolved.current(_selected.current.objectid);
                            }
                        ),
                        1000
                    )
                }
            }
        }
    );

    const _updateCrosshairColor = useRef(
        ()=> {

            const view = _view.current;
            const square = document.getElementById("square");

            const selectedPoint = new Point(
                {
                    x: _selected.current.x, 
                    y: _selected.current.y, 
                    spatialReference: {wkid: 4326}
                }
            );

            const viewCenter = new Point(
                {
                    x: view.center.longitude,
                    y: view.center.latitude,
                    spatialReference: {wkid: 4326}
                }
            );

            const distance = viewCenter.distance(selectedPoint);
            const distanceRatio = (distance / _scaleDenominator.current);
            const intensity = 1-distanceRatio;
            /*
            console.log("************************************")
            console.log("distance", distance);
            console.log("scale denominator", scaleDenominator)
            console.log("distance ratio", distanceRatio);
            console.log("intensity", intensity);
            */
            const red = parseInt(255*intensity);
            const blue = parseInt(255*(1-intensity));            

            square.style.backgroundColor = `rgba(${red+",0,"+blue+",0.6"}`;

        }
    );

    useEffect(
        () => {

            esriConfig.apiKey = "AAPKc281cec04c56424bb82093c8925ea337x_K4mBEA-vKPfea5-iSQuzoKoHc5eupD1JQwl-4R_a3AoGuNVdUfNdzbDEQn2jZ2"
            const view = new MapView(
                {
                    map: new Map({ basemap: "arcgis-community"}), 
                    container: "map",
                    center: _initCenter.current, 
                    zoom: _homeZoom.current,
                    constraints: {
                        minZoom: _minZoom.current, 
                        maxZoom: _maxZoom.current
                    }
                }
            );

            const style = document.createElement('style');
            style.textContent = ".esri-popup {margin-bottom: 35px;}"+
            ".esri-popup__footer {display: none}"+
            ".esri-view-width-medium .esri-popup__main-container {width: auto;}"+
            ".esri-view-orientation-landscape .esri-popup__main-container {width: auto;}"+
            ".esri-view-width-less-than-medium .esri-popup__main-container {width: auto;}";
            document.head.append(style);

            view.popup.visibleElements = {closeButton: false};
            view.popup.dockOptions.buttonEnabled = false;
            view.popup.actions.removeAll();
            view.popup.alignment = "top-center";

            const square = document.createElement("div");
            square.setAttribute("id","square");
            view.ui.add(square, "manual");

            const axisYTop = document.createElement("div");
            axisYTop.setAttribute("id", "axis-y-top");
            view.ui.add(axisYTop, "manual");

            const axisYBottom = document.createElement("div");
            axisYBottom.setAttribute("id", "axis-y-bottom");
            view.ui.add(axisYBottom, "manual");

            const axisXLeft = document.createElement("div");
            axisXLeft.setAttribute("id", "axis-x-left");
            view.ui.add(axisXLeft, "manual");

            const axisXRight = document.createElement("div");
            axisXRight.setAttribute("id", "axis-x-right")
            view.ui.add(axisXRight, "manual");

            const popupHelp = document.createElement("div");
            popupHelp.setAttribute("id", "map-balloon-help");
            popupHelp.setAttribute("class", "pulsing");
            popupHelp.innerHTML = "Use the map's pan/zoom functions to frame your guess location within the viewfinder circle!";
            view.ui.add(popupHelp, "manual");

            _view.current = view;

            view.on(
                ["pointer-down","key-down"], 
                ()=>{
                    const balloon = document.getElementById("map-balloon-help");
                    balloon.classList.add("fading");
                    balloon.classList.remove("pulsing");
                    setTimeout(()=>balloon.style.display = "none", 900);                        
                }
            );

            view.when(
                ()=> {

                    _updateCrosshairColor.current();

                    view.watch("center",()=>_updateCrosshairColor.current())

                    reactiveUtils.when(
                        () => view?.stationary === true,
                        () => {_performCrossHairTest.current();}
                    );            
        
                }
            );

        },
        []
    );

    useEffect(
        ()=>{
            const reset = _selected.current.objectid !== selected.objectid;

            if (!reset) {
                if (selected.skipped) {
                    _view.current.goTo(
                        {
                            center: new Point(
                                {
                                    x: selected.x, 
                                    y: selected.y, 
                                    spatialReference: {wkid: 4326}
                                }
                            ) 
                        },
                        {
                            animate: true,
                            duration: 1000,
                            easing: "ease-out"
                        }
                    )                    
                }
                return;
            }

            _selected.current = selected;
            _view.current.graphics.removeAll();
            _view.current.popup.close();

            const selectedPoint = new Point(
                {
                    x: _selected.current.x, 
                    y: _selected.current.y, 
                    spatialReference: {wkid: 4326}
                }
            );

            if (_selected.current.solved) {

                toggleViewFinder(false);

                _view.current.goTo(
                    {
                        center: selectedPoint, 
                        zoom: _selected.current.zoom_level
                    },
                    {
                        animate: true,
                        duration: 1000,
                        easing: "ease-out"
                    }
                ).then(
                    ()=>{

                        _view.current.graphics.add(
                            new Graphic(
                                {
                                    geometry: selectedPoint,
                                    symbol: {
                                        type: "picture-marker",
                                        url: pngMarker,
                                        width: "24px",
                                        height: "32px",
                                        yoffset: "16px"
                                      }
                                }
                            )
                        );

                        _view.current.popup.dockEnabled = false;
                        _view.current.popup.open(
                            {
                                location: selectedPoint, 
                                title: _selected.current.location_name
                            }
                        );			                                

                    }
                )
            } else {
                _view.current.goTo(
                    {
                        /*center: [_selected.current.x, _selected.current.y],*/ 
                        zoom: _homeZoom.current
                    },
                    {
                        animate: true,
                        duration: 1000,
                        easing: "ease-in"
                    }
                ).then(
                    ()=> {
                        toggleViewFinder(true);
                        _updateCrosshairColor.current()
                        _performCrossHairTest.current();
                    }
                )
            }

        },
        [selected]
    );

    return (
        <div id={id} className={className} style={{cursor: "grab"}}></div>
    );
    
}

const boxToExtent = (view, square) => {

    const lowerLeft = view.toMap(
        new Point(
            [
                square.offsetLeft,
                square.offsetTop+(square.offsetHeight)
            ]
        )
    );

    const upperRight = view.toMap(
        new Point(
            [
                square.offsetLeft+(square.offsetWidth),
                square.offsetTop
            ]
        )
    );
    
    return new Extent({
        xmin: lowerLeft.longitude, ymin: lowerLeft.latitude, 
        xmax: upperRight.longitude, ymax: upperRight.latitude,
        spatialReference: {
            wkid: 4326
        }
    });

}