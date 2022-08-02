"use strict";(globalThis.webpackChunkth_v3=globalThis.webpackChunkth_v3||[]).push([[519,2775,3388],{20519:(e,a,r)=>{r.r(a),r.d(a,{populateOperationalLayers:()=>c});var t=r(81608),n=(r(93169),r(66978)),l=r(19610),i=r(98995);function y(e,a){return!(!e.layerType||"ArcGISFeatureLayer"!==e.layerType)&&e.featureCollectionType===a}var o=r(42775),s=r(21371);async function c(e,a,r){if(!a)return;const t=[];for(const n of a){const e=S(n,r);"GroupLayer"===n.layerType?t.push(v(e,n,r)):t.push(e)}const l=await(0,n.as)(t);for(const n of l)!n.value||r.filter&&!r.filter(n.value)||e.add(n.value)}const u={ArcGISFeatureLayer:"FeatureLayer",ArcGISImageServiceLayer:"ImageryLayer",ArcGISMapServiceLayer:"MapImageLayer",PointCloudLayer:"PointCloudLayer",ArcGISSceneServiceLayer:"SceneLayer",IntegratedMeshLayer:"IntegratedMeshLayer",OGCFeatureLayer:"OGCFeatureLayer",BuildingSceneLayer:"BuildingSceneLayer",ArcGISTiledElevationServiceLayer:"ElevationLayer",ArcGISTiledImageServiceLayer:"ImageryTileLayer",ArcGISTiledMapServiceLayer:"TileLayer",GroupLayer:"GroupLayer",GeoJSON:"GeoJSONLayer",WebTiledLayer:"WebTileLayer",CSV:"CSVLayer",VectorTileLayer:"VectorTileLayer",WFS:"WFSLayer",WMS:"WMSLayer",DefaultTileLayer:"TileLayer",KML:"KMLLayer",RasterDataLayer:"UnsupportedLayer",Voxel:"VoxelLayer"},d={ArcGISTiledElevationServiceLayer:"ElevationLayer",DefaultTileLayer:"ElevationLayer",RasterDataElevationLayer:"UnsupportedLayer"},L={ArcGISTiledMapServiceLayer:"TileLayer",ArcGISTiledImageServiceLayer:"ImageryTileLayer",OpenStreetMap:"OpenStreetMapLayer",WebTiledLayer:"WebTileLayer",VectorTileLayer:"VectorTileLayer",ArcGISImageServiceLayer:"UnsupportedLayer",WMS:"UnsupportedLayer",ArcGISMapServiceLayer:"UnsupportedLayer",DefaultTileLayer:"TileLayer"},p={ArcGISFeatureLayer:"FeatureLayer",ArcGISImageServiceLayer:"ImageryLayer",ArcGISImageServiceVectorLayer:"ImageryLayer",ArcGISMapServiceLayer:"MapImageLayer",ArcGISStreamLayer:"StreamLayer",ArcGISTiledImageServiceLayer:"ImageryTileLayer",ArcGISTiledMapServiceLayer:"TileLayer",BingMapsAerial:"BingMapsLayer",BingMapsRoad:"BingMapsLayer",BingMapsHybrid:"BingMapsLayer",CSV:"CSVLayer",DefaultTileLayer:"TileLayer",GeoRSS:"GeoRSSLayer",GeoJSON:"GeoJSONLayer",GroupLayer:"GroupLayer",KML:"KMLLayer",OGCFeatureLayer:"OGCFeatureLayer",SubtypeGroupLayer:"UnsupportedLayer",VectorTileLayer:"VectorTileLayer",WFS:"WFSLayer",WMS:"WMSLayer",WebTiledLayer:"WebTileLayer"},f={ArcGISFeatureLayer:"FeatureLayer"},m={ArcGISImageServiceLayer:"ImageryLayer",ArcGISImageServiceVectorLayer:"ImageryLayer",ArcGISMapServiceLayer:"MapImageLayer",ArcGISTiledImageServiceLayer:"ImageryTileLayer",ArcGISTiledMapServiceLayer:"TileLayer",OpenStreetMap:"OpenStreetMapLayer",VectorTileLayer:"VectorTileLayer",WebTiledLayer:"WebTileLayer",BingMapsAerial:"BingMapsLayer",BingMapsRoad:"BingMapsLayer",BingMapsHybrid:"BingMapsLayer",WMS:"WMSLayer",DefaultTileLayer:"TileLayer"};async function S(e,a){return async function(e,a,r){const t=new e;return t.read(a,r.context),"group"===t.type&&I(a)&&await async function(e,a,r){const t=l.T.FeatureLayer,n=await t(),i=a.featureCollection,y=i.showLegend,o=i.layers.map(((t,l)=>{var i,o;const s=new n;s.read(t,r);const c={...r,ignoreDefaults:!0};return s.read({id:`${e.id}-sublayer-${l}`,visibility:null==(i=null==(o=a.visibleLayers)?void 0:o.includes(l))||i},c),null!=y&&s.read({showLegend:y},c),s}));e.layers.addMany(o)}(t,a,r.context),await(0,s.y)(t,r.context),t}(await async function(e,a){const r=a.context,t=h(r);let n=e.layerType||e.type;!n&&a&&a.defaultLayerType&&(n=a.defaultLayerType);const s=t[n];let c=s?l.T[s]:l.T.UnknownLayer;if(T(e)){const a=null==r?void 0:r.portal;if(e.itemId){const r=new i.default({id:e.itemId,portal:a});await r.load();const t=(await(0,o.selectLayerClassPath)(r)).className||"UnknownLayer";c=l.T[t]}}else"ArcGISFeatureLayer"===n?function(e){return y(e,"notes")}(e)?c=l.T.MapNotesLayer:function(e){return y(e,"route")}(e)?c=l.T.RouteLayer:I(e)&&(c=l.T.GroupLayer):e.wmtsInfo&&e.wmtsInfo.url&&e.wmtsInfo.layerIdentifier?c=l.T.WMTSLayer:"WFS"===n&&"2.0.0"!==e.wfsInfo.version&&(c=l.T.UnsupportedLayer);return c()}(e,a),e,a)}function I(e){var a,r,t;return"ArcGISFeatureLayer"===e.layerType&&!T(e)&&(null!=(a=null==(r=e.featureCollection)||null==(t=r.layers)?void 0:t.length)?a:0)>1}function T(e){return"Feature Collection"===e.type}function h(e){let a;if("web-scene"===e.origin)switch(e.layerContainerType){case"basemap":a=L;break;case"ground":a=d;break;default:a=u}else switch(e.layerContainerType){case"basemap":a=m;break;case"tables":a=f;break;default:a=p}return a}async function v(e,a,r){const n=new t.Z,l=c(n,Array.isArray(a.layers)?a.layers:[],r),i=await e;if(await l,"group"===i.type)return i.layers.addMany(n),i}},19610:(e,a,r)=>{r.d(a,{T:()=>t});const t={BingMapsLayer:async()=>(await r.e(165).then(r.bind(r,60165))).default,BuildingSceneLayer:async()=>(await Promise.all([r.e(5731),r.e(6505)]).then(r.bind(r,66505))).default,CSVLayer:async()=>(await r.e(8435).then(r.bind(r,98435))).default,ElevationLayer:async()=>(await r.e(9512).then(r.bind(r,59512))).default,FeatureLayer:async()=>(await Promise.resolve().then(r.bind(r,94990))).default,GroupLayer:async()=>(await r.e(5069).then(r.bind(r,65069))).default,GeoRSSLayer:async()=>(await r.e(54).then(r.bind(r,70054))).default,GeoJSONLayer:async()=>(await r.e(5064).then(r.bind(r,5064))).default,ImageryLayer:async()=>(await Promise.all([r.e(7314),r.e(5345),r.e(7038),r.e(1638),r.e(1168)]).then(r.bind(r,11168))).default,ImageryTileLayer:async()=>(await Promise.all([r.e(7314),r.e(5345),r.e(394),r.e(7038),r.e(1638),r.e(3060)]).then(r.bind(r,93060))).default,IntegratedMeshLayer:async()=>(await Promise.all([r.e(5731),r.e(4710)]).then(r.bind(r,84710))).default,KMLLayer:async()=>(await r.e(3838).then(r.bind(r,13838))).default,MapImageLayer:async()=>(await Promise.all([r.e(9668),r.e(9583)]).then(r.bind(r,19583))).default,MapNotesLayer:async()=>(await r.e(9622).then(r.bind(r,69622))).default,OGCFeatureLayer:async()=>(await r.e(8701).then(r.bind(r,98701))).default,OpenStreetMapLayer:async()=>(await r.e(1656).then(r.bind(r,31656))).default,PointCloudLayer:async()=>(await Promise.all([r.e(5731),r.e(9532)]).then(r.bind(r,9532))).default,RouteLayer:async()=>(await Promise.all([r.e(8916),r.e(9129)]).then(r.bind(r,49129))).default,SceneLayer:async()=>(await Promise.all([r.e(5731),r.e(2964)]).then(r.bind(r,2964))).default,StreamLayer:async()=>(await r.e(2668).then(r.bind(r,2668))).default,TileLayer:async()=>(await Promise.all([r.e(9668),r.e(2389)]).then(r.bind(r,42977))).default,UnknownLayer:async()=>(await r.e(4917).then(r.bind(r,74917))).default,UnsupportedLayer:async()=>(await r.e(8101).then(r.bind(r,88101))).default,VectorTileLayer:async()=>(await Promise.all([r.e(969),r.e(7735)]).then(r.bind(r,47409))).default,VoxelLayer:async()=>(await Promise.all([r.e(5731),r.e(5947)]).then(r.bind(r,15947))).default,WebTileLayer:async()=>(await r.e(9200).then(r.bind(r,89200))).default,WFSLayer:async()=>(await Promise.all([r.e(2622),r.e(8566)]).then(r.bind(r,38566))).default,WMSLayer:async()=>(await r.e(4227).then(r.bind(r,84227))).default,WMTSLayer:async()=>(await r.e(6951).then(r.bind(r,46951))).default}},32698:(e,a,r)=>{r.d(a,{m:()=>l});var t=r(35995),n=r(70032);function l(e){return{origin:"portal-item",url:(0,t.mN)(e.itemUrl),portal:e.portal||n.Z.getDefault(),portalItem:e,readResourcePaths:[]}}},33388:(e,a,r)=>{r.r(a),r.d(a,{getFirstLayerOrTableId:()=>f,getNumLayersAndTables:()=>m,load:()=>s,preprocessFSItemData:()=>p});var t=r(10064),n=r(19610),l=r(70032),i=r(32698),y=r(21371),o=r(41226);async function s(e,a){const r=e.instance.portalItem;return r&&r.id?(await r.load(a),function(e){const a=e.instance.portalItem;if(-1===e.supportedTypes.indexOf(a.type))throw new t.Z("portal:invalid-layer-item-type","Invalid layer item type '${type}', expected '${expectedType}'",{type:a.type,expectedType:e.supportedTypes.join(", ")})}(e),async function(e,a){const r=e.instance,t=r.portalItem,{url:n,title:l}=t,o=(0,i.m)(t);if("group"===r.type)return r.read({title:l},o),c(r,e);n&&r.read({url:n},o);const s=await L(e,a);return s&&r.read(s,o),r.resourceReferences={portalItem:t,paths:o.readResourcePaths},r.read({title:l},o),(0,y.y)(r,o)}(e,a)):Promise.resolve()}function c(e,a){let r;const l=e.portalItem.type;switch(l){case"Feature Service":case"Feature Collection":r=n.T.FeatureLayer;break;case"Stream Service":r=n.T.StreamLayer;break;case"Scene Service":r=n.T.SceneLayer;break;default:throw new t.Z("portal:unsupported-item-type-as-group",`The item type '${l}' is not supported as a 'IGroupLayer'`)}let i;return r().then((e=>(i=e,L(a)))).then((async a=>"Feature Service"===l?(a=await p(a,e.portalItem.url),u(e,i,a)):m(a)>0?u(e,i,a):function(e,a){return e.portalItem.url?(0,o.b)(e.portalItem.url).then((r=>{var t,n;function l(e){return{id:e.id,name:e.name}}r&&u(e,a,{layers:null==(t=r.layers)?void 0:t.map(l),tables:null==(n=r.tables)?void 0:n.map(l)})})):Promise.resolve()}(e,i)))}function u(e,a,r){let t=r.layers||[];const n=r.tables||[];"Feature Collection"===e.portalItem.type&&(t.forEach((e=>{var a;"Table"===(null==e||null==(a=e.layerDefinition)?void 0:a.type)&&n.push(e)})),t=t.filter((e=>{var a;return"Table"!==(null==e||null==(a=e.layerDefinition)?void 0:a.type)}))),t.reverse().forEach((t=>{const n=d(e,a,r,t);e.add(n)})),n.reverse().forEach((t=>{const n=d(e,a,r,t);e.tables.add(n)}))}function d(e,a,r,t){const n=new a({portalItem:e.portalItem.clone(),layerId:t.id,sublayerTitleMode:"service-name"});if("Feature Collection"===e.portalItem.type){const a={origin:"portal-item",portal:e.portalItem.portal||l.Z.getDefault()};n.read(t,a);const i=r.showLegend;null!=i&&n.read({showLegend:i},a)}return n}function L(e,a){if(!1===e.supportsData)return Promise.resolve(void 0);const r=e.instance;return r.portalItem.fetchData("json",a).catch((()=>null)).then((async e=>{if(function(e){return"stream"!==e.type&&"layerId"in e}(r)){let a,t=!0;return e&&m(e)>0&&(null==r.layerId&&(r.layerId=f(e)),a=function(e,a){const r=e.layers;if(r)for(let n=0;n<r.length;n++)if(r[n].id===a)return r[n];const t=e.tables;if(t)for(let n=0;n<t.length;n++)if(t[n].id===a)return t[n];return null}(e,r.layerId),a&&(1===m(e)&&(t=!1),null!=e.showLegend&&(a.showLegend=e.showLegend))),t&&"service-name"!==r.sublayerTitleMode&&(r.sublayerTitleMode="item-title-and-service-name"),a}return e}))}async function p(e,a){var r,t;if(null==(null==(r=e)?void 0:r.layers)||null==(null==(t=e)?void 0:t.tables)){const r=await(0,o.b)(a);(e=e||{}).layers=e.layers||(null==r?void 0:r.layers),e.tables=e.tables||(null==r?void 0:r.tables)}return e}function f(e){const a=e.layers;if(a&&a.length)return a[0].id;const r=e.tables;return r&&r.length?r[0].id:null}function m(e){var a,r,t,n;return(null!=(a=null==e||null==(r=e.layers)?void 0:r.length)?a:0)+(null!=(t=null==e||null==(n=e.tables)?void 0:n.length)?t:0)}},42775:(e,a,r)=>{r.r(a),r.d(a,{fromItem:()=>s,selectLayerClassPath:()=>c});var t=r(10064),n=r(19610),l=r(98995),i=r(33388);function y(e,a){return!!e.typeKeywords&&e.typeKeywords.indexOf(a)>-1}var o=r(41226);function s(e){return!e.portalItem||e.portalItem instanceof l.default||(e={...e,portalItem:new l.default(e.portalItem)}),function(e){return e.load().then(c).then(u)}(e.portalItem).then((a=>{const r={portalItem:e.portalItem,...a.properties},t=a.constructor;return Promise.resolve(new t(r))}))}function c(e){switch(e.type){case"Map Service":return function(e){return function(e){return(0,o.b)(e.url).then((e=>e.tileInfo))}(e).then((e=>e?{className:"TileLayer"}:{className:"MapImageLayer"}))}(e);case"Feature Service":return function(e){return d(e).then((e=>{if("object"==typeof e){const a={};return null!=e.id&&(a.layerId=e.id),{className:"FeatureLayer",properties:a}}return{className:"GroupLayer"}}))}(e);case"Feature Collection":return async function(e){if(await e.load(),y(e,"Map Notes"))return{className:"MapNotesLayer"};if(y(e,"Route Layer"))return{className:"RouteLayer"};const a=await e.fetchData();return 1===(0,i.getNumLayersAndTables)(a)?{className:"FeatureLayer"}:{className:"GroupLayer"}}(e);case"Scene Service":return function(e){return d(e).then((a=>{if("object"==typeof a){const r={};let t;if(null!=a.id?(r.layerId=a.id,t=`${e.url}/layers/${a.id}`):t=e.url,Array.isArray(e.typeKeywords)&&e.typeKeywords.length>0){const a={IntegratedMesh:"IntegratedMeshLayer","3DObject":"SceneLayer",Point:"SceneLayer",PointCloud:"PointCloudLayer",Building:"BuildingSceneLayer"};for(const r of Object.keys(a))if(-1!==e.typeKeywords.indexOf(r))return{className:a[r]}}return(0,o.b)(t).then((e=>{let a="SceneLayer";const t={Point:"SceneLayer","3DObject":"SceneLayer",IntegratedMesh:"IntegratedMeshLayer",PointCloud:"PointCloudLayer",Building:"BuildingSceneLayer"};return e&&e.layerType&&t[e.layerType]&&(a=t[e.layerType]),{className:a,properties:r}}))}return!1===a?(0,o.b)(e.url).then((e=>"Voxel"===(null==e?void 0:e.layerType)?{className:"VoxelLayer"}:{className:"GroupLayer"})):{className:"GroupLayer"}}))}(e);case"Image Service":return async function(e){var a,r,t;await e.load();const n=null!=(a=null==(r=e.typeKeywords)?void 0:r.map((e=>e.toLowerCase())))?a:[];if(n.indexOf("elevation 3d layer")>-1)return{className:"ElevationLayer"};if(n.indexOf("tiled imagery")>-1)return{className:"ImageryTileLayer"};const l=await e.fetchData(),i=null==l?void 0:l.layerType;return"ArcGISTiledImageServiceLayer"===i?{className:"ImageryTileLayer"}:"ArcGISImageServiceLayer"===i?{className:"ImageryLayer"}:"map"===(null==(t=(await(0,o.b)(e.url)).cacheType)?void 0:t.toLowerCase())?{className:"ImageryTileLayer"}:{className:"ImageryLayer"}}(e);case"Stream Service":case"Feed":return{className:"StreamLayer"};case"Vector Tile Service":return{className:"VectorTileLayer"};case"KML":return{className:"KMLLayer"};case"WFS":return{className:"WFSLayer"};case"WMTS":return{className:"WMTSLayer"};case"WMS":return{className:"WMSLayer"};default:return Promise.reject(new t.Z("portal:unknown-item-type","Unknown item type '${type}'",{type:e.type}))}}function u(e){return(0,n.T[e.className])().then((a=>({constructor:a,properties:e.properties})))}function d(e){return!e.url||e.url.match(/\/\d+$/)?Promise.resolve({}):e.load().then((()=>e.fetchData())).then((async a=>"Feature Service"===e.type?L(a=await(0,i.preprocessFSItemData)(a,e.url)):(0,i.getNumLayersAndTables)(a)>0?L(a):(0,o.b)(e.url).then(L)))}function L(e){return 1===(0,i.getNumLayersAndTables)(e)&&{id:(0,i.getFirstLayerOrTableId)(e)}}},41226:(e,a,r)=>{r.d(a,{b:()=>n});var t=r(76200);async function n(e){const{data:a}=await(0,t.default)(e,{responseType:"json",query:{f:"json"}});return a}}}]);
//# sourceMappingURL=519.e137396e.chunk.js.map