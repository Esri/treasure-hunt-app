export const fetchFeatures = async (serviceURL) => 
{
  const response = await fetch(
    serviceURL+"/query?where=1+%3D+1&outFields=*&returnGeometry=true&f=pjson"
  );
  const json = await response.json();
  return json.features;
}      



export const getImageURL = async (serviceURL, objectid) =>
{
  const response = await fetch(
    serviceURL+"/queryAttachments?objectIds="+objectid+"&f=pjson"
  );
  const json = await response.json();
  return serviceURL+
          "/"+objectid+
          "/attachments/"+
          json.attachmentGroups.shift().attachmentInfos.shift().id;
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
