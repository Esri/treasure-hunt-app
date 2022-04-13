import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
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
        <section className="flex-grow-1 overflow-hidden d-flex flex-column p-3 align-items-center">
          {
            current &&
            <div className="card flex-grow-1 overflow-hidden" style={{maxWidth: "400px"}}>
              <div className="card-header">Question #{records.indexOf(current)+1}</div>
              <img src={current.imageURL} className="card-img-top" alt="..."></img>              
              <div className="card-body overflow-hidden d-flex flex-column">

                {
                  !current.solved &&
                  <button className="btn btn-primary mb-3" onClick={doSimulateAnswer}>Simulate correct answer</button>
                }
                

                <div className="flex-grow-1 border overflow-auto accordion" id="accordionExample">
                  {
                    current.solved &&
                    <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Answer
                      </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse show" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                      <div className="accordion-body" dangerouslySetInnerHTML={{__html: current.exclamation}}></div>
                    </div>
                  </div>
                  }
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Prompt
                      </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                      <div className="accordion-body" dangerouslySetInnerHTML={{__html: current.prompt}}></div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Hint
                      </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                      <div className="accordion-body" dangerouslySetInnerHTML={{__html: current.hint}}></div>
                    </div>
                  </div>
                </div>                

                <div className="d-flex mt-2 justify-content-between">
                  <button className="btn btn-outline-dark" onClick={doPrev}>Prev</button>
                  <button className="btn btn-outline-dark" onClick={doNext}>Next</button>
                </div>

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