import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { parseArgs, fetchFeatures, getImageURL } from './Utils';
import {useEffect, useState} from "react";

function App() {

  const [config, setConfig] = useState(null);
  const [records, setRecords] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(
    () => {
      const args = parseArgs();
      const edition = args.edition || "famous-romances";
      (async () => {
        const response = await fetch("./config.json");
        const json = await response.json();
        setConfig(json.filter((value)=>value.PATH === edition).shift());
      })();      
    },
    []
  );

  useEffect(
    ()=> {

      if (config) {
        (async () => {
          const features = await fetchFeatures(config.SERVICE_URL);
          for (var i = 0; i < features.length; i++) {
            features[i].attributes.imageURL = await getImageURL(
              config.SERVICE_URL, 
              features[i].attributes.objectid
            );
          }        
          setRecords(features);
        })();
      }

    },
    [config]
  )


  const doNext = () => {
    setIndex(index === records.length - 1 ? index : index+1);
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
                <div className="d-flex  mt-2 border border-success justify-content-between">
                  <button className="btn btn-success">Prev</button>
                  <button className="btn btn-primary" onClick={doNext}>Next</button>
                </div>
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