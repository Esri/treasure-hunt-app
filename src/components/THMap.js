import background from "../blank-world-map.jpg";

export const THMap = ({className, showButton, onSolve:reportSolved}) => {
    return (
    <div id="map" className={className} 
        style={{
            backgroundImage: `url(${background})`, 
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
          }}>
        {
        showButton &&
        <button className="btn btn-primary mt-2 mb-2"
                onClick={reportSolved}>Simulate correct answer</button>
        }
    </div>
    );
}