import './App.css';
import {useEffect, useState} from "react";

function App() {

  const [config, setConfig] = useState(null);

  useEffect(
    () => {
      const args = parseArgs();
      const edition = args.edition || "famous-romances";
      fetchJSON();
      async function fetchJSON() {
        const response = await fetch("./config.json");
        const json = await response.json();
        setConfig(json.filter((value)=>value.PATH === edition).shift());
      }
    },
    []
  );

	const parseArgs = () =>
	{
		
		var parts = decodeURIComponent(document.location.href).split("?");
		var args = {};
		
		if (parts.length > 1) {
			args = parts[1].toLowerCase().split("&").reduce(
				function(accumulator, value) {
					var temp = value.split("=");
					if (temp.length > 1) {accumulator[temp[0]] = temp[1];}
					return accumulator; 
				}, 
				args
			);
		}

		return args;
	
	}	  


  return (

    <div className="App">
      {
      config && 
      <>
        <header>
          <h1>{config.TITLE}</h1>
        </header>
        <section dangerouslySetInnerHTML={{__html: config.DIRECTIONS}}></section>
        <section>Max Zoom: {config.MAX_ZOOM === undefined && <>Undefined</>}{config.MAX_ZOOM !== undefined && <>{config.MAX_ZOOM}</>}</section>
        <footer>⌐■_■</footer>
      </>
      }
    </div>
  );
}

export default App;