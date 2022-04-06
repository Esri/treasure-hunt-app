import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {useEffect, useState} from "react";

function App() {

  const [config, setConfig] = useState(null);
  const [records, setRecords] = useState([]);

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

  useEffect(
    ()=> {
      if (config) {fetchRecords();}
      async function fetchRecords() {
        const response = await fetch(
          config.SERVICE_URL+
          "/query?where=1+%3D+1&outFields=*&returnGeometry=true&f=pjson"
        );
        const json = await response.json();
        console.log(json.features);
        setRecords(json.features);
      }
    },
    [config]
  )

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
        <section>Max Zoom: 
          {config.MAX_ZOOM === undefined && <>Undefined</>}
          {config.MAX_ZOOM !== undefined && <>{config.MAX_ZOOM}</>}
        </section>
        <section>Service URL: 
          {config.SERVICE_URL === undefined && <>Undefined</>}
          {config.SERVICE_URL !== undefined && <>{config.SERVICE_URL}</>}
        </section>
        <section>
          <table className="table table-sm small">

            <thead className="sticky-top">
              <tr>
                <th scope="col">Prompt</th>
                <th scope="col">Hint</th>
                <th scope="col">Exclamation</th>
              </tr>
            </thead>

          <tbody>
          {
          records.map(
            (record) => {
              return <tr key={record.attributes.objectid}>
                      <td dangerouslySetInnerHTML={{__html: record.attributes.prompt}}></td>
                      <td dangerouslySetInnerHTML={{__html: record.attributes.hint}}></td>
                      <td dangerouslySetInnerHTML={{__html: record.attributes.exclamation}}></td>
                    </tr>
            }
          )
          }
          </tbody>

          </table>

        </section>
        <footer>⌐■_■</footer>
      </>
      }
    </div>
  );
}

export default App;