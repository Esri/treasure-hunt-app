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
  const [hintActivatedCount, setHintActivatedCount] = useState(0);

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

  const activateHint = () => {
    current.hintActivated = true;
    setHintActivatedCount(hintActivatedCount+1);
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

        <section id="main" className="flex-grow-1 d-flex flex-column flex-sm-row-reverse overflow-hidden">

          {
          current && 
          <div className="flex-grow-1 flex-shrink-0 d-flex justify-content-center">
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
          </div>
          }
          {
          current &&
          <div className="flex-sm-grow-0 flex-grow-1 overflow-hidden d-flex flex-column p-3 align-items-center">
            <div className="card flex-grow-1 overflow-hidden" style={{maxWidth: "400px"}}>
              <div className="card-header">Question #{records.indexOf(current)+1}</div>
              <img src={current.imageURL} className="card-img-top" alt="..."></img>              
              <div className="card-body overflow-auto d-flex flex-column"
                    style={{
                      backgroundImage: `url(${current.imageURL})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center"      
                    }}>
                  {
                  current.solved &&
                  <div className="alert alert-success" 
                      dangerouslySetInnerHTML={{__html: "<strong>Answer:</strong> "+current.exclamation}}></div>
                  }
                  {
                  current.hintActivated &&
                  <div className={`alert ${current.solved ? "alert-secondary" : "alert-info"}`} 
                      dangerouslySetInnerHTML={{__html: "<strong>Hint:</strong> "+current.hint}}></div>
                  }
                  <div className={`alert ${current.hintActivated || current.solved ? "alert-secondary" : "alert-info"}`} 
                      dangerouslySetInnerHTML={{__html: "<strong>Question:</strong> "+current.prompt}}></div>                                  
              </div>
            </div>
            <div className="w-100 d-flex mt-2 justify-content-between ms-3 me-3" style={{maxWidth: "400px"}}>
              <button className="btn btn-outline-dark" onClick={doPrev}>Prev</button>
              {
                !current.hintActivated && !current.solved &&
                <button className="btn btn-outline-dark" onClick={activateHint}>Psst...need a hint?</button>
              }
              <button className="btn btn-outline-dark" onClick={doNext}>Next</button>
            </div>
          </div>
          }


        </section>


        <footer className="d-flex justify-content-end">⌐■_■</footer>
      </>
      }
    </div>
  );
}

export default App;