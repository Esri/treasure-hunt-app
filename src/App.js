import 'bootstrap/dist/css/bootstrap.min.css';
import '@arcgis/core/assets/esri/css/main.css';
import './App.css';
import { parseArgs, fetchFeatures, getImageURL } from './Utils';
import {useEffect, useState, useRef} from "react";
import {THMap} from './components/THMap';

function App() {

  const [config, setConfig] = useState(null);
  const [current, setCurrent] = useState(null);

  const _records = useRef([]);

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
          _records.current = 
            await Promise.all(
              features.map(
                async (feature)=>{
                  return {
                    ...feature.attributes, 
                    imageURL: await getImageURL(
                      config.SERVICE_URL, 
                      feature.attributes.objectid
                    ),
                    solved: false,
                    hintActivated: false  
                  }
                }
              ) // features.map           
            ) // await Promise.all
          setCurrent(_records.current.slice().shift())
        })();
      }
    },
    [config]
  )

  const doNext = () => {
    const idx = findItemIndex(current);
    setCurrent(
      idx < _records.current.length - 1 ? 
      _records.current[idx+1] :
      current 
    );
  }

  const doPrev = () => {
    const idx = findItemIndex(current);
    setCurrent(
      idx !== 0 ? 
      _records.current[idx-1] :
      current 
    );
  }

  const doSolved = (question) => {
    const revisedCurrent = {...question, solved: true};
    const idx = findItemIndex(question);
    _records.current.splice(idx, 1, revisedCurrent);
    setCurrent(revisedCurrent);
  }

  const activateHint = () => {
    const revisedCurrent = {...current, hintActivated: true};
    const idx = findItemIndex(current);
    _records.current.splice(idx, 1, revisedCurrent);
    setCurrent(revisedCurrent);
  }

  const findItemIndex = (item) => {
    return _records.current.findIndex((element)=>element.objectid === item.objectid)
  }

  return (

    <div className="App vh-100 p-md-3 p-sm-2 p-1 d-flex flex-column">
      {
      config && 
      <>
        <header>
          <h1 className='h3'>{config.TITLE}</h1>
        </header>

        <section dangerouslySetInnerHTML={{__html: config.DIRECTIONS}}></section>

        <section id="main" className="flex-grow-1 d-flex flex-column flex-sm-row-reverse overflow-hidden">

          {
          current && 
          <THMap className="flex-grow-1 flex-shrink-0"
                selected={current}
                onSolve={(question)=>doSolved(question)}></THMap>
          }
          {
          current &&
          <div className="flex-sm-grow-0 flex-grow-1 align-self-center align-self-sm-stretch overflow-hidden d-flex flex-column p-3 align-items-center" 
                style={{maxWidth: "600px"}}>
            <div className="card flex-grow-1 overflow-hidden">
              <div className="card-header">Question #{findItemIndex(current)+1}</div>
              <img src={current.imageURL} className="card-img-top align-self-center mt-2" alt="..." style={{height:"45%", maxHeight: "350px", width:"auto"}}></img>              
              <div className="card-body overflow-auto d-flex flex-column"
                    style={{
                      backgroundImage: `url(${current.imageURL})`,
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
            <div className="w-100 d-flex mt-2 justify-content-between ms-3 me-3">
              <button className={`btn ${findItemIndex(current) === 0 ? "btn-outline-secondary" : "btn-outline-dark"}`}
                      disabled={findItemIndex(current) === 0}
                      onClick={doPrev}>Prev</button>
              {
              !current.hintActivated && !current.solved &&
              <button className="btn btn-outline-dark" 
                      onClick={activateHint}>Psst...need a hint?</button>
              }
              <button className={`btn ${current.solved ? "btn-primary" : "btn-outline-secondary"}`} 
                      disabled={!current.solved || findItemIndex(current) === _records.current.length - 1}
                      onClick={doNext}>Next</button>
            </div>
          </div>
          }


        </section>


        <footer className="d-flex justify-content-end small">⌐■_■</footer>
      </>
      }
    </div>
  );
}

export default App;