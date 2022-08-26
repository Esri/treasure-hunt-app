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

import { useState } from "react";
import { modifyPdf } from "./Utils";

export const CongratsScreen = ({
    className,
    style,
    title,
    hero,
    certificateURL,
    onDismiss: dismiss,
}) => {
    const copyToClipBoard = () => {
        navigator.clipboard.writeText(window.location.href);
    };
    const [name, setName] = useState(null);

    const tweetText = encodeURI("I've navigated a Geography Treasure Hunt in search of " + title + ". Try it yourself!");

    className = className + " d-flex justify-content-center align-items-center"
    return (
        <div id="congrats" className={className} style={style}>
            <div id="inner"
                className="h-auto position-relative overflow-hidden border bg-white ms-2 me-2 p-2"
                style={{ width: "95%", maxWidth: "1000px", maxHeight: "95%" }}>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-close"
                        onClick={() => { dismiss() }}></button>
                </div>
                <div className="d-flex">
                    <div className="flex-grow-1 flex-shrink-0 d-flex flex-column position-relative overflow-hidden p-2 m-0 m-sm-2 me-sm-1"
                        style={{
                            flexBasis: "50%",
                            backgroundColor: "rgba(255,255,255,0.8)"
                            }}>
                            <div className="flex-grow-1 overflow-y-auto">
                                <h1 className="display-5 fw-bold">Congratulations!</h1>
                                <p className="h5 mb-5" style={{fontWeight: 400}}>You have successfully completed the <strong>{title}</strong> Treasure Hunt!</p>
                                <p className="h5" style={{fontWeight: 400}}>In recognition of your excellence, you can:</p>
                                <ul className="h5" style={{fontWeight: 400}}>
                                <li className="mb-1">
                                    Write your name, download
                                    and print the Certificate of Achievement
                                </li>
                                <li>
                                <p>Share your accomplishment on social media</p>
                                        <div className="d-flex justify-content-center">
                                            <a title="Twitter"
                                                className="btn btn-sm btn-link"
                                                target="_blank"
                                                rel="noreferrer"
                                                href={"https://twitter.com/intent/tweet?text="+tweetText+"&url="+window.location.href} >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-twitter" viewBox="0 0 16 16">
                                                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                                                </svg>                                                    
                                            </a>
                                            <a title="Facebook"
                                                className="btn btn-sm btn-link"
                                                target="_blank" 
                                                rel="noreferrer"
                                                href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                                                </svg>
                                            </a>
                                            <button title="Copy link"
                                                    className="btn btn-sm btn-link"
                                                    onClick={(event)=>{copyToClipBoard();alert("Copied!")}}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-link" viewBox="0 0 16 16">
                                                    <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z"/>
                                                    <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z"/>
                                                </svg>                                                        
                                            </button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                    </div>
                    <div className="d-flex d-sm-block m-0 m-sm-2 ms-sm-1"
                        style={{
                            flexBasis: "50%",
                        }}>
                        <input type="text"
                            value={name}
                            placeholder="Name"
                            style={{
                                width: "100%",
                            }}
                            onChange={(e) => setName(e.target.value)}/>
                        <button onClick={() => {
                                modifyPdf(name);
                            }}
                            style={{
                                width: "100%",
                            }}
                            type="button"
                            class="btn btn-outline-primary btn-sm my-1">
                            Download Pdf{" "}
                        </button>
                        <img src={hero}
                            alt="certificate"
                            style={{
                                width: "100%",
                            }}/>
                    </div>
                </div>
            </div>
        </div> /*intro*/
    );
};
