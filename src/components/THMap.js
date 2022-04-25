import { useRef } from "react";
import background from "../blank-world-map.jpg";

export const THMap = ({className, current, onSolve}) => {
    console.log("Map render")
    const _reportSolved = useRef(onSolve);

    return (
    <div id="map" className={className} 
        style={{
            backgroundImage: `url(${background})`, 
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
          }}>
        {
        !current.solved &&
        <button className="btn btn-primary mt-2 mb-2"
                onClick={()=>_reportSolved.current(current)}>Simulate correct answer</button>
        }
    </div>
    );
    
}