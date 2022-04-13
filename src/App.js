import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import background from "./blank-world-map.jpg";
import { parseArgs, fetchFeatures, getImageURL } from './Utils';
import {useEffect, useState} from "react";

function App() {

  const [config, setConfig] = useState(null);
  const [records, setRecords] = useState([]);
  const [current, setCurrent] = useState(null);
  const [solvedCount, setSolvedCount] = useState(0);

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
                    ),
                    solved: false  
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
    ()=>{
      setCurrent(records.slice().shift())
    },
    [records]
  )

  const doNext = () => {
    setCurrent(
      records.indexOf(current) < records.length - 1 ? 
      records[records.indexOf(current)+1] :
      current 
    );
  }

  const doPrev = () => {
    setCurrent(
      records.indexOf(current) !== 0 ? 
      records[records.indexOf(current)-1] :
      current 
    );
  }

  const doSimulateAnswer = () => {
    current.solved = true;
    setSolvedCount(solvedCount+1);
  }

  return (

    <div className="App vh-100 p-md-4 p-sm-3 p-2 d-flex flex-column">
      {
      config && 
      <>
        <header>
          <h1>{config.TITLE}</h1>
        </header>

        <section dangerouslySetInnerHTML={{__html: config.DIRECTIONS}}></section>

        {
        current && 
        <section className="flex-grow-1 d-flex justify-content-center">
          <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center" 
              style={{
                minHeight:"200px", 
                backgroundImage: `url(${background})`, 
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center"
              }}>
            {
            !current.solved &&  
            <button className="btn btn-primary mt-2 mb-2" onClick={doSimulateAnswer}>Simulate correct answer</button>
            }
          </div>
        </section>
        }

        <section className="flex-grow-1 overflow-hidden d-flex flex-column p-3 align-items-center">
          {
            current &&
            <div className="card flex-grow-1 overflow-hidden" style={{maxWidth: "400px"}}>
              <div className="card-header">Question #{records.indexOf(current)+1}</div>
              <img src={current.imageURL} 
                  className="card-img-top d-none d-sm-block" 
                  alt="..."></img>              
              <div className="card-body overflow-auto d-flex flex-column"
                    style={{
                      backgroundImage: `url(${current.imageURL})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center"      
                    }}>
                  {
                  current.solved &&
                  <div className="alert alert-success" dangerouslySetInnerHTML={{__html: current.exclamation}}></div>
                  }
                  <div className="alert alert-warning" dangerouslySetInnerHTML={{__html: current.prompt}}></div>
                  <div className="alert alert-secondary" dangerouslySetInnerHTML={{__html: current.hint}}></div>
              </div>
            </div>
          }
        </section>
        <section className="d-flex mt-2 justify-content-around">
          <button className="btn btn-outline-dark" onClick={doPrev}>Prev</button>
          <button className="btn btn-outline-dark" onClick={doNext}>Next</button>
        </section>
        <footer className="d-flex justify-content-end">⌐■_■</footer>
      </>
      }
    </div>
  );
}

export default App;