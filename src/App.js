import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { parseArgs, fetchFeatures, getImageURL } from './Utils';
import {useEffect, useState} from "react";

function App() {

  const [config, setConfig] = useState(null);
  const [records, setRecords] = useState([]);
  const [current, setCurrent] = useState(null);

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
          setRecords(            
            await Promise.all(
              features.map(
                async (feature)=>{
                  return {
                    ...feature.attributes, 
                    imageURL: await getImageURL(
                      config.SERVICE_URL, 
                      feature.attributes.objectid
                    )  
                  }
                }
              ) // features.map           
            ) // await Promise.all
          ); // setRecords
        })();
      }
    },
    [config]
  )

  useEffect(
    ()=>{setCurrent(records.slice().shift())},
    [records]
  )

  const doNext = () => {
    setCurrent(
      records.indexOf(current) < records.length - 1 ? 
      records[records.indexOf(current)+1] :
      current 
    );
  }

  return (

    <div className="App vh-100 p-md-5 p-sm-3 p-3 d-flex flex-column">
      {
      config && 
      <>
        <header>
          <h1>{config.TITLE}</h1>
        </header>
        <section dangerouslySetInnerHTML={{__html: config.DIRECTIONS}}></section>
        <section className="flex-grow-1 overflow-hidden d-flex flex-column p-3 align-items-center">
          {
            current &&
            <div className="card flex-grow-1 overflow-hidden" style={{maxWidth: "400px"}}>
              <div className="card-header">Question #{records.indexOf(current)+1}</div>
              <img src={current.imageURL} className="card-img-top" alt="..."></img>              
              <div className="card-body overflow-hidden d-flex flex-column">

                <ul className="flex-grow-1 border overflow-auto list-group list-group-flush">
                  <li className="list-group-item" 
                      dangerouslySetInnerHTML={{__html: current.prompt}}>    
                  </li>
                  <li className="list-group-item" 
                      dangerouslySetInnerHTML={{__html: current.hint}}>    
                  </li>
                  <li className="list-group-item" 
                      dangerouslySetInnerHTML={{__html: current.exclamation}}>    
                  </li>
                </ul>

                <div className="d-flex mt-2 justify-content-between">
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