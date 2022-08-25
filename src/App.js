/* Copyright 2022 Esri
*
* Licensed under the Apache License Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import 'bootstrap/dist/css/bootstrap.min.css';
import '@arcgis/core/assets/esri/css/main.css';
import './components/viewfinder.css';
import './components/BalloonHelp.css';
import './App.css';
import { parseConfig, fetchFeatures, getImageURL} from './components/Utils';
import {useEffect, useState, useRef} from "react";
import {THMap} from './components/THMap';
import { PhotoCredits } from './components/PhotoCredits';
import { Loader } from './components/Loader';
import { CongratsScreen } from './components/CongratsScreen';
import Multipoint from "@arcgis/core/geometry/Multipoint";
import { Instructions } from './components/Instructions';

function App() {

  const [config, setConfig] = useState(null);
  const [scaleDenominator, setScaleDenominator] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [hideCongratsScreen, setHideCongratsScreen] = useState(true);
  const [hideInstructions, setHideInstructions] = useState(true);
  const [firstThreeSeconds, setFirstThreeSeconds] = useState(true);

  const _records = useRef([]);

  useEffect(
    () => {

      document.addEventListener(
        "keydown", 
        (event) => {if (event.code === "Escape") {setHideInstructions(true);}}
      );

      (async () => setConfig(await parseConfig()))();      

      setTimeout(()=>setFirstThreeSeconds(false), 3000)

    },
    []
  );

  useEffect(
    ()=> {
      if (config) {
        (async () => {
          const features = await fetchFeatures(config.serviceURL);
          _records.current = 
            await Promise.all(
              features.map(
                async (feature)=>{
                  return {
                    ...feature.attributes, 
                    imageURL: await getImageURL(
                      config.serviceURL, 
                      feature.attributes.objectid
                    ),
                    solved: false,
                    hintActivated: false,
                    skipped: false,
                    x: feature.geometry.x,
                    y: feature.geometry.y  
                  }
                }
              ) // features.map           
            ) // await Promise.all
          const extentWidth = new Multipoint({
            points: _records.current.map((value)=>[value.x, value.y])
          }).extent.width;
          setScaleDenominator(extentWidth < 100 ? extentWidth : 100);
          setSelectedQuestion(_records.current.slice().shift())
        })();
      }
    },
    [config]
  )


  useEffect(
    ()=> {
      const element = document.querySelector(".card-body");
      if (element) {
        element.scrollTo({top:0})
      }
    },
    [selectedQuestion]
  )

  const doNext = () => {
    setHideInstructions(true);
    const idx = findItemIndex(selectedQuestion.objectid);
    setSelectedQuestion(
      idx < _records.current.length - 1 ? 
      _records.current[idx+1] :
      selectedQuestion 
    );
  }

  const doSkip = () => {
    markSkipped(selectedQuestion.objectid);
  }

  const showCongratsScreen = () => {
    setHideCongratsScreen(false);
  }

  const showInstructions = () => {
    setHideInstructions(false);
  }

  const dismissCongratsScreen = () => {
    setHideCongratsScreen(true);
  }

  const markSolved = (objectid) => {
    const idx = findItemIndex(objectid);
    const question = _records.current[idx]
    const marked = {...question, solved: true};
    _records.current.splice(idx, 1, marked);
    setSelectedQuestion(marked);
  }

  const markHintActivated = (objectid) => {
    const idx = findItemIndex(objectid);
    const question = _records.current[idx]
    const marked = {...question, hintActivated: true};
    _records.current.splice(idx, 1, marked);
    setSelectedQuestion(marked);
  }

  const markSkipped = (objectid) => {
    const idx = findItemIndex(objectid);
    const question = _records.current[idx]
    const marked = {...question, skipped: true};
    _records.current.splice(idx, 1, marked);
    setSelectedQuestion(marked);
  }

  const findItemIndex = (objectid) => {
    return _records.current.findIndex((element)=>element.objectid === objectid)
  }
  
  const calculateScore = () => {
    const numCorrect = _records.current.filter((value) =>value.solved && !value.skipped).length;
    const denominator = _records.current.filter((value)=>value.solved).length;
    return denominator && (numCorrect / denominator)*100;
  }
  
  return (

    <div className="App vh-100 pb-md-2 p-md-3 p-sm-2 pb-sm-1 p-1 d-flex flex-column">
      {
      config && 
      <>

        <header className="border-bottom border-bottom-1 mb-2 d-flex justify-content-between align-items-center">
          <h1 className="h4 ms-1">Treasure Hunt: {config.title}</h1>
          <button className="btn btn-sm btn-outline-secondary btn-light" onClick={()=>showInstructions()}>Instructions</button>
        </header>

        <section id="main" 
                className="flex-grow-1 d-flex flex-column flex-lg-row-reverse position-relative overflow-hidden pb-2">

          {
          !hideCongratsScreen &&
          <CongratsScreen className="position-absolute w-100 h-100"
                      style={{zIndex: 2000, backgroundColor: "rgba(0,0,0,0.6)"}} 
                      title={config.title}
                      hero="./certificate.jpg"
                      certificateURL="./certificate.pdf" 
                      onDismiss={()=>dismissCongratsScreen()}></CongratsScreen>
          }

          {
          (!selectedQuestion || firstThreeSeconds) && 
          <Loader className="position-absolute w-100 h-100"
                style={{zIndex: 2000, backgroundColor: "rgba(0,0,0,0.6)"}} 
                title={config.title}></Loader>
          }
          {
          !hideInstructions && <Instructions onDismiss={()=>setHideInstructions(true)}/>
          }
          {
          selectedQuestion && 
          <THMap id="map" 
                className="flex-grow-1 flex-shrink-0 flex-lg-shrink-1"
                initCenter={config.initCenter}
                homeZoom={config.homeZoom}
                minZoom={config.minZoom}
                maxZoom={config.maxZoom}
                scaleDenominator={scaleDenominator}
                selected={selectedQuestion}
                onSolve={(objectid)=>markSolved(objectid)}></THMap>
          }

          {
          selectedQuestion &&
          <div id="controls"
                className="w-100 flex-lg-grow-1 align-self-center align-self-lg-stretch overflow-hidden d-flex flex-column align-items-center p-2 p-lg-0 me-lg-3" 
                style={{flexBasis: "60%"}}>
            <div className="w-100 card flex-grow-1 d-flex flex-column overflow-hidden">
              <div className="card-header d-flex justify-content-between">
                <h3 className="h5">QUESTION {findItemIndex(selectedQuestion.objectid)+1} OF {_records.current.length}</h3>
                {!selectedQuestion.skipped && selectedQuestion.solved && <span>Solved</span>}
                <h3 className="h5 fw-bolder">SCORE: {parseInt(calculateScore())}%</h3>
              </div>
              <div id="question-image" 
                className="w-100 align-self-center mt-2"
                style={{
                  backgroundImage: `url(${selectedQuestion.imageURL})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "top center",
                  backgroundSize: "cover",
                  flexBasis: "45%",
                  flexShrink: "0",
                  maxHeight: "350px", width:"auto"
                }}>
              </div>
              <div className="card-body overflow-auto d-flex flex-column"
                    style={{
                      backgroundImage: `url(${selectedQuestion.imageURL})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      WebkitOverflowScrolling: "touch"
                    }}>
                  <PhotoCredits 
                    attribution={selectedQuestion.image_attribution}
                    sourceReferenceURL={selectedQuestion.image_source_reference_page}
                    license={selectedQuestion.image_license}
                    licenseReferenceURL={selectedQuestion.image_license_reference_page}
                    className='small'
                    style={{
                      marginTop: "-10px", 
                      marginBottom: "15px"}}></PhotoCredits>
                  <div id="bubble-container" className="d-flex flex-column">
                    {
                    selectedQuestion.solved &&
                    <div className="alert alert-success"
                        style={{animation: "swoopy .5s linear"}}>
                      {
                      findItemIndex(selectedQuestion.objectid) < _records.current.length - 1 && 
                      selectedQuestion.solved && 
                      <button className="btn btn-sm btn-primary ms-3 w-100" 
                              style={{maxWidth: "120px", float: "right"}}
                              onClick={doNext}>Next Question</button>
                      }                      
                      {
                      findItemIndex(selectedQuestion.objectid) === _records.current.length - 1 && 
                      _records.current.filter((question)=>question.solved).length === _records.current.length &&
                      <button className="btn btn-sm btn-primary ms-3 w-100" 
                              style={{maxWidth: "120px", float: "right"}}
                              onClick={() => showCongratsScreen()}>Claim. Your. PRIZE!!!</button>
                      }
                      <h4 className="h6 fw-bolder">ANSWER</h4>
                      <p dangerouslySetInnerHTML={{__html: selectedQuestion.exclamation}}></p>
                    </div>
                    }
                    {
                    selectedQuestion.hintActivated &&
                    <div className="alert alert-info"
                      style={
                        !selectedQuestion.solved ? 
                          {animation: "swoopy .5s linear"} : 
                          {color: "gray", opacity:"0.9"}
                      }>
                      <h4 className="h6 fw-bolder">HINT</h4>
                      <p dangerouslySetInnerHTML={{__html: selectedQuestion.hint}}></p>
                      <button className="btn btn-sm btn-outline-primary"
                              disabled={selectedQuestion.solved || selectedQuestion.skipped}
                              onClick={doSkip}>Stumped? Reveal the answer.</button>                    
                    </div>
                    }
                    <div className="alert alert-info"
                      style={
                        selectedQuestion.hintActivated || selectedQuestion.solved ? 
                        {color: "gray", opacity:"0.9"} : 
                        {animation: "swoopy .5s linear"}
                      }>
                        <h4 className="h6 fw-bolder">QUESTION</h4>
                        <p dangerouslySetInnerHTML={{__html: selectedQuestion.prompt}}></p>
                        <button target="blank" 
                                  className="btn btn-sm btn-outline-primary"
                                  disabled={selectedQuestion.hintActivated || selectedQuestion.solved}
                                  onClick={()=>markHintActivated(selectedQuestion.objectid)}>Need a hint?</button>
                    </div>
                  </div>                                  
              </div>
            </div>
          </div>
          }
        </section>
      </>
      }
    </div>
  );
}

export default App;