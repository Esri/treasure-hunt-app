import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {useEffect, useState} from "react";

function App() {

  const [config, setConfig] = useState(null);
  const [records, setRecords] = useState([]);
  const [index, setIndex] = useState(0);

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

      if (config) {
        initRecords();
      }

      async function initRecords() 
      {
  
        const features = await fetchRecords();
        for (var i = 0; i < features.length; i++) {
          features[i].attributes.imageURL = await getImageURL(features[i]);
        }        
        setRecords(features);  

        async function fetchRecords() 
        {
          const response = await fetch(
            config.SERVICE_URL+
            "/query?where=1+%3D+1&outFields=*&returnGeometry=true&f=pjson"
          );
          const json = await response.json();
          return json.features;
        }      

        async function getImageURL(feature)
        {
          const response = await fetch(
            config.SERVICE_URL+
            "/queryAttachments?objectIds="+feature.attributes.objectid+"&f=pjson"
          );
          const json = await response.json();
          return config.SERVICE_URL+
                  "/"+feature.attributes.objectid+
                  "/attachments/"+
                  json.attachmentGroups.shift().attachmentInfos.shift().id;
        }

      }

    },
    [config]
  )


  const doNext = () => 
  {
    setIndex(index === records.length - 1 ? index : index+1);
  }

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
        <section>
          {
            records.length &&
            <div className="card">
              <div className="card-header">Question #{index+1}</div>
              <img src={records[index].attributes.imageURL} className="card-img-top" alt="..."></img>              
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item" 
                      dangerouslySetInnerHTML={{__html: records[index].attributes.prompt}}>    
                  </li>
                  <li className="list-group-item" 
                      dangerouslySetInnerHTML={{__html: records[index].attributes.hint}}>    
                  </li>
                  <li className="list-group-item" 
                      dangerouslySetInnerHTML={{__html: records[index].attributes.exclamation}}>    
                  </li>
                </ul>
                <button className="btn btn-primary" onClick={doNext}>Next</button>
              </div>
            </div>
          }
        </section>
        <footer>⌐■_■</footer>
      </>
      }
    </div>
  );
}

export default App;