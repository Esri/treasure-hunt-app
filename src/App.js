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
          <button className="btn btn-sm btn-outline-secondary btn-light" onClick={()=>showInstructions()}>How to use this app</button>
        </header>

        <section id="main" 
                className="flex-grow-1 d-flex flex-column flex-lg-row-reverse position-relative overflow-hidden">

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
                className="flex-lg-grow-1 align-self-center align-self-lg-stretch overflow-hidden d-flex flex-column align-items-center p-2 p-lg-0 me-lg-3" 
                style={{flexBasis: "60%"}}>
            <div className="w-100 card flex-grow-1 overflow-hidden">
              <div className="card-header d-flex justify-content-between">
                <span>Question #{findItemIndex(selectedQuestion.objectid)+1} of {_records.current.length}</span>
                {selectedQuestion.skipped && <span>Skipped</span>}
                {!selectedQuestion.skipped && selectedQuestion.solved && <span>Solved</span>}
                <span>Score: {parseInt(calculateScore())}%</span>
              </div>
              <img src={selectedQuestion.imageURL} className="card-img-top align-self-center mt-2" alt="..." style={{height:"45%", maxHeight: "350px", width:"auto"}}></img>              
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
                  {
                  selectedQuestion.solved &&
                  <div className="alert alert-success d-flex align-items-center justify-content-between"
                      style={{animation: "swoopy .5s linear"}}>
                      <p dangerouslySetInnerHTML={{__html: "<strong>Answer: </strong>"+selectedQuestion.exclamation}}></p>
                      {
                      findItemIndex(selectedQuestion.objectid) < _records.current.length - 1 && 
                      selectedQuestion.solved && 
                      <button className="btn btn-sm btn-primary ms-4" onClick={doNext}>Next</button>
                      }                      
                      {
                      findItemIndex(selectedQuestion.objectid) === _records.current.length - 1 && 
                      _records.current.filter((question)=>question.solved).length === _records.current.length &&
                      <button className="btn btn-sm btn-primary ms-4" 
                              onClick={() => showCongratsScreen()}>Claim. Your. PRIZE!!!</button>
                      }
                    </div>
                  }
                  {
                  selectedQuestion.hintActivated &&
                  <div className="alert alert-info"
                    style={
                      !selectedQuestion.solved ? 
                        {animation: "swoopy .5s linear"} : 
                        {color: "gray", opacity:"0.9"}
                    } 
                    dangerouslySetInnerHTML={
                      {
                        __html: "<strong>Hint:</strong> "+selectedQuestion.hint
                      }
                    }></div>
                  }
                  <div className="alert alert-info"
                    style={
                      selectedQuestion.hintActivated || selectedQuestion.solved ? 
                      {color: "gray", opacity:"0.9"} : 
                      {animation: "swoopy .5s linear"}
                    }
                    dangerouslySetInnerHTML={
                      {
                        __html: "<strong>Question:</strong> "+selectedQuestion.prompt
                      }
                    }></div>                                  
              </div>
            </div>
            <div className="w-100 d-flex mt-2 justify-content-between ms-3 me-3 mb-1">
              <button className="btn btn-sm btn-outline-secondary btn-light" 
                      disabled={selectedQuestion.hintActivated || selectedQuestion.solved}
                      onClick={()=>markHintActivated(selectedQuestion.objectid)}>Psst...need a hint?</button>
              <button className="btn btn-sm btn-outline-secondary btn-light"
                      disabled={selectedQuestion.solved || selectedQuestion.skipped}
                      onClick={doSkip}>Reveal</button>
            </div>
          </div>
          }


        </section>


        <footer className="d-flex justify-content-end pt-1 small text-muted"><span>Check out <a className="link-primary" href="https://docs.google.com/document/d/1OugT0XSNt4jaxMXEA58smUbK5D9u0ZeWdCxfGGBwf_w/" target="_blank" rel="noreferrer">this doc</a> for info on creating your own Treasure Hunt.</span></footer>
      </>
      }
    </div>
  );
}

export default App;