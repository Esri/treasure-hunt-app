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

export const Instructions = ({onDismiss:dismiss}) => {
    return (
        <div 
            className="position-fixed w-100 h-100 d-flex flex-column justify-content-center" 
            style={{zIndex: 2000, backgroundColor: "rgba(0,0,0,0.6)"}}>
            <div className="card align-self-center" style={{width: "80%", maxWidth: "500px"}}>
                <div className="card-header d-flex justify-content-between">
                    <span>Instructions</span>
                    <button type="button" className="btn-close" aria-label="Close" onClick={()=>dismiss()}></button>
                </div>
                <div className="card-body">
                    <ul>
                        <li>Use the map's pan/zoom functions to frame your guess location within the viewfinder circle.</li>
                        <li className="d-flex flex-column">
                            <img className="align-self-center" alt="" src="./viewfinder.png"/>
                        </li>
                        <li>Circle color indicates whether you're getting hotter or colder!</li>
                        <li>Feel free to ask for a hint -- it won't cost you a thing.</li>
                        <li>You can also opt to "Reveal", but beware it counts against your score.</li>
                    </ul>
                </div>
            </div>
        </div>    
    )
}