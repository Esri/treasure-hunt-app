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

export const Loader = ({
    className,
    style,
    title
    }) => {
    className = className+" d-flex justify-content-center align-items-center"
    return(
        <div id="intro" className={className} style={style}>
            <div id="inner" 
                className="d-flex flex-column align-items-center position-relative overflow-hidden bg-white p-4 border-solid">
                    <h1>{title}</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="100" viewBox="0 0 960 560">
                        <polyline className="zigzag" fill="none" stroke="#000000" strokeWidth="16" strokeMiterlimit="10" points="902 245.5 762.5 141.5 623.01 245.5 483.51 141.5 344.01 245.5 204.5 141.5 65 245.5 "/>
                    </svg>
                    <h4>Treasure Hunt</h4>
            </div>
        </div> /*intro*/
    );
}