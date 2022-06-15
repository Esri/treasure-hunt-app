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

export const parseArgs = () =>
{
    
    var parts = decodeURIComponent(document.location.href).split("?");
    var args = {};
    
    if (parts.length > 1) {
        args = parts[1].split("&").reduce(
            function(accumulator, value) {
                var temp = value.split("=");
                if (temp.length > 1) {accumulator[temp[0]] = temp[1];}
                return accumulator; 
            }, 
            args
        );
    }

    return args;

}	  
