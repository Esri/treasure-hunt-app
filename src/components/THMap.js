import { useRef, useEffect } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Extent from "@arcgis/core/geometry/Extent";
import Point from "@arcgis/core/geometry/Point"
import { whenTrue } from "@arcgis/core/core/watchUtils";
import Graphic from "@arcgis/core/Graphic";
import pngMarker from "./marker.png";

export const THMap = ({
    className,
    homeCenter,
    homeZoom,
    minZoom,
    maxZoom,
    scaleDenominator, 
    selected, 
    onSolve}) => {

    console.log("Map render", selected);
    const _homeCenter = useRef(homeCenter);
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
                                square.style.display = "none";
 
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

            const green = parseInt(255*(1-distance/_scaleDenominator.current));
            const red = parseInt(255*(distance/_scaleDenominator.current));
            square.style.backgroundColor = `rgba(${red+","+green+",0,0.6"}`;

        }
    );

    useEffect(
        () => {

            console.log("map::creating map");

            const view = new MapView(
                {
                    map: new Map({ basemap: "streets-vector"}), 
                    container: "map",
                    center: _homeCenter.current, 
                    zoom: _homeZoom.current,
                    constraints: {
                        minZoom: _minZoom.current, 
                        maxZoom: _maxZoom.current
                    }
                }
            );

            view.popup.visibleElements = {closeButton: false};
            view.popup.dockOptions.buttonEnabled = false;
            view.popup.actions.removeAll();
            view.popup.alignment = "top-center";

            const square = document.createElement("div");
            square.setAttribute("id","square");
            view.ui.add(square, "manual");

            _view.current = view;

            view.when(
                ()=> {

                    _updateCrosshairColor.current();

                    view.watch("center",()=>_updateCrosshairColor.current())
                    whenTrue(
                        view, 
                        "stationary", 
                        ()=>{
                            _performCrossHairTest.current();
                        }
                    )
                }
            );

        },
        []
    );

    useEffect(
        ()=>{
            let reset = _selected.current.objectid !== selected.objectid;
            if (reset) {
                _view.current.graphics.removeAll();
                _view.current.popup.close();
                _view.current.goTo(
                    {
                        center: [_selected.current.x, _selected.current.y], 
                        zoom: _homeZoom.current
                    },
                    {
                        animate: true,
                        duration: 1000,
                        easing: "ease-in"
                    }
                ).then(
                    ()=> {
                        _selected.current = selected;
                        document.getElementById("square").style.display = "block";
                        _updateCrosshairColor.current()
                        _performCrossHairTest.current();
                    }
                )
            }
        },
        [selected]
    );

    return (
        <div id="map" className={className}></div>
    );
    
}

const boxToExtent = (view, square) => {

    console.log("boxToExtent", view, square);

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