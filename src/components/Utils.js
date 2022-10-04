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

export const parseConfig = async () =>
{
  const response = await fetch("./config.json");
  const json = await response.json();
  const args = parseArgs();

  let runningConfig = json.filter(
    (value)=>value.path === "proto-config"
  ).shift();

  if (args.edition) {
    const editionConfig = json.filter((value)=>value.path === args.edition).shift();
    runningConfig = {...runningConfig, ...editionConfig};
  }

  const itemInfo = args.itemid && await getItemInfo(args.itemid);
  
  if (itemInfo) {
    runningConfig = {
      ...runningConfig, 
      ...itemInfo
    };
  }

  const initCenter = 
      args.initcenter && 
      args.initcenter.split(",").filter((str)=>!isNaN(parseFloat(str)));

  if (initCenter && initCenter.length === 2) {
    runningConfig = {...runningConfig, initCenter: initCenter};
  }

  const homeZoom = args.homezoom && parseInt(args.homezoom);
  if (homeZoom) {
    runningConfig = {...runningConfig, homeZoom: homeZoom};
  }

  const maxZoom = args.maxzoom && parseInt(args.maxzoom);
  if (maxZoom) {
    runningConfig = {...runningConfig, maxZoom: maxZoom}; 
  }

  const minZoom = args.minzoom && parseInt(args.minzoom);
  if (minZoom) {
    runningConfig = {...runningConfig, minZoom: minZoom}; 
  }

  const stacking = args.stacking === "top" ? "top" : "bottom";
  runningConfig = {...runningConfig, stacking: stacking};

  return runningConfig;

}

export const fetchFeatures = async (serviceURL) => 
{
  const response = await fetch(
    serviceURL+"/query?where=1+%3D+1&outFields=*&returnGeometry=true&f=pjson"
  );
  const json = await response.json();
  return json.features;
}      

export const getImageURLs = async(serviceURL, objectIds) =>
{
  const response = await fetch(
    serviceURL+"/queryAttachments?objectIds="+objectIds.join(",")+"&f=pjson"
  );
  const json = await response.json();
  return json.attachmentGroups.map(
    (entry)=>{
      const attachmentInfo = entry.attachmentInfos.shift();
      return {
        objectId: entry.parentObjectId,
        imageURL: `${serviceURL}/${entry.parentObjectId}/attachments/${attachmentInfo.id}`
      };
    }
  );
}

export const getItemInfo = async(itemID) =>
{
    const SHARING_URL = "https://www.arcgis.com/sharing/";
    const response = await fetch(SHARING_URL+"rest/search?q="+itemID+"&f=json");
    const json = await response.json();
    
    const surveyFormItem = json.results.filter(
      (value)=>value.type==="Form" && value.access==="public"
    ).shift();

    const featureServiceItem = json.results.filter(
      (value)=>value.type==="Feature Service" && 
              value.access==="public" && 
              value.name.includes("stakeholder")
    ).shift();

    return surveyFormItem && featureServiceItem ?
          {
            title: surveyFormItem.title, 
            description: surveyFormItem.description,
            serviceURL: featureServiceItem.url+"/0"
          } : 
          null;

}

export const parseArgs = () =>
{
    
    var parts = decodeURIComponent(document.location.href).split("?");
    var args = {};
    
    if (parts.length === 2) {
        args = parts[1].split("&").reduce(
            function(accumulator, value) {
                var temp = value.split("=");
                if (temp.length === 2) {accumulator[temp[0].toLowerCase()] = temp[1];}
                return accumulator; 
            }, 
            args
        );
    }

    return args;

}	  
