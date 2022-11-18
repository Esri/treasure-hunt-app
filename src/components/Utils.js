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

  let runningConfig = {
    initCenter: [-40, 29],
    homeZoom: 3,
    minZoom: 2,
    maxZoom: 16
  }

  if (args.edition) {
    const editionConfig = await lookUpConfig(args.edition);
    runningConfig = {...runningConfig, ...editionConfig};
  }

  const itemInfo = args.itemid && await getItemInfo(args.itemid);
  
  if (itemInfo) {
    runningConfig = {
      ...runningConfig, 
      ...itemInfo
    };
  }

  if (!runningConfig.serviceURL || !runningConfig.serviceURL.trim().length) {
    runningConfig = {...runningConfig, ...json}
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

const lookUpConfig = async(edition) => 
{
  const featureLayerRegistryURL = "https://services.arcgis.com/nzS0F0zdNLvs7nc8/arcgis/rest/services/survey123_aedff645769549a5bea20220e2da313f_results/FeatureServer/0"
  const response = await fetch(
    featureLayerRegistryURL+"/query?where=edition='"+edition+"'&outFields=*&returnGeometry=true&f=pjson"
  );
  const json = await response.json();
  let config = null;
  if (json.features.length) {
    const attributes = json.features[0].attributes;
    const itemInfo = await getItemInfo(attributes.item_id);
    const imageURLs = await getImageURLs(featureLayerRegistryURL, [attributes.objectid]);
    config = {
      title: attributes.title,
      description: attributes.subtitle,
      serviceURL: itemInfo.serviceURL,
      homeZoom: parseInt(attributes.home_zoom),
      minZoom: parseInt(attributes.minimum_zoom),
      maxZoom: parseInt(attributes.maximum_zoom),
      initCenter: [json.features[0].geometry.x, json.features[0].geometry.y],
      introImage: imageURLs.length ? imageURLs[0].imageURL : null,
      sortKeys: attributes.sort_keys && attributes.sort_keys.split(",").map((value)=>parseInt(value))
    }
  }
  return config;
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
              (value.name.includes("stakeholder") || value.name.includes("results"))
    ).shift();

    return {
            title: (surveyFormItem && surveyFormItem.title) || "Your title here", 
            description: (surveyFormItem && surveyFormItem.description) || "You're subtitle here too (once you add your Treasure Hunt to the registry).",
            serviceURL: featureServiceItem.url+"/0"
          };

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
