"use strict";(globalThis.webpackChunkth_v3=globalThis.webpackChunkth_v3||[]).push([[9583],{82582:(e,t,r)=>{r.d(t,{dp:()=>a,yZ:()=>s});var i=r(68860);function s(e,t){const r=t||e.extent,s=e.width,a=(0,i.c9)(r&&r.spatialReference);return r&&s?r.width/s*a*i.hd*96:0}function a(e,t){return e/((0,i.c9)(t)*i.hd*96)}},19583:(e,t,r)=>{r.r(t),r.d(t,{default:()=>V});var i=r(27366),s=r(76200),a=r(62044),o=r(10064),n=r(41691),l=r(93002),y=r(92026),p=r(97642),h=r(66978),u=r(49861),c=(r(63780),r(93169),r(25243)),d=r(38511),m=r(69912),b=r(31201),f=r(25265),g=r(53866),v=r(82582),S=r(30651),x=r(27961),_=r(6741),C=r(11936),I=r(6693),O=r(46671),w=r(6061),L=r(29598),E=r(71684),N=r(56811),P=r(18870),D=r(99063),M=r(45948),T=r(44041),F=r(77990),R=r(58132),J=r(26704);let j=class extends((0,I.h)((0,D.n)((0,N.M)((0,P.x)((0,_.O)((0,C.Y)((0,w.q)((0,L.I)((0,p.R)((0,E.Q)((0,x.V)((0,O.N)((0,n.p)(S.Z)))))))))))))){constructor(){super(...arguments),this.datesInUnknownTimezone=!1,this.dpi=96,this.gdbVersion=null,this.imageFormat="png24",this.imageMaxHeight=2048,this.imageMaxWidth=2048,this.imageTransparency=!0,this.isReference=null,this.labelsVisible=!1,this.operationalLayerType="ArcGISMapServiceLayer",this.sourceJSON=null,this.sublayers=null,this.type="map-image",this.url=null}normalizeCtorArgs(e,t){return"string"==typeof e?{url:e,...t}:e}load(e){const t=(0,y.pC)(e)?e.signal:null;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Map Service"]},e).catch(h.r9).then((()=>this._fetchService(t)))),Promise.resolve(this)}readImageFormat(e,t){const r=t.supportedImageFormatTypes;return r&&r.includes("PNG32")?"png32":"png24"}writeSublayers(e,t,r,i){if(!this.loaded||!e)return;const s=e.slice().reverse().flatten((e=>{let{sublayers:t}=e;return t&&t.toArray().reverse()})).toArray();let a=!1;if(this.capabilities&&this.capabilities.operations.supportsExportMap&&this.capabilities.exportMap.supportsDynamicLayers){const e=(0,f.M9)(i.origin);if(e===f.s3.PORTAL_ITEM){const e=this.createSublayersForOrigin("service").sublayers;a=(0,R.QV)(s,e,f.s3.SERVICE)}else if(e>f.s3.PORTAL_ITEM){const e=this.createSublayersForOrigin("portal-item");a=(0,R.QV)(s,e.sublayers,(0,f.M9)(e.origin))}}const o=[],n={writeSublayerStructure:a,...i};let l=a;s.forEach((e=>{const t=e.write({},n);o.push(t),l=l||"user"===e.originOf("visible")})),o.some((e=>Object.keys(e).length>1))&&(t.layers=o),l&&(t.visibleLayers=s.filter((e=>e.visible)).map((e=>e.id)))}createExportImageParameters(e,t,r,i){const s=i&&i.pixelRatio||1;e&&this.version>=10&&(e=e.clone().shiftCentralMeridian());const a=new T.R({layer:this,floors:i?.floors,scale:(0,v.yZ)({extent:e,width:t})*s}),o=a.toJSON();a.destroy();const n=!i||!i.rotation||this.version<10.3?{}:{rotation:-i.rotation},l=e&&e.spatialReference,y=l.wkid||JSON.stringify(l.toJSON());o.dpi*=s;const p={};if(i?.timeExtent){const{start:e,end:t}=i.timeExtent.toJSON();p.time=e&&t&&e===t?""+e:`${null==e?"null":e},${null==t?"null":t}`}else this.timeInfo&&!this.timeInfo.hasLiveData&&(p.time="null,null");return{bbox:e&&e.xmin+","+e.ymin+","+e.xmax+","+e.ymax,bboxSR:y,imageSR:y,size:t+","+r,...o,...n,...p}}async fetchImage(e,t,r,i){const a={responseType:"image",signal:i?.signal??null,query:{...this.parsedUrl.query,...this.createExportImageParameters(e,t,r,i),f:"image",...this.refreshParameters,...this.customParameters,token:this.apiKey}},n=this.parsedUrl.path+"/export";if(null!=a.query.dynamicLayers&&!this.capabilities.exportMap.supportsDynamicLayers)throw new o.Z("mapimagelayer:dynamiclayer-not-supported",`service ${this.url} doesn't support dynamic layers, which is required to be able to change the sublayer's order, rendering, labeling or source.`,{query:a.query});return(0,s.default)(n,a).then((e=>e.data)).catch((e=>{if((0,h.D_)(e))throw e;throw new o.Z("mapimagelayer:image-fetch-error",`Unable to load image: ${n}`,{error:e})}))}async fetchRecomputedExtents(){const e={...arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},query:{returnUpdates:!0,f:"json",...this.customParameters,token:this.apiKey}},{data:t}=await(0,s.default)(this.url,e),{extent:r,fullExtent:i,timeExtent:o}=t,n=r||i;return{fullExtent:n&&g.Z.fromJSON(n),timeExtent:o&&a.Z.fromJSON({start:o[0],end:o[1]})}}loadAll(){return(0,l.G)(this,(e=>{e(this.allSublayers)}))}serviceSupportsSpatialReference(e){return(0,J.D)(this,e)}async _fetchService(e){if(this.sourceJSON)return void this.read(this.sourceJSON,{origin:"service",url:this.parsedUrl});const{data:t,ssl:r}=await(0,s.default)(this.parsedUrl.path,{query:{f:"json",...this.parsedUrl.query,...this.customParameters,token:this.apiKey},signal:e});r&&(this.url=this.url.replace(/^http:/i,"https:")),this.sourceJSON=t,this.read(t,{origin:"service",url:this.parsedUrl})}};(0,i._)([(0,u.Cb)({type:Boolean})],j.prototype,"datesInUnknownTimezone",void 0),(0,i._)([(0,u.Cb)()],j.prototype,"dpi",void 0),(0,i._)([(0,u.Cb)()],j.prototype,"gdbVersion",void 0),(0,i._)([(0,u.Cb)()],j.prototype,"imageFormat",void 0),(0,i._)([(0,d.r)("imageFormat",["supportedImageFormatTypes"])],j.prototype,"readImageFormat",null),(0,i._)([(0,u.Cb)({json:{origins:{service:{read:{source:"maxImageHeight"}}}}})],j.prototype,"imageMaxHeight",void 0),(0,i._)([(0,u.Cb)({json:{origins:{service:{read:{source:"maxImageWidth"}}}}})],j.prototype,"imageMaxWidth",void 0),(0,i._)([(0,u.Cb)()],j.prototype,"imageTransparency",void 0),(0,i._)([(0,u.Cb)({type:Boolean,json:{read:!1,write:{enabled:!0,overridePolicy:()=>({enabled:!1})}}})],j.prototype,"isReference",void 0),(0,i._)([(0,u.Cb)({json:{read:!1,write:!1}})],j.prototype,"labelsVisible",void 0),(0,i._)([(0,u.Cb)({type:["ArcGISMapServiceLayer"]})],j.prototype,"operationalLayerType",void 0),(0,i._)([(0,u.Cb)({json:{read:!1,write:!1}})],j.prototype,"popupEnabled",void 0),(0,i._)([(0,u.Cb)()],j.prototype,"sourceJSON",void 0),(0,i._)([(0,u.Cb)({json:{write:{ignoreOrigin:!0}}})],j.prototype,"sublayers",void 0),(0,i._)([(0,b.c)("sublayers",{layers:{type:[F.Z]},visibleLayers:{type:[c.z8]}})],j.prototype,"writeSublayers",null),(0,i._)([(0,u.Cb)({type:["show","hide","hide-children"]})],j.prototype,"listMode",void 0),(0,i._)([(0,u.Cb)({json:{read:!1},readOnly:!0,value:"map-image"})],j.prototype,"type",void 0),(0,i._)([(0,u.Cb)(M.HQ)],j.prototype,"url",void 0),j=(0,i._)([(0,m.j)("esri.layers.MapImageLayer")],j);const V=j},44041:(e,t,r)=>{r.d(t,{R:()=>d});var i=r(27366),s=r(85015),a=r(41691),o=r(92026),n=r(76672),l=r(49861),y=(r(63780),r(93169),r(25243),r(69912)),p=r(45948),h=r(87072),u=r(58132);const c={visible:"visibleSublayers",definitionExpression:"layerDefs",labelingInfo:"hasDynamicLayers",labelsVisible:"hasDynamicLayers",opacity:"hasDynamicLayers",minScale:"visibleSublayers",maxScale:"visibleSublayers",renderer:"hasDynamicLayers",source:"hasDynamicLayers"};let d=class extends((0,a.p)(s.Z)){constructor(e){super(e),this.floors=null,this.scale=0}destroy(){this.layer=null}get dynamicLayers(){if(!this.hasDynamicLayers)return null;const e=this.visibleSublayers.map((e=>{const t=(0,h.f)(this.floors,e);return e.toExportImageJSON(t)}));return e.length?JSON.stringify(e):null}get hasDynamicLayers(){return this.layer&&(0,u.FN)(this.visibleSublayers,this.layer.serviceSublayers,this.layer.gdbVersion)}set layer(e){this._get("layer")!==e&&(this._set("layer",e),this.handles.remove("layer"),e&&this.handles.add([e.allSublayers.on("change",(()=>this.notifyChange("visibleSublayers"))),e.on("sublayer-update",(e=>this.notifyChange(c[e.propertyName])))],"layer"))}get layers(){const e=this.visibleSublayers;return e?e.length?"show:"+e.map((e=>e.id)).join(","):"show:-1":null}get layerDefs(){const e=!!this.floors?.length,t=this.visibleSublayers.filter((t=>null!=t.definitionExpression||e&&null!=t.floorInfo));return t.length?JSON.stringify(t.reduce(((e,t)=>{const r=(0,h.f)(this.floors,t),i=(0,n._)(r,t.definitionExpression);return(0,o.pC)(i)&&(e[t.id]=i),e}),{})):null}get version(){this.commitProperty("layers"),this.commitProperty("layerDefs"),this.commitProperty("dynamicLayers"),this.commitProperty("timeExtent");const e=this.layer;return e&&(e.commitProperty("dpi"),e.commitProperty("imageFormat"),e.commitProperty("imageTransparency"),e.commitProperty("gdbVersion")),(this._get("version")||0)+1}get visibleSublayers(){const e=[];if(!this.layer)return e;const t=this.layer.sublayers,r=t=>{const i=this.scale,s=0===i,a=0===t.minScale||i<=t.minScale,o=0===t.maxScale||i>=t.maxScale;t.visible&&(s||a&&o)&&(t.sublayers?t.sublayers.forEach(r):e.unshift(t))};t&&t.forEach(r);const i=this._get("visibleSublayers");return!i||i.length!==e.length||i.some(((t,r)=>e[r]!==t))?e:i}toJSON(){const e=this.layer;let t={dpi:e.dpi,format:e.imageFormat,transparent:e.imageTransparency,gdbVersion:e.gdbVersion||null};return this.hasDynamicLayers&&this.dynamicLayers?t.dynamicLayers=this.dynamicLayers:t={...t,layers:this.layers,layerDefs:this.layerDefs},t}};(0,i._)([(0,l.Cb)({readOnly:!0})],d.prototype,"dynamicLayers",null),(0,i._)([(0,l.Cb)()],d.prototype,"floors",void 0),(0,i._)([(0,l.Cb)({readOnly:!0})],d.prototype,"hasDynamicLayers",null),(0,i._)([(0,l.Cb)()],d.prototype,"layer",null),(0,i._)([(0,l.Cb)({readOnly:!0})],d.prototype,"layers",null),(0,i._)([(0,l.Cb)({readOnly:!0})],d.prototype,"layerDefs",null),(0,i._)([(0,l.Cb)({type:Number})],d.prototype,"scale",void 0),(0,i._)([(0,l.Cb)(p.qG)],d.prototype,"timeExtent",void 0),(0,i._)([(0,l.Cb)({readOnly:!0})],d.prototype,"version",null),(0,i._)([(0,l.Cb)({readOnly:!0})],d.prototype,"visibleSublayers",null),d=(0,i._)([(0,y.j)("esri.layers.mixins.ExportImageParameters")],d)},87072:(e,t,r)=>{function i(e){const t=e.layer;return"floorInfo"in t&&t.floorInfo?.floorField&&"floors"in e.view?a(e.view.floors,t.floorInfo.floorField):null}function s(e,t){return"floorInfo"in t&&t.floorInfo?.floorField?a(e,t.floorInfo.floorField):null}function a(e,t){if(!e?.length)return null;const r=e.filter((e=>""!==e)).map((e=>`'${e}'`));return r.push("''"),`${t} IN (${r.join(",")}) OR ${t} IS NULL`}r.d(t,{c:()=>i,f:()=>s})}}]);
//# sourceMappingURL=9583.a9a39e4e.chunk.js.map