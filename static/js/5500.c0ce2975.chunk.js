"use strict";(globalThis.webpackChunkth_v3=globalThis.webpackChunkth_v3||[]).push([[5500],{65630:(e,t,r)=>{r.d(t,{D:()=>D,b:()=>L});var i=r(50951),o=r(22357),n=r(83734),a=r(71011),s=r(33280),l=r(94951),c=r(81221),d=r(73782),u=r(52276),h=r(53230),m=r(60113),f=r(48655),p=r(28719),v=r(71410),g=r(32980),x=r(21002),T=r(38171),_=r(30694),b=r(4460),A=r(15226),S=r(96658),C=r(2116),M=r(41481),O=r(23235),y=r(18607),E=r(10763),w=r(14282),R=r(98082),P=r(98634),I=r(64201),N=r(4760);function L(e){const t=new I.kG,r=t.vertex.code,L=t.fragment.code;t.include(w.a,{name:"Default Material Shader",output:e.output}),t.vertex.uniforms.add("proj","mat4").add("view","mat4").add("cameraPosition","vec3").add("localOrigin","vec3");const D=e.hasModelTransformation;return D&&t.vertex.uniforms.add("model","mat4"),t.include(u.f),t.varyings.add("vpos","vec3"),t.include(y.kl,e),t.include(c.fQ,e),t.include(v.LC,e),e.output!==a.H.Color&&e.output!==a.H.Alpha||(t.include(d.O,e),t.include(l.w,{linearDepth:!1,hasModelTransformation:D}),e.normalType===d.h.Attribute&&e.offsetBackfaces&&t.include(n.w),t.include(T.Q,e),t.include(p.B,e),e.instancedColor&&t.attributes.add(N.T.INSTANCECOLOR,"vec4"),t.varyings.add("localvpos","vec3"),t.include(m.D,e),t.include(o.q,e),t.include(h.R,e),t.include(f.c,e),t.vertex.uniforms.add("externalColor","vec4"),t.varyings.add("vcolorExt","vec4"),e.multipassTerrainEnabled&&t.varyings.add("depth","float"),r.add(P.H`
      void main(void) {
        forwardNormalizedVertexColor();
        vcolorExt = externalColor;
        ${e.instancedColor?"vcolorExt *= instanceColor;":""}
        vcolorExt *= vvColor();
        vcolorExt *= getSymbolColor();
        forwardColorMixMode();

        if (vcolorExt.a < ${P.H.float(E.bf)}) {
          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
        }
        else {
          vpos = calculateVPos();
          localvpos = vpos - view[3].xyz;
          vpos = subtractOrigin(vpos);
          ${e.normalType===d.h.Attribute?P.H`
          vNormalWorld = dpNormal(vvLocalNormal(normalModel()));`:""}
          vpos = addVerticalOffset(vpos, localOrigin);
          ${e.vertexTangents?"vTangent = dpTransformVertexTangent(tangent);":""}
          gl_Position = transformPosition(proj, view, ${D?"model,":""} vpos);
          ${e.normalType===d.h.Attribute&&e.offsetBackfaces?"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, cameraPosition);":""}
        }

        ${e.multipassTerrainEnabled?"depth = (view * vec4(vpos, 1.0)).z;":""}
        forwardLinearDepth();
        forwardTextureCoordinates();
      }
    `)),e.output===a.H.Alpha&&(t.include(s.p2,e),t.include(E.sj,e),e.multipassTerrainEnabled&&(t.fragment.include(x.S),t.include(A.l,e)),t.fragment.uniforms.add("cameraPosition","vec3").add("localOrigin","vec3").add("opacity","float").add("layerOpacity","float"),e.hasColorTexture&&t.fragment.uniforms.add("tex","sampler2D"),t.fragment.include(R.y),L.add(P.H`
      void main() {
        discardBySlice(vpos);
        ${e.multipassTerrainEnabled?"terrainDepthTest(gl_FragCoord, depth);":""}
        ${e.hasColorTexture?P.H`
        vec4 texColor = texture2D(tex, vuv0);
        ${e.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
        discardOrAdjustAlpha(texColor);`:P.H`vec4 texColor = vec4(1.0);`}
        ${e.attributeColor?P.H`
        float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:P.H`
        float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));
        `}
        gl_FragColor = vec4(opacity_);
      }
    `)),e.output===a.H.Color&&(t.include(s.p2,e),t.include(b.X,e),t.include(_.K,e),t.include(E.sj,e),e.receiveShadows&&t.include(O.hX,e),e.multipassTerrainEnabled&&(t.fragment.include(x.S),t.include(A.l,e)),t.fragment.uniforms.add("cameraPosition","vec3").add("localOrigin","vec3").add("ambient","vec3").add("diffuse","vec3").add("opacity","float").add("layerOpacity","float"),e.hasColorTexture&&t.fragment.uniforms.add("tex","sampler2D"),t.include(M.jV,e),t.include(C.T,e),t.fragment.include(R.y),t.include(S.k,e),L.add(P.H`
      void main() {
        discardBySlice(vpos);
        ${e.multipassTerrainEnabled?"terrainDepthTest(gl_FragCoord, depth);":""}
        ${e.hasColorTexture?P.H`
        vec4 texColor = texture2D(tex, vuv0);
        ${e.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
        discardOrAdjustAlpha(texColor);`:P.H`vec4 texColor = vec4(1.0);`}
        shadingParams.viewDirection = normalize(vpos - cameraPosition);
        ${e.normalType===d.h.ScreenDerivative?P.H`
        vec3 normal = screenDerivativeNormal(localvpos);`:P.H`
        shadingParams.normalView = vNormalWorld;
        vec3 normal = shadingNormal(shadingParams);`}
        ${e.pbrMode===M.f7.Normal?"applyPBRFactors();":""}
        float ssao = evaluateAmbientOcclusionInverse();
        ssao *= getBakedOcclusion();

        float additionalAmbientScale = additionalDirectedAmbientLight(vpos + localOrigin);
        vec3 additionalLight = ssao * lightingMainIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
        ${e.receiveShadows?"float shadow = readShadowMap(vpos, linearDepth);":e.viewingMode===i.JY.Global?"float shadow = lightingGlobalFactor * (1.0 - additionalAmbientScale);":"float shadow = 0.0;"}
        vec3 matColor = max(ambient, diffuse);
        ${e.attributeColor?P.H`
        vec3 albedo_ = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
        float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:P.H`
        vec3 albedo_ = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
        float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));
        `}
        ${e.hasNormalTexture?P.H`
              mat3 tangentSpace = ${e.vertexTangents?"computeTangentSpace(normal);":"computeTangentSpace(normal, vpos, vuv0);"}
              vec3 shadedNormal = computeTextureNormal(tangentSpace, vuv0);`:"vec3 shadedNormal = normal;"}
        ${e.pbrMode===M.f7.Normal||e.pbrMode===M.f7.Schematic?e.viewingMode===i.JY.Global?P.H`vec3 normalGround = normalize(vpos + localOrigin);`:P.H`vec3 normalGround = vec3(0.0, 0.0, 1.0);`:P.H``}
        ${e.pbrMode===M.f7.Normal||e.pbrMode===M.f7.Schematic?P.H`
            float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * lightingMainIntensity[2];
            vec3 shadedColor = evaluateSceneLightingPBR(shadedNormal, albedo_, shadow, 1.0 - ssao, additionalLight, shadingParams.viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:"vec3 shadedColor = evaluateSceneLighting(shadedNormal, albedo_, shadow, 1.0 - ssao, additionalLight);"}
        gl_FragColor = highlightSlice(vec4(shadedColor, opacity_), vpos);
        ${e.oitEnabled?"gl_FragColor = premultiplyAlpha(gl_FragColor);":""}
      }
    `)),t.include(g.s,e),t}const D=Object.freeze({__proto__:null,build:L})},40563:(e,t,r)=>{r.d(t,{R:()=>P,b:()=>R});var i=r(50951),o=r(22357),n=r(83734),a=r(71011),s=r(33280),l=r(94951),c=r(81221),d=r(73782),u=r(52276),h=r(53230),m=r(60113),f=r(48655),p=r(71410),v=r(32980),g=r(21002),x=r(30694),T=r(4460),_=r(15226),b=r(2116),A=r(41481),S=r(23235),C=r(18607),M=r(10763),O=r(98082),y=r(98634),E=r(64201),w=r(4760);function R(e){const t=new E.kG,r=t.vertex.code,R=t.fragment.code;return t.vertex.uniforms.add("proj","mat4").add("view","mat4").add("cameraPosition","vec3").add("localOrigin","vec3"),t.include(u.f),t.varyings.add("vpos","vec3"),t.include(C.kl,e),t.include(c.fQ,e),t.include(p.LC,e),e.output!==a.H.Color&&e.output!==a.H.Alpha||(t.include(d.O,e),t.include(l.w,{linearDepth:!1}),e.offsetBackfaces&&t.include(n.w),e.instancedColor&&t.attributes.add(w.T.INSTANCECOLOR,"vec4"),t.varyings.add("vNormalWorld","vec3"),t.varyings.add("localvpos","vec3"),e.multipassTerrainEnabled&&t.varyings.add("depth","float"),t.include(m.D,e),t.include(o.q,e),t.include(h.R,e),t.include(f.c,e),t.vertex.uniforms.add("externalColor","vec4"),t.varyings.add("vcolorExt","vec4"),r.add(y.H`
        void main(void) {
          forwardNormalizedVertexColor();
          vcolorExt = externalColor;
          ${e.instancedColor?"vcolorExt *= instanceColor;":""}
          vcolorExt *= vvColor();
          vcolorExt *= getSymbolColor();
          forwardColorMixMode();

          if (vcolorExt.a < ${y.H.float(M.bf)}) {
            gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
          }
          else {
            vpos = calculateVPos();
            localvpos = vpos - view[3].xyz;
            vpos = subtractOrigin(vpos);
            vNormalWorld = dpNormal(vvLocalNormal(normalModel()));
            vpos = addVerticalOffset(vpos, localOrigin);
            gl_Position = transformPosition(proj, view, vpos);
            ${e.offsetBackfaces?"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, cameraPosition);":""}
          }
          ${e.multipassTerrainEnabled?y.H`depth = (view * vec4(vpos, 1.0)).z;`:""}
          forwardLinearDepth();
          forwardTextureCoordinates();
        }
      `)),e.output===a.H.Alpha&&(t.include(s.p2,e),t.include(M.sj,e),e.multipassTerrainEnabled&&(t.fragment.include(g.S),t.include(_.l,e)),t.fragment.uniforms.add("cameraPosition","vec3").add("localOrigin","vec3").add("opacity","float").add("layerOpacity","float"),t.fragment.uniforms.add("view","mat4"),e.hasColorTexture&&t.fragment.uniforms.add("tex","sampler2D"),t.fragment.include(O.y),R.add(y.H`
      void main() {
        discardBySlice(vpos);
        ${e.multipassTerrainEnabled?y.H`terrainDepthTest(gl_FragCoord, depth);`:""}
        ${e.hasColorTexture?y.H`
        vec4 texColor = texture2D(tex, vuv0);
        ${e.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
        discardOrAdjustAlpha(texColor);`:y.H`vec4 texColor = vec4(1.0);`}
        ${e.attributeColor?y.H`
        float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:y.H`
        float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));
        `}

        gl_FragColor = vec4(opacity_);
      }
    `)),e.output===a.H.Color&&(t.include(s.p2,e),t.include(T.X,e),t.include(x.K,e),t.include(M.sj,e),e.receiveShadows&&t.include(S.hX,e),e.multipassTerrainEnabled&&(t.fragment.include(g.S),t.include(_.l,e)),t.fragment.uniforms.add("cameraPosition","vec3").add("localOrigin","vec3").add("ambient","vec3").add("diffuse","vec3").add("opacity","float").add("layerOpacity","float"),t.fragment.uniforms.add("view","mat4"),e.hasColorTexture&&t.fragment.uniforms.add("tex","sampler2D"),t.include(A.jV,e),t.include(b.T,e),t.fragment.include(O.y),R.add(y.H`
      void main() {
        discardBySlice(vpos);
        ${e.multipassTerrainEnabled?y.H`terrainDepthTest(gl_FragCoord, depth);`:""}
        ${e.hasColorTexture?y.H`
        vec4 texColor = texture2D(tex, vuv0);
        ${e.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
        discardOrAdjustAlpha(texColor);`:y.H`vec4 texColor = vec4(1.0);`}
        vec3 viewDirection = normalize(vpos - cameraPosition);
        ${e.pbrMode===A.f7.Normal?"applyPBRFactors();":""}
        float ssao = evaluateAmbientOcclusionInverse();
        ssao *= getBakedOcclusion();

        float additionalAmbientScale = additionalDirectedAmbientLight(vpos + localOrigin);
        vec3 additionalLight = ssao * lightingMainIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
        ${e.receiveShadows?"float shadow = readShadowMap(vpos, linearDepth);":e.viewingMode===i.JY.Global?"float shadow = lightingGlobalFactor * (1.0 - additionalAmbientScale);":"float shadow = 0.0;"}
        vec3 matColor = max(ambient, diffuse);
        ${e.attributeColor?y.H`
        vec3 albedo_ = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
        float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:y.H`
        vec3 albedo_ = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
        float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));
        `}
        ${y.H`
        vec3 shadedNormal = normalize(vNormalWorld);
        albedo_ *= 1.2;
        vec3 viewForward = vec3(view[0][2], view[1][2], view[2][2]);
        float alignmentLightView = clamp(dot(viewForward, -lightingMainDirection), 0.0, 1.0);
        float transmittance = 1.0 - clamp(dot(viewForward, shadedNormal), 0.0, 1.0);
        float treeRadialFalloff = vColor.r;
        float backLightFactor = 0.5 * treeRadialFalloff * alignmentLightView * transmittance * (1.0 - shadow);
        additionalLight += backLightFactor * lightingMainIntensity;`}
        ${e.pbrMode===A.f7.Normal||e.pbrMode===A.f7.Schematic?e.viewingMode===i.JY.Global?y.H`vec3 normalGround = normalize(vpos + localOrigin);`:y.H`vec3 normalGround = vec3(0.0, 0.0, 1.0);`:y.H``}
        ${e.pbrMode===A.f7.Normal||e.pbrMode===A.f7.Schematic?y.H`
            float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * lightingMainIntensity[2];
            vec3 shadedColor = evaluateSceneLightingPBR(shadedNormal, albedo_, shadow, 1.0 - ssao, additionalLight, viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:"vec3 shadedColor = evaluateSceneLighting(shadedNormal, albedo_, shadow, 1.0 - ssao, additionalLight);"}
        gl_FragColor = highlightSlice(vec4(shadedColor, opacity_), vpos);
        ${e.oitEnabled?"gl_FragColor = premultiplyAlpha(gl_FragColor);":""}
      }
    `)),t.include(v.s,e),t}const P=Object.freeze({__proto__:null,build:R})},11873:(e,t,r)=>{function i(){return[1,0,0,0,1,0,0,0,1]}function o(e,t){return new Float64Array(e,t,9)}r.d(t,{a:()=>o,c:()=>i});Object.freeze({__proto__:null,create:i,clone:function(e){return[e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8]]},fromValues:function(e,t,r,i,o,n,a,s,l){return[e,t,r,i,o,n,a,s,l]},createView:o})},81949:(e,t,r)=>{function i(){return[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}function o(e){return[e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8],e[9],e[10],e[11],e[12],e[13],e[14],e[15]]}function n(e,t){return new Float64Array(e,t,16)}r.d(t,{I:()=>a,a:()=>n,b:()=>o,c:()=>i});const a=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];Object.freeze({__proto__:null,create:i,clone:o,fromValues:function(e,t,r,i,o,n,a,s,l,c,d,u,h,m,f,p){return[e,t,r,i,o,n,a,s,l,c,d,u,h,m,f,p]},createView:n,IDENTITY:a})},48976:(e,t,r)=>{r.d(t,{c:()=>m,g:()=>d,j:()=>E,k:()=>p,m:()=>u,s:()=>c});var i=r(11873),o=r(98131),n=r(71353),a=r(26277),s=r(11186),l=r(90045);function c(e,t,r){r*=.5;const i=Math.sin(r);return e[0]=i*t[0],e[1]=i*t[1],e[2]=i*t[2],e[3]=Math.cos(r),e}function d(e,t){const r=2*Math.acos(t[3]),i=Math.sin(r/2);return i>a.E?(e[0]=t[0]/i,e[1]=t[1]/i,e[2]=t[2]/i):(e[0]=1,e[1]=0,e[2]=0),r}function u(e,t,r){const i=t[0],o=t[1],n=t[2],a=t[3],s=r[0],l=r[1],c=r[2],d=r[3];return e[0]=i*d+a*s+o*c-n*l,e[1]=o*d+a*l+n*s-i*c,e[2]=n*d+a*c+i*l-o*s,e[3]=a*d-i*s-o*l-n*c,e}function h(e,t,r,i){const o=t[0],n=t[1],s=t[2],l=t[3];let c,d,u,h,m,f=r[0],p=r[1],v=r[2],g=r[3];return d=o*f+n*p+s*v+l*g,d<0&&(d=-d,f=-f,p=-p,v=-v,g=-g),1-d>a.E?(c=Math.acos(d),u=Math.sin(c),h=Math.sin((1-i)*c)/u,m=Math.sin(i*c)/u):(h=1-i,m=i),e[0]=h*o+m*f,e[1]=h*n+m*p,e[2]=h*s+m*v,e[3]=h*l+m*g,e}function m(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e[3]=t[3],e}function f(e,t){const r=t[0]+t[4]+t[8];let i;if(r>0)i=Math.sqrt(r+1),e[3]=.5*i,i=.5/i,e[0]=(t[5]-t[7])*i,e[1]=(t[6]-t[2])*i,e[2]=(t[1]-t[3])*i;else{let r=0;t[4]>t[0]&&(r=1),t[8]>t[3*r+r]&&(r=2);const o=(r+1)%3,n=(r+2)%3;i=Math.sqrt(t[3*r+r]-t[3*o+o]-t[3*n+n]+1),e[r]=.5*i,i=.5/i,e[3]=(t[3*o+n]-t[3*n+o])*i,e[o]=(t[3*o+r]+t[3*r+o])*i,e[n]=(t[3*n+r]+t[3*r+n])*i}return e}function p(e,t,r,i){const o=.5*Math.PI/180;t*=o,r*=o,i*=o;const n=Math.sin(t),a=Math.cos(t),s=Math.sin(r),l=Math.cos(r),c=Math.sin(i),d=Math.cos(i);return e[0]=n*l*d-a*s*c,e[1]=a*s*d+n*l*c,e[2]=a*l*c-n*s*d,e[3]=a*l*d+n*s*c,e}const v=l.c,g=l.s,x=l.a,T=u,_=l.b,b=l.d,A=l.l,S=l.e,C=S,M=l.f,O=M,y=l.n,E=l.g,w=l.h;const R=(0,n.c)(),P=(0,n.f)(1,0,0),I=(0,n.f)(0,1,0);const N=(0,o.a)(),L=(0,o.a)();const D=(0,i.c)();Object.freeze({__proto__:null,identity:function(e){return e[0]=0,e[1]=0,e[2]=0,e[3]=1,e},setAxisAngle:c,getAxisAngle:d,multiply:u,rotateX:function(e,t,r){r*=.5;const i=t[0],o=t[1],n=t[2],a=t[3],s=Math.sin(r),l=Math.cos(r);return e[0]=i*l+a*s,e[1]=o*l+n*s,e[2]=n*l-o*s,e[3]=a*l-i*s,e},rotateY:function(e,t,r){r*=.5;const i=t[0],o=t[1],n=t[2],a=t[3],s=Math.sin(r),l=Math.cos(r);return e[0]=i*l-n*s,e[1]=o*l+a*s,e[2]=n*l+i*s,e[3]=a*l-o*s,e},rotateZ:function(e,t,r){r*=.5;const i=t[0],o=t[1],n=t[2],a=t[3],s=Math.sin(r),l=Math.cos(r);return e[0]=i*l+o*s,e[1]=o*l-i*s,e[2]=n*l+a*s,e[3]=a*l-n*s,e},calculateW:function(e,t){const r=t[0],i=t[1],o=t[2];return e[0]=r,e[1]=i,e[2]=o,e[3]=Math.sqrt(Math.abs(1-r*r-i*i-o*o)),e},slerp:h,random:function(e){const t=(0,a.R)(),r=(0,a.R)(),i=(0,a.R)(),o=Math.sqrt(1-t),n=Math.sqrt(t);return e[0]=o*Math.sin(2*Math.PI*r),e[1]=o*Math.cos(2*Math.PI*r),e[2]=n*Math.sin(2*Math.PI*i),e[3]=n*Math.cos(2*Math.PI*i),e},invert:function(e,t){const r=t[0],i=t[1],o=t[2],n=t[3],a=r*r+i*i+o*o+n*n,s=a?1/a:0;return e[0]=-r*s,e[1]=-i*s,e[2]=-o*s,e[3]=n*s,e},conjugate:m,fromMat3:f,fromEuler:p,str:function(e){return"quat("+e[0]+", "+e[1]+", "+e[2]+", "+e[3]+")"},copy:v,set:g,add:x,mul:T,scale:_,dot:b,lerp:A,length:S,len:C,squaredLength:M,sqrLen:O,normalize:y,exactEquals:E,equals:w,rotationTo:function(e,t,r){const i=(0,s.d)(t,r);return i<-.999999?((0,s.c)(R,P,t),(0,s.u)(R)<1e-6&&(0,s.c)(R,I,t),(0,s.n)(R,R),c(e,R,Math.PI),e):i>.999999?(e[0]=0,e[1]=0,e[2]=0,e[3]=1,e):((0,s.c)(R,t,r),e[0]=R[0],e[1]=R[1],e[2]=R[2],e[3]=1+i,y(e,e))},sqlerp:function(e,t,r,i,o,n){return h(N,t,o,n),h(L,r,i,n),h(e,N,L,2*n*(1-n)),e},setAxes:function(e,t,r,i){const o=D;return o[0]=r[0],o[3]=r[1],o[6]=r[2],o[1]=i[0],o[4]=i[1],o[7]=i[2],o[2]=-t[0],o[5]=-t[1],o[8]=-t[2],y(e,f(e,o))}})},98131:(e,t,r)=>{function i(){return[0,0,0,1]}function o(e){return[e[0],e[1],e[2],e[3]]}function n(e,t){return new Float64Array(e,t,4)}r.d(t,{I:()=>a,a:()=>i,b:()=>o,c:()=>n});const a=[0,0,0,1];Object.freeze({__proto__:null,create:i,clone:o,fromValues:function(e,t,r,i){return[e,t,r,i]},createView:n,IDENTITY:a})},32035:(e,t,r)=>{r.d(t,{a:()=>n,b:()=>l,n:()=>s,s:()=>a,t:()=>o});var i=r(77873);function o(e,t,r){if(e.count!==t.count)return void i.c.error("source and destination buffers need to have the same number of elements");const o=e.count,n=r[0],a=r[1],s=r[2],l=r[4],c=r[5],d=r[6],u=r[8],h=r[9],m=r[10],f=r[12],p=r[13],v=r[14],g=e.typedBuffer,x=e.typedBufferStride,T=t.typedBuffer,_=t.typedBufferStride;for(let i=0;i<o;i++){const e=i*x,t=i*_,r=T[t],o=T[t+1],b=T[t+2];g[e]=n*r+l*o+u*b+f,g[e+1]=a*r+c*o+h*b+p,g[e+2]=s*r+d*o+m*b+v}}function n(e,t,r){if(e.count!==t.count)return void i.c.error("source and destination buffers need to have the same number of elements");const o=e.count,n=r[0],a=r[1],s=r[2],l=r[3],c=r[4],d=r[5],u=r[6],h=r[7],m=r[8],f=e.typedBuffer,p=e.typedBufferStride,v=t.typedBuffer,g=t.typedBufferStride;for(let i=0;i<o;i++){const e=i*p,t=i*g,r=v[t],o=v[t+1],x=v[t+2];f[e]=n*r+l*o+u*x,f[e+1]=a*r+c*o+h*x,f[e+2]=s*r+d*o+m*x}}function a(e,t,r){const i=Math.min(e.count,t.count),o=e.typedBuffer,n=e.typedBufferStride,a=t.typedBuffer,s=t.typedBufferStride;for(let l=0;l<i;l++){const e=l*n,t=l*s;o[e]=r*a[t],o[e+1]=r*a[t+1],o[e+2]=r*a[t+2]}}function s(e,t){const r=Math.min(e.count,t.count),i=e.typedBuffer,o=e.typedBufferStride,n=t.typedBuffer,a=t.typedBufferStride;for(let s=0;s<r;s++){const e=s*o,t=s*a,r=n[t],l=n[t+1],c=n[t+2],d=Math.sqrt(r*r+l*l+c*c);if(d>0){const t=1/d;i[e]=t*r,i[e+1]=t*l,i[e+2]=t*c}}}function l(e,t,r){const i=Math.min(e.count,t.count),o=e.typedBuffer,n=e.typedBufferStride,a=t.typedBuffer,s=t.typedBufferStride;for(let l=0;l<i;l++){const e=l*n,t=l*s;o[e]=a[t]>>r,o[e+1]=a[t+1]>>r,o[e+2]=a[t+2]>>r}}Object.freeze({__proto__:null,transformMat4:o,transformMat3:n,scale:a,normalize:s,shiftRight:l})},92770:(e,t,r)=>{function i(e,t,r){const i=e.typedBuffer,o=e.typedBufferStride,n=t.typedBuffer,a=t.typedBufferStride,s=r?r.count:t.count;let l=(r&&r.dstIndex?r.dstIndex:0)*o,c=(r&&r.srcIndex?r.srcIndex:0)*a;for(let d=0;d<s;++d)i[l]=n[c],i[l+1]=n[c+1],i[l+2]=n[c+2],l+=o,c+=a}function o(e,t,r,i,o){var n,a;const s=e.typedBuffer,l=e.typedBufferStride,c=null!=(n=null==o?void 0:o.count)?n:e.count;let d=(null!=(a=null==o?void 0:o.dstIndex)?a:0)*l;for(let u=0;u<c;++u)s[d]=t,s[d+1]=r,s[d+2]=i,d+=l}r.d(t,{c:()=>i,f:()=>o});Object.freeze({__proto__:null,copy:i,fill:o})},8229:(e,t,r)=>{function i(){return new Float32Array(3)}function o(e,t,r){const i=new Float32Array(3);return i[0]=e,i[1]=t,i[2]=r,i}function n(){return i()}function a(){return o(1,1,1)}function s(){return o(1,0,0)}function l(){return o(0,1,0)}function c(){return o(0,0,1)}r.d(t,{c:()=>i,f:()=>o});const d=n(),u=a(),h=s(),m=l(),f=c();Object.freeze({__proto__:null,create:i,clone:function(e){const t=new Float32Array(3);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t},fromValues:o,createView:function(e,t){return new Float32Array(e,t,3)},zeros:n,ones:a,unitX:s,unitY:l,unitZ:c,ZEROS:d,ONES:u,UNIT_X:h,UNIT_Y:m,UNIT_Z:f})},71277:(e,t,r)=>{function i(e){return e=e||globalThis.location.hostname,c.some((t=>{var r;return null!=(null==(r=e)?void 0:r.match(t))}))}function o(e,t){return e&&(t=t||globalThis.location.hostname)?null!=t.match(n)||null!=t.match(s)?e.replace("static.arcgis.com","staticdev.arcgis.com"):null!=t.match(a)||null!=t.match(l)?e.replace("static.arcgis.com","staticqa.arcgis.com"):e:e}r.d(t,{XO:()=>i,pJ:()=>o});const n=/^devext.arcgis.com$/,a=/^qaext.arcgis.com$/,s=/^[\w-]*\.mapsdevext.arcgis.com$/,l=/^[\w-]*\.mapsqa.arcgis.com$/,c=[/^([\w-]*\.)?[\w-]*\.zrh-dev-local.esri.com$/,n,a,/^jsapps.esri.com$/,s,l]},77873:(e,t,r)=>{r.d(t,{c:()=>i});const i=r(32718).Z.getLogger("esri.views.3d.support.buffer.math")},38330:(e,t,r)=>{r.d(t,{t:()=>o});var i=r(76200);async function o(e,t){const{data:r}=await(0,i.default)(e,{responseType:"image",...t});return r}},55500:(e,t,r)=>{r.r(t),r.d(t,{fetch:()=>dr,gltfToEngineResources:()=>hr,parseUrl:()=>ur});var i=r(71277),o=r(92026),n=r(22753),a=r(11873),s=r(14226),l=r(81949),c=r(11186),d=r(71353),u=r(41414),h=r(25158),m=r(32035),f=r(19093),p=r(17054),v=r(27053),g=r(55798),x=r(32315),T=r(76200),_=r(14921),b=r(10064),A=r(32718),S=r(66978),C=r(49901),M=r(38330),O=r(68401),y=r(27546),E=r(97731);class w{constructor(e,t,r,i){this.primitiveIndices=e,this._numIndexPerPrimitive=t,this.indices=r,this.position=i,this.center=(0,d.c)(),(0,E.hu)(e.length>=1),(0,E.hu)(r.length%this._numIndexPerPrimitive==0),(0,E.hu)(r.length>=e.length*this._numIndexPerPrimitive),(0,E.hu)(3===i.size||4===i.size);const{data:o,size:n}=i,a=e.length;let s=n*r[this._numIndexPerPrimitive*e[0]];R.clear(),R.push(s),this.bbMin=(0,d.f)(o[s],o[s+1],o[s+2]),this.bbMax=(0,d.a)(this.bbMin);for(let c=0;c<a;++c){const t=this._numIndexPerPrimitive*e[c];for(let e=0;e<this._numIndexPerPrimitive;++e){s=n*r[t+e],R.push(s);let i=o[s];this.bbMin[0]=Math.min(i,this.bbMin[0]),this.bbMax[0]=Math.max(i,this.bbMax[0]),i=o[s+1],this.bbMin[1]=Math.min(i,this.bbMin[1]),this.bbMax[1]=Math.max(i,this.bbMax[1]),i=o[s+2],this.bbMin[2]=Math.min(i,this.bbMin[2]),this.bbMax[2]=Math.max(i,this.bbMax[2])}}(0,c.e)(this.center,this.bbMin,this.bbMax,.5),this.radius=.5*Math.max(Math.max(this.bbMax[0]-this.bbMin[0],this.bbMax[1]-this.bbMin[1]),this.bbMax[2]-this.bbMin[2]);let l=this.radius*this.radius;for(let c=0;c<R.length;++c){s=R.getItemAt(c);const e=o[s]-this.center[0],t=o[s+1]-this.center[1],r=o[s+2]-this.center[2],i=e*e+t*t+r*r;if(i<=l)continue;const n=Math.sqrt(i),a=.5*(n-this.radius);this.radius=this.radius+a,l=this.radius*this.radius;const d=a/n;this.center[0]+=e*d,this.center[1]+=t*d,this.center[2]+=r*d}R.clear()}getCenter(){return this.center}getBSRadius(){return this.radius}getBBMin(){return this.bbMin}getBBMax(){return this.bbMax}getChildren(){if(this._children)return this._children;if((0,c.h)(this.bbMin,this.bbMax)>1){const e=(0,c.e)((0,d.c)(),this.bbMin,this.bbMax,.5),t=this.primitiveIndices.length,r=new Uint8Array(t),i=new Array(8);for(let l=0;l<8;++l)i[l]=0;const{data:o,size:n}=this.position;for(let l=0;l<t;++l){let t=0;const a=this._numIndexPerPrimitive*this.primitiveIndices[l];let s=n*this.indices[a],c=o[s],d=o[s+1],u=o[s+2];for(let e=1;e<this._numIndexPerPrimitive;++e){s=n*this.indices[a+e];const t=o[s],r=o[s+1],i=o[s+2];t<c&&(c=t),r<d&&(d=r),i<u&&(u=i)}c<e[0]&&(t|=1),d<e[1]&&(t|=2),u<e[2]&&(t|=4),r[l]=t,++i[t]}let a=0;for(let l=0;l<8;++l)i[l]>0&&++a;if(a<2)return;const s=new Array(8);for(let l=0;l<8;++l)s[l]=i[l]>0?new Uint32Array(i[l]):void 0;for(let l=0;l<8;++l)i[l]=0;for(let l=0;l<t;++l){const e=r[l];s[e][i[e]++]=this.primitiveIndices[l]}this._children=new Array(8);for(let l=0;l<8;++l)void 0!==s[l]&&(this._children[l]=new w(s[l],this._numIndexPerPrimitive,this.indices,this.position))}return this._children}static prune(){R.prune()}}const R=new y.Z({deallocator:null});var P,I=r(95439);class N{constructor(){this.id=(0,I.D)()}unload(){}}!function(e){e[e.Layer=0]="Layer",e[e.Object=1]="Object",e[e.Geometry=2]="Geometry",e[e.Material=3]="Material",e[e.Texture=4]="Texture",e[e.COUNT=5]="COUNT"}(P||(P={}));var L=r(46962),D=r(4760);class H extends N{constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:O.MX.Triangle,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:-1;super(),this._primitiveType=r,this.edgeIndicesLength=i,this.type=P.Geometry,this._vertexAttributes=new Map,this._indices=new Map,this._boundingInfo=null;for(const[o,n]of e)n&&this._vertexAttributes.set(o,{...n});if(null==t||0===t.length){const e=function(e){const t=e.values().next().value;return null==t?0:t.data.length/t.size}(this._vertexAttributes),t=(0,L.p)(e);this.edgeIndicesLength=this.edgeIndicesLength<0?e:this.edgeIndicesLength;for(const r of this._vertexAttributes.keys())this._indices.set(r,t)}else for(const[o,n]of t)n&&(this._indices.set(o,F(n)),o===D.T.POSITION&&(this.edgeIndicesLength=this.edgeIndicesLength<0?this._indices.get(o).length:this.edgeIndicesLength))}cloneShallow(){const e=new H([],void 0,this._primitiveType,void 0),{_vertexAttributes:t,_indices:r}=e;return this._vertexAttributes.forEach(((e,r)=>{t.set(r,e)})),this._indices.forEach(((e,t)=>{r.set(t,e)})),e.screenToWorldRatio=this.screenToWorldRatio,e._boundingInfo=this._boundingInfo,e}get vertexAttributes(){return this._vertexAttributes}getMutableAttribute(e){const t=this._vertexAttributes.get(e);return t&&!t.exclusive&&(t.data=Array.from(t.data),t.exclusive=!0),t}get indices(){return this._indices}get indexCount(){const e=this._indices.values().next().value;return e?e.length:0}get primitiveType(){return this._primitiveType}get faceCount(){return this.indexCount/3}get boundingInfo(){return(0,o.Wi)(this._boundingInfo)&&(this._boundingInfo=this._calculateBoundingInfo()),this._boundingInfo}computeAttachmentOrigin(e){return this.primitiveType===O.MX.Triangle?this._computeAttachmentOriginTriangles(e):this._computeAttachmentOriginPoints(e)}_computeAttachmentOriginTriangles(e){const t=this.indices.get(D.T.POSITION),r=this.vertexAttributes.get(D.T.POSITION);return(0,L.cM)(r,t,e)}_computeAttachmentOriginPoints(e){const t=this.indices.get(D.T.POSITION),r=this.vertexAttributes.get(D.T.POSITION);return(0,L.NO)(r,t,e)}invalidateBoundingInfo(){this._boundingInfo=null}_calculateBoundingInfo(){const e=this.indices.get(D.T.POSITION);if(0===e.length)return null;const t=this.primitiveType===O.MX.Triangle?3:1;(0,E.hu)(e.length%t==0,"Indexing error: "+e.length+" not divisible by "+t);const r=(0,L.p)(e.length/t),i=this.vertexAttributes.get(D.T.POSITION);return new w(r,t,e,i)}}function F(e){if(e.BYTES_PER_ELEMENT===Uint16Array.BYTES_PER_ELEMENT)return e;for(const t of e)if(t>=65536)return e;return new Uint16Array(e)}var B=r(41644),z=r(91505),U=r(16889),G=r(18722),V=r(35995),W=r(5640),q=r(65905);let k;var $;!function(e){e[e.ETC1_RGB=0]="ETC1_RGB",e[e.ETC2_RGBA=1]="ETC2_RGBA",e[e.BC1_RGB=2]="BC1_RGB",e[e.BC3_RGBA=3]="BC3_RGBA",e[e.BC4_R=4]="BC4_R",e[e.BC5_RG=5]="BC5_RG",e[e.BC7_M6_RGB=6]="BC7_M6_RGB",e[e.BC7_M5_RGBA=7]="BC7_M5_RGBA",e[e.PVRTC1_4_RGB=8]="PVRTC1_4_RGB",e[e.PVRTC1_4_RGBA=9]="PVRTC1_4_RGBA",e[e.ASTC_4x4_RGBA=10]="ASTC_4x4_RGBA",e[e.ATC_RGB=11]="ATC_RGB",e[e.ATC_RGBA=12]="ATC_RGBA",e[e.FXT1_RGB=17]="FXT1_RGB",e[e.PVRTC2_4_RGB=18]="PVRTC2_4_RGB",e[e.PVRTC2_4_RGBA=19]="PVRTC2_4_RGBA",e[e.ETC2_EAC_R11=20]="ETC2_EAC_R11",e[e.ETC2_EAC_RG11=21]="ETC2_EAC_RG11",e[e.RGBA32=13]="RGBA32",e[e.RGB565=14]="RGB565",e[e.BGR565=15]="BGR565",e[e.RGBA4444=16]="RGBA4444"}($||($={}));var j=r(8548),X=r(51378),J=r(3384);let K=null,Y=null;async function Z(){return(0,o.Wi)(Y)&&(Y=function(){if((0,o.Wi)(k)){const e=e=>(0,q.V)(`esri/libs/basisu/${e}`);k=r.e(1562).then(r.bind(r,61562)).then((e=>e.b)).then((t=>{let{default:r}=t;return r({locateFile:e}).then((e=>(e.initializeBasis(),delete e.then,e)))}))}return k}(),K=await Y),Y}function Q(e,t,r,i,o){const n=(0,J.RG)(t?j.q_.COMPRESSED_RGBA8_ETC2_EAC:j.q_.COMPRESSED_RGB8_ETC2),a=o&&e>1?(4**e-1)/(3*4**(e-1)):1;return Math.ceil(r*i*n*a)}function ee(e){return e.getNumImages()>=1&&!e.isUASTC()}function te(e){return e.getFaces()>=1&&e.isETC1S()}function re(e,t,r,i,o,n,a,s){const{compressedTextureETC:l,compressedTextureS3TC:c}=e.capabilities,[d,u]=l?i?[$.ETC2_RGBA,j.q_.COMPRESSED_RGBA8_ETC2_EAC]:[$.ETC1_RGB,j.q_.COMPRESSED_RGB8_ETC2]:c?i?[$.BC3_RGBA,j.q_.COMPRESSED_RGBA_S3TC_DXT5_EXT]:[$.BC1_RGB,j.q_.COMPRESSED_RGB_S3TC_DXT1_EXT]:[$.RGBA32,j.VI.RGBA],h=t.hasMipmap?r:Math.min(1,r),m=[];for(let g=0;g<h;g++)m.push(new Uint8Array(a(g,d))),s(g,d,m[g]);const f=m.length>1,p=f?j.cw.LINEAR_MIPMAP_LINEAR:j.cw.LINEAR,v={...t,samplingMode:p,hasMipmap:f,internalFormat:u,width:o,height:n};return new X.x(e,v,{type:"compressed",levels:m})}const ie=A.Z.getLogger("esri.views.3d.webgl-engine.lib.DDSUtil"),oe=542327876,ne=131072;function ae(e){return e.charCodeAt(0)+(e.charCodeAt(1)<<8)+(e.charCodeAt(2)<<16)+(e.charCodeAt(3)<<24)}const se=ae("DXT1"),le=ae("DXT3"),ce=ae("DXT5");function de(e,t,r){const{textureData:i,internalFormat:o,width:n,height:a}=function(e,t){const r=new Int32Array(e,0,31);if(r[0]!==oe)return ie.error("Invalid magic number in DDS header"),null;if(!(4&r[20]))return ie.error("Unsupported format, must contain a FourCC code"),null;const i=r[21];let o,n;switch(i){case se:o=8,n=j.q_.COMPRESSED_RGB_S3TC_DXT1_EXT;break;case le:o=16,n=j.q_.COMPRESSED_RGBA_S3TC_DXT3_EXT;break;case ce:o=16,n=j.q_.COMPRESSED_RGBA_S3TC_DXT5_EXT;break;default:return ie.error("Unsupported FourCC code:",function(e){return String.fromCharCode(255&e,e>>8&255,e>>16&255,e>>24&255)}(i)),null}let a=1,s=r[4],l=r[3];0==(3&s)&&0==(3&l)||(ie.warn("Rounding up compressed texture size to nearest multiple of 4."),s=s+3&-4,l=l+3&-4);const c=s,d=l;let u,h;r[2]&ne&&!1!==t&&(a=Math.max(1,r[7])),1===a||(0,U.wt)(s)&&(0,U.wt)(l)||(ie.warn("Ignoring mipmaps of non power of two sized compressed texture."),a=1);let m=r[1]+4;const f=[];for(let p=0;p<a;++p)h=(s+3>>2)*(l+3>>2)*o,u=new Uint8Array(e,m,h),f.push(u),m+=h,s=Math.max(1,s>>1),l=Math.max(1,l>>1);return{textureData:{type:"compressed",levels:f},internalFormat:n,width:c,height:d}}(r,t.hasMipmap);return t.samplingMode=i.levels.length>1?j.cw.LINEAR_MIPMAP_LINEAR:j.cw.LINEAR,t.hasMipmap=i.levels.length>1,t.internalFormat=o,t.width=n,t.height=a,new X.x(e,t,i)}const ue=new Map([[D.T.POSITION,0],[D.T.NORMAL,1],[D.T.UV0,2],[D.T.COLOR,3],[D.T.SIZE,4],[D.T.TANGENT,4],[D.T.AUXPOS1,5],[D.T.SYMBOLCOLOR,5],[D.T.AUXPOS2,6],[D.T.FEATUREATTRIBUTE,6],[D.T.INSTANCEFEATUREATTRIBUTE,6],[D.T.INSTANCECOLOR,7],[D.T.MODEL,8],[D.T.MODELNORMAL,12],[D.T.MODELORIGINHI,11],[D.T.MODELORIGINLO,15]]);var he=r(61109);new he.G(D.T.POSITION,3,j.g.FLOAT,0,12),new he.G(D.T.POSITION,3,j.g.FLOAT,0,20),new he.G(D.T.UV0,2,j.g.FLOAT,12,20),new he.G(D.T.POSITION,3,j.g.FLOAT,0,32),new he.G(D.T.NORMAL,3,j.g.FLOAT,12,32),new he.G(D.T.UV0,2,j.g.FLOAT,24,32),new he.G(D.T.POSITION,3,j.g.FLOAT,0,16),new he.G(D.T.COLOR,4,j.g.UNSIGNED_BYTE,12,16);const me=[new he.G(D.T.POSITION,2,j.g.FLOAT,0,8)],fe=[new he.G(D.T.POSITION,2,j.g.FLOAT,0,16),new he.G(D.T.UV0,2,j.g.FLOAT,8,16)];var pe=r(44070),ve=r(45412);var ge,xe=r(53634),Te=r(30308);class _e extends N{constructor(e,t){super(),this.data=e,this.type=P.Texture,this._glTexture=null,this._powerOfTwoStretchInfo=null,this._loadingPromise=null,this._loadingController=null,this.events=new z.Z,this.params=t||{},this.params.mipmap=!1!==this.params.mipmap,this.params.noUnpackFlip=this.params.noUnpackFlip||!1,this.params.preMultiplyAlpha=this.params.preMultiplyAlpha||!1,this.params.wrap=this.params.wrap||{s:j.e8.REPEAT,t:j.e8.REPEAT},this.params.powerOfTwoResizeMode=this.params.powerOfTwoResizeMode||O.CE.STRETCH,this.estimatedTexMemRequired=_e._estimateTexMemRequired(this.data,this.params),this._startPreload()}_startPreload(){const e=this.data;(0,o.Wi)(e)||(e instanceof HTMLVideoElement?this._startPreloadVideoElement(e):e instanceof HTMLImageElement&&this._startPreloadImageElement(e))}_startPreloadVideoElement(e){(0,V.jc)(e.src)||"auto"===e.preload&&e.crossOrigin||(e.preload="auto",e.crossOrigin="anonymous",e.src=e.src)}_startPreloadImageElement(e){(0,V.HK)(e.src)||(0,V.jc)(e.src)||e.crossOrigin||(e.crossOrigin="anonymous",e.src=e.src)}static _getDataDimensions(e){return e instanceof HTMLVideoElement?{width:e.videoWidth,height:e.videoHeight}:e}static _estimateTexMemRequired(e,t){if((0,o.Wi)(e))return 0;if((0,G.eP)(e)||(0,G.lq)(e))return t.encoding===_e.KTX2_ENCODING?function(e,t){if((0,o.Wi)(K))return e.byteLength;const r=new K.KTX2File(new Uint8Array(e)),i=te(r)?Q(r.getLevels(),r.getHasAlpha(),r.getWidth(),r.getHeight(),t):0;return r.close(),r.delete(),i}(e,t.mipmap):t.encoding===_e.BASIS_ENCODING?function(e,t){if((0,o.Wi)(K))return e.byteLength;const r=new K.BasisFile(new Uint8Array(e)),i=ee(r)?Q(r.getNumLevels(0),r.getHasAlpha(),r.getImageWidth(0,0),r.getImageHeight(0,0),t):0;return r.close(),r.delete(),i}(e,t.mipmap):e.byteLength;const{width:r,height:i}=e instanceof Image||e instanceof ImageData||e instanceof HTMLCanvasElement||e instanceof HTMLVideoElement?_e._getDataDimensions(e):t;return(t.mipmap?4/3:1)*r*i*(t.components||4)||0}dispose(){this.data=void 0}get width(){return this.params.width}get height(){return this.params.height}_createDescriptor(e){var t;return{target:j.No.TEXTURE_2D,pixelFormat:j.VI.RGBA,dataType:j.Br.UNSIGNED_BYTE,wrapMode:this.params.wrap,flipped:!this.params.noUnpackFlip,samplingMode:this.params.mipmap?j.cw.LINEAR_MIPMAP_LINEAR:j.cw.LINEAR,hasMipmap:this.params.mipmap,preMultiplyAlpha:this.params.preMultiplyAlpha,maxAnisotropy:null!=(t=this.params.maxAnisotropy)?t:this.params.mipmap?e.parameters.maxMaxAnisotropy:1}}get glTexture(){return this._glTexture}load(e,t){if((0,o.pC)(this._glTexture))return this._glTexture;if((0,o.pC)(this._loadingPromise))return this._loadingPromise;const r=this.data;return(0,o.Wi)(r)?(this._glTexture=new X.x(e,this._createDescriptor(e),null),this._glTexture):"string"==typeof r?this._loadFromURL(e,t,r):r instanceof Image?this._loadFromImageElement(e,t,r):r instanceof HTMLVideoElement?this._loadFromVideoElement(e,t,r):r instanceof ImageData||r instanceof HTMLCanvasElement?this._loadFromImage(e,r,t):((0,G.eP)(r)||(0,G.lq)(r))&&this.params.encoding===_e.DDS_ENCODING?(this.data=void 0,this._loadFromDDSData(e,r)):((0,G.eP)(r)||(0,G.lq)(r))&&this.params.encoding===_e.KTX2_ENCODING?(this.data=void 0,this._loadFromKTX2(e,r)):((0,G.eP)(r)||(0,G.lq)(r))&&this.params.encoding===_e.BASIS_ENCODING?(this.data=void 0,this._loadFromBasis(e,r)):(0,G.lq)(r)?this._loadFromPixelData(e,r):(0,G.eP)(r)?this._loadFromPixelData(e,new Uint8Array(r)):null}get requiresFrameUpdates(){return this.data instanceof HTMLVideoElement}frameUpdate(e,t,r){if(!(this.data instanceof HTMLVideoElement)||(0,o.Wi)(this._glTexture))return r;if(this.data.readyState<ge.HAVE_CURRENT_DATA||r===this.data.currentTime)return r;if((0,o.pC)(this._powerOfTwoStretchInfo)){const{framebuffer:r,vao:i,sourceTexture:o}=this._powerOfTwoStretchInfo;o.setData(this.data),this._drawStretchedTexture(e,t,r,i,o,this._glTexture)}else{const{width:e,height:t}=this.data,{width:r,height:i}=this._glTexture.descriptor;e!==r||t!==i?this._glTexture.updateData(0,0,0,Math.min(e,r),Math.min(t,i),this.data):this._glTexture.setData(this.data)}return this._glTexture.descriptor.hasMipmap&&this._glTexture.generateMipmap(),this.data.currentTime}_loadFromDDSData(e,t){return this._glTexture=de(e,this._createDescriptor(e),t),this._glTexture}_loadFromKTX2(e,t){return this._loadAsync((()=>async function(e,t,r){(0,o.Wi)(K)&&(K=await Z());const i=new K.KTX2File(new Uint8Array(r));if(!te(i))return null;i.startTranscoding();const n=re(e,t,i.getLevels(),i.getHasAlpha(),i.getWidth(),i.getHeight(),((e,t)=>i.getImageTranscodedSizeInBytes(e,0,0,t)),((e,t,r)=>i.transcodeImage(r,e,0,0,t,0,-1,-1)));return i.close(),i.delete(),n}(e,this._createDescriptor(e),t).then((e=>(this._glTexture=e,e)))))}_loadFromBasis(e,t){return this._loadAsync((()=>async function(e,t,r){(0,o.Wi)(K)&&(K=await Z());const i=new K.BasisFile(new Uint8Array(r));if(!ee(i))return null;i.startTranscoding();const n=re(e,t,i.getNumLevels(0),i.getHasAlpha(),i.getImageWidth(0,0),i.getImageHeight(0,0),((e,t)=>i.getImageTranscodedSizeInBytes(0,e,t)),((e,t,r)=>i.transcodeImage(r,0,e,t,0,0)));return i.close(),i.delete(),n}(e,this._createDescriptor(e),t).then((e=>(this._glTexture=e,e)))))}_loadFromPixelData(e,t){(0,E.hu)(this.params.width>0&&this.params.height>0);const r=this._createDescriptor(e);return r.pixelFormat=1===this.params.components?j.VI.LUMINANCE:3===this.params.components?j.VI.RGB:j.VI.RGBA,r.width=this.params.width,r.height=this.params.height,this._glTexture=new X.x(e,r,t),this._glTexture}_loadFromURL(e,t,r){return this._loadAsync((async i=>{const o=await(0,M.t)(r,{signal:i});return(0,S.k_)(i),this._loadFromImage(e,o,t)}))}_loadFromImageElement(e,t,r){return r.complete?this._loadFromImage(e,r,t):this._loadAsync((async i=>{const o=await(0,W.f)(r,r.src,!1,i);return(0,S.k_)(i),this._loadFromImage(e,o,t)}))}_loadFromVideoElement(e,t,r){return r.readyState>=ge.HAVE_CURRENT_DATA?this._loadFromImage(e,r,t):this._loadFromVideoElementAsync(e,t,r)}_loadFromVideoElementAsync(e,t,r){return this._loadAsync((i=>new Promise(((n,a)=>{const s=()=>{r.removeEventListener("loadeddata",l),r.removeEventListener("error",c),(0,o.hw)(d)},l=()=>{r.readyState>=ge.HAVE_CURRENT_DATA&&(s(),n(this._loadFromImage(e,r,t)))},c=e=>{s(),a(e||new b.Z("Failed to load video"))};r.addEventListener("loadeddata",l),r.addEventListener("error",c);const d=(0,S.fu)(i,(()=>c((0,S.zE)())))}))))}_loadFromImage(e,t,r){const i=_e._getDataDimensions(t);this.params.width=i.width,this.params.height=i.height;const o=this._createDescriptor(e);return o.pixelFormat=3===this.params.components?j.VI.RGB:j.VI.RGBA,!this._requiresPowerOfTwo(e,o)||(0,U.wt)(i.width)&&(0,U.wt)(i.height)?(o.width=i.width,o.height=i.height,this._glTexture=new X.x(e,o,t),this._glTexture):(this._glTexture=this._makePowerOfTwoTexture(e,t,i,o,r),this._glTexture)}_loadAsync(e){const t=new AbortController;this._loadingController=t;const r=e(t.signal);this._loadingPromise=r;const i=()=>{this._loadingController===t&&(this._loadingController=null),this._loadingPromise===r&&(this._loadingPromise=null)};return r.then(i,i),r}_requiresPowerOfTwo(e,t){const r=j.e8.CLAMP_TO_EDGE,i="number"==typeof t.wrapMode?t.wrapMode===r:t.wrapMode.s===r&&t.wrapMode.t===r;return!(0,Te.Z)(e.gl)&&(t.hasMipmap||!i)}_makePowerOfTwoTexture(e,t,r,i,o){const{width:n,height:a}=r,s=(0,U.Sf)(n),l=(0,U.Sf)(a);let c;switch(i.width=s,i.height=l,this.params.powerOfTwoResizeMode){case O.CE.PAD:i.textureCoordinateScaleFactor=[n/s,a/l],c=new X.x(e,i),c.updateData(0,0,0,n,a,t);break;case O.CE.STRETCH:case null:case void 0:c=this._stretchToPowerOfTwo(e,t,i,o());break;default:(0,B.Bg)(this.params.powerOfTwoResizeMode)}return i.hasMipmap&&c.generateMipmap(),c}_stretchToPowerOfTwo(e,t,r,i){const o=new X.x(e,r),n=new xe.X(e,{colorTarget:j.Lm.TEXTURE,depthStencilTarget:j.OU.NONE},o),a=new X.x(e,{target:j.No.TEXTURE_2D,pixelFormat:r.pixelFormat,dataType:j.Br.UNSIGNED_BYTE,wrapMode:j.e8.CLAMP_TO_EDGE,samplingMode:j.cw.LINEAR,flipped:!!r.flipped,maxAnisotropy:8,preMultiplyAlpha:r.preMultiplyAlpha},t),s=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:me,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:ue,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:-1,o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,n=null;return n=t===fe?new Float32Array([i,i,0,0,o,i,1,0,i,o,0,1,o,o,1,1]):new Float32Array([i,i,o,i,i,o,o,o]),new ve.U(e,r,{geometry:t},{geometry:pe.f.createVertex(e,j.l1.STATIC_DRAW,n)})}(e),l=e.getBoundFramebufferObject();return this._drawStretchedTexture(e,i,n,s,a,o),this.requiresFrameUpdates?this._powerOfTwoStretchInfo={vao:s,sourceTexture:a,framebuffer:n}:(s.dispose(!0),a.dispose(),n.detachColorTexture(),n.dispose()),e.bindFramebuffer(l),o}_drawStretchedTexture(e,t,r,i,o,n){e.bindFramebuffer(r);const a=e.getViewport();e.setViewport(0,0,n.descriptor.width,n.descriptor.height);const s=e.useTechnique(t);s.setUniform4f("uColor",1,1,1,1),s.bindTexture(o,"tex"),e.bindVAO(i),e.drawArrays(j.MX.TRIANGLE_STRIP,0,(0,J._V)(i,"geometry")),e.bindFramebuffer(null),e.setViewport(a.x,a.y,a.width,a.height)}unload(){if((0,o.pC)(this._powerOfTwoStretchInfo)){const{framebuffer:e,vao:t,sourceTexture:r}=this._powerOfTwoStretchInfo;t.dispose(!0),r.dispose(),e.dispose(),this._glTexture=null,this._powerOfTwoStretchInfo=null}if((0,o.pC)(this._glTexture)&&(this._glTexture.dispose(),this._glTexture=null),(0,o.pC)(this._loadingController)){const e=this._loadingController;this._loadingController=null,this._loadingPromise=null,e.abort()}this.events.emit("unloaded")}}_e.DDS_ENCODING="image/vnd-ms.dds",_e.KTX2_ENCODING="image/ktx2",_e.BASIS_ENCODING="image/x.basis",function(e){e[e.HAVE_NOTHING=0]="HAVE_NOTHING",e[e.HAVE_METADATA=1]="HAVE_METADATA",e[e.HAVE_CURRENT_DATA=2]="HAVE_CURRENT_DATA",e[e.HAVE_FUTURE_DATA=3]="HAVE_FUTURE_DATA",e[e.HAVE_ENOUGH_DATA=4]="HAVE_ENOUGH_DATA"}(ge||(ge={}));var be=r(50951),Ae=r(55158),Se=r(71011),Ce=r(96658),Me=r(10763);var Oe,ye=r(45639);class Ee extends N{constructor(e,t){super(),this.type=P.Material,this.supportsEdges=!1,this._visible=!0,this._renderPriority=0,this._insertOrder=0,this._vertexAttributeLocations=ue,this._parameters=(0,ye.Uf)(e,t),this.validateParameters(this._parameters)}dispose(){}get parameters(){return this._parameters}update(e){return!1}setParameters(e){(0,ye.LO)(this._parameters,e)&&(this.validateParameters(this._parameters),this.parametersChanged())}validateParameters(e){}get visible(){return this._visible}set visible(e){e!==this._visible&&(this._visible=e,this.parametersChanged())}shouldRender(e){return this.isVisible()&&this.isVisibleInPass(e.pass)&&0!=(this.renderOccluded&e.renderOccludedMask)}isVisibleInPass(e){return!0}get renderOccluded(){return this.parameters.renderOccluded}get renderPriority(){return this._renderPriority}set renderPriority(e){e!==this._renderPriority&&(this._renderPriority=e,this.parametersChanged())}get insertOrder(){return this._insertOrder}set insertOrder(e){e!==this._insertOrder&&(this._insertOrder=e,this.parametersChanged())}get vertexAttributeLocations(){return this._vertexAttributeLocations}isVisible(){return this._visible}parametersChanged(){(0,o.pC)(this.repository)&&this.repository.materialChanged(this)}}!function(e){e[e.Occlude=1]="Occlude",e[e.Transparent=2]="Transparent",e[e.OccludeAndTransparent=4]="OccludeAndTransparent",e[e.OccludeAndTransparentStencil=8]="OccludeAndTransparentStencil",e[e.Opaque=16]="Opaque"}(Oe||(Oe={}));const we={renderOccluded:Oe.Occlude};var Re,Pe=r(78041),Ie=r(68198),Ne=r(93822),Le=r(48976),De=r(98131),He=r(8229),Fe=r(67077),Be=(r(93169),r(90045));!function(e){e[e.X=0]="X",e[e.Y=1]="Y",e[e.Z=2]="Z"}(Re||(Re={}));r(63780);var ze=r(21530),Ue=r(11185);new ze.x((function(){return{origin:null,direction:null}}));(0,d.c)(),(0,d.c)();const Ge=A.Z.getLogger("esri.geometry.support.sphere");function Ve(){return(0,Fe.c)()}function We(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Ve();return(0,Be.c)(t,e)}function qe(e){return Array.isArray(e)?e[3]:e}function ke(e){return Array.isArray(e)?e:et}function $e(e,t,r){if((0,o.Wi)(t))return!1;const{origin:i,direction:n}=t,a=je;a[0]=i[0]-e[0],a[1]=i[1]-e[1],a[2]=i[2]-e[2];const s=n[0]*n[0]+n[1]*n[1]+n[2]*n[2],l=2*(n[0]*a[0]+n[1]*a[1]+n[2]*a[2]),c=l*l-4*s*(a[0]*a[0]+a[1]*a[1]+a[2]*a[2]-e[3]*e[3]);if(c<0)return!1;const d=Math.sqrt(c);let u=(-l-d)/(2*s);const h=(-l+d)/(2*s);return(u<0||h<u&&h>0)&&(u=h),!(u<0)&&(r&&(r[0]=i[0]+n[0]*u,r[1]=i[1]+n[1]*u,r[2]=i[2]+n[2]*u),!0)}const je=(0,d.c)();function Xe(e,t,r){const i=Ue.WM.get(),o=Ue.MP.get();(0,c.c)(i,t.origin,t.direction);const n=qe(e);(0,c.c)(r,i,t.origin),(0,c.a)(r,r,1/(0,c.l)(r)*n);const a=Ke(e,t.origin),l=function(e,t){const r=(0,c.d)(e,t)/((0,c.l)(e)*(0,c.l)(t));return-(0,U.ZF)(r)}(t.origin,r);return(0,s.d)(o,l+a,i),(0,c.m)(r,r,o),r}function Je(e,t,r){const i=(0,c.f)(Ue.WM.get(),t,ke(e)),o=(0,c.a)(Ue.WM.get(),i,e[3]/(0,c.l)(i));return(0,c.b)(r,o,ke(e))}function Ke(e,t){const r=(0,c.f)(Ue.WM.get(),t,ke(e)),i=(0,c.l)(r),o=qe(e),n=o+Math.abs(o-i);return(0,U.ZF)(o/n)}const Ye=(0,d.c)();function Ze(e,t,r,i){const o=(0,c.f)(Ye,t,ke(e));switch(r){case Re.X:{const e=(0,U.jE)(o,Ye)[2];return(0,c.s)(i,-Math.sin(e),Math.cos(e),0)}case Re.Y:{const e=(0,U.jE)(o,Ye),t=e[1],r=e[2],n=Math.sin(t);return(0,c.s)(i,-n*Math.cos(r),-n*Math.sin(r),Math.cos(t))}case Re.Z:return(0,c.n)(i,o);default:return}}function Qe(e,t){const r=(0,c.f)(tt,t,ke(e));return(0,c.l)(r)-e[3]}const et=(0,d.c)(),tt=(0,d.c)();Object.freeze({__proto__:null,create:Ve,copy:We,fromCenterAndRadius:function(e,t){return(0,Fe.f)(e[0],e[1],e[2],t)},wrap:function(e){return e},clear:function(e){e[0]=e[1]=e[2]=e[3]=0},fromRadius:function(e){return e},getRadius:qe,getCenter:ke,fromValues:function(e,t,r,i){return(0,Fe.f)(e,t,r,i)},elevate:function(e,t,r){return e!==r&&(0,c.g)(r,e),r[3]=e[3]+t,r},setExtent:function(e,t,r){return Ge.error("sphere.setExtent is not yet supported"),e===r?r:We(e,r)},intersectRay:$e,intersectsRay:function(e,t){return $e(e,t,null)},intersectRayClosestSilhouette:function(e,t,r){if($e(e,t,r))return r;const i=Xe(e,t,Ue.WM.get());return(0,c.b)(r,t.origin,(0,c.a)(Ue.WM.get(),t.direction,(0,c.i)(t.origin,i)/(0,c.l)(t.direction))),r},closestPointOnSilhouette:Xe,closestPoint:function(e,t,r){return $e(e,t,r)?r:(function(e,t,r){const i=(0,c.d)(e.direction,(0,c.f)(r,t,e.origin));(0,c.b)(r,e.origin,(0,c.a)(r,e.direction,i))}(t,ke(e),r),Je(e,r,r))},projectPoint:Je,distanceToSilhouette:function(e,t){const r=(0,c.f)(Ue.WM.get(),t,ke(e)),i=(0,c.p)(r),o=e[3]*e[3];return Math.sqrt(Math.abs(i-o))},angleToSilhouette:Ke,axisAt:Ze,altitudeAt:Qe,setAltitudeAt:function(e,t,r,i){const o=Qe(e,t),n=Ze(e,t,Re.Z,tt),a=(0,c.a)(tt,n,r-o);return(0,c.b)(i,t,a)}});const rt=new class{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.offset=e,this.sphere=Ve(),this.tmpVertex=(0,d.c)()}applyToVertex(e,t,r){const i=this.objectTransform.transform;let o=i[0]*e+i[4]*t+i[8]*r+i[12],n=i[1]*e+i[5]*t+i[9]*r+i[13],a=i[2]*e+i[6]*t+i[10]*r+i[14];const s=this.offset/Math.sqrt(o*o+n*n+a*a);o+=o*s,n+=n*s,a+=a*s;const l=this.objectTransform.inverse;return this.tmpVertex[0]=l[0]*o+l[4]*n+l[8]*a+l[12],this.tmpVertex[1]=l[1]*o+l[5]*n+l[9]*a+l[13],this.tmpVertex[2]=l[2]*o+l[6]*n+l[10]*a+l[14],this.tmpVertex}applyToMinMax(e,t){const r=this.offset/Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2]);e[0]+=e[0]*r,e[1]+=e[1]*r,e[2]+=e[2]*r;const i=this.offset/Math.sqrt(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]);t[0]+=t[0]*i,t[1]+=t[1]*i,t[2]+=t[2]*i}applyToAabb(e){const t=this.offset/Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2]);e[0]+=e[0]*t,e[1]+=e[1]*t,e[2]+=e[2]*t;const r=this.offset/Math.sqrt(e[3]*e[3]+e[4]*e[4]+e[5]*e[5]);return e[3]+=e[3]*r,e[4]+=e[4]*r,e[5]+=e[5]*r,e}applyToBoundingSphere(e){const t=Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2]),r=this.offset/t;return this.sphere[0]=e[0]+e[0]*r,this.sphere[1]=e[1]+e[1]*r,this.sphere[2]=e[2]+e[2]*r,this.sphere[3]=e[3]+e[3]*this.offset/t,this.sphere}};new class{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.offset=e,this.componentLocalOriginLength=0,this.tmpVertex=(0,d.c)(),this.mbs=(0,Fe.c)(),this.obb={center:(0,d.c)(),halfSize:(0,He.c)(),quaternion:null}}set localOrigin(e){this.componentLocalOriginLength=Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2])}applyToVertex(e,t,r){const i=e,o=t,n=r+this.componentLocalOriginLength,a=this.offset/Math.sqrt(i*i+o*o+n*n);return this.tmpVertex[0]=e+i*a,this.tmpVertex[1]=t+o*a,this.tmpVertex[2]=r+n*a,this.tmpVertex}applyToAabb(e){const t=e[0],r=e[1],i=e[2]+this.componentLocalOriginLength,o=e[3],n=e[4],a=e[5]+this.componentLocalOriginLength,s=this.offset/Math.sqrt(t*t+r*r+i*i);e[0]+=t*s,e[1]+=r*s,e[2]+=i*s;const l=this.offset/Math.sqrt(o*o+n*n+a*a);return e[3]+=o*l,e[4]+=n*l,e[5]+=a*l,e}applyToMbs(e){const t=Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2]),r=this.offset/t;return this.mbs[0]=e[0]+e[0]*r,this.mbs[1]=e[1]+e[1]*r,this.mbs[2]=e[2]+e[2]*r,this.mbs[3]=e[3]+e[3]*this.offset/t,this.mbs}applyToObb(e){const t=e.center,r=this.offset/Math.sqrt(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]);this.obb.center[0]=t[0]+t[0]*r,this.obb.center[1]=t[1]+t[1]*r,this.obb.center[2]=t[2]+t[2]*r,(0,c.q)(this.obb.halfSize,e.halfSize,e.quaternion),(0,c.b)(this.obb.halfSize,this.obb.halfSize,e.center);const i=this.offset/Math.sqrt(this.obb.halfSize[0]*this.obb.halfSize[0]+this.obb.halfSize[1]*this.obb.halfSize[1]+this.obb.halfSize[2]*this.obb.halfSize[2]);return this.obb.halfSize[0]+=this.obb.halfSize[0]*i,this.obb.halfSize[1]+=this.obb.halfSize[1]*i,this.obb.halfSize[2]+=this.obb.halfSize[2]*i,(0,c.f)(this.obb.halfSize,this.obb.halfSize,e.center),(0,Le.c)(it,e.quaternion),(0,c.q)(this.obb.halfSize,this.obb.halfSize,it),this.obb.halfSize[0]*=this.obb.halfSize[0]<0?-1:1,this.obb.halfSize[1]*=this.obb.halfSize[1]<0?-1:1,this.obb.halfSize[2]*=this.obb.halfSize[2]<0?-1:1,this.obb.quaternion=e.quaternion,this.obb}};new class{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.offset=e,this.tmpVertex=(0,d.c)()}applyToVertex(e,t,r){const i=e+this.localOrigin[0],o=t+this.localOrigin[1],n=r+this.localOrigin[2],a=this.offset/Math.sqrt(i*i+o*o+n*n);return this.tmpVertex[0]=e+i*a,this.tmpVertex[1]=t+o*a,this.tmpVertex[2]=r+n*a,this.tmpVertex}applyToAabb(e){const t=e[0]+this.localOrigin[0],r=e[1]+this.localOrigin[1],i=e[2]+this.localOrigin[2],o=e[3]+this.localOrigin[0],n=e[4]+this.localOrigin[1],a=e[5]+this.localOrigin[2],s=this.offset/Math.sqrt(t*t+r*r+i*i);e[0]+=t*s,e[1]+=r*s,e[2]+=i*s;const l=this.offset/Math.sqrt(o*o+n*n+a*a);return e[3]+=o*l,e[4]+=n*l,e[5]+=a*l,e}};const it=(0,De.a)();function ot(e,t,r,i){const o=r.typedBuffer,n=r.typedBufferStride,a=e.length;i*=n;for(let s=0;s<a;++s){const r=2*e[s];o[i]=t[r],o[i+1]=t[r+1],i+=n}}function nt(e,t,r,i,o){const n=r.typedBuffer,a=r.typedBufferStride,s=e.length;if(i*=a,null==o||1===o)for(let l=0;l<s;++l){const r=3*e[l];n[i]=t[r],n[i+1]=t[r+1],n[i+2]=t[r+2],i+=a}else for(let l=0;l<s;++l){const r=3*e[l];for(let e=0;e<o;++e)n[i]=t[r],n[i+1]=t[r+1],n[i+2]=t[r+2],i+=a}}function at(e,t,r,i){let o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1;const n=r.typedBuffer,a=r.typedBufferStride,s=e.length;if(i*=a,1===o)for(let l=0;l<s;++l){const r=4*e[l];n[i]=t[r],n[i+1]=t[r+1],n[i+2]=t[r+2],n[i+3]=t[r+3],i+=a}else for(let l=0;l<s;++l){const r=4*e[l];for(let e=0;e<o;++e)n[i]=t[r],n[i+1]=t[r+1],n[i+2]=t[r+2],n[i+3]=t[r+3],i+=a}}function st(e,t,r,i,o){let n=arguments.length>5&&void 0!==arguments[5]?arguments[5]:1;if(!r)return void nt(e,t,i,o,n);const a=i.typedBuffer,s=i.typedBufferStride,l=e.length,c=r[0],d=r[1],u=r[2],h=r[4],m=r[5],f=r[6],p=r[8],v=r[9],g=r[10],x=r[12],T=r[13],_=r[14];if(o*=s,1===n)for(let b=0;b<l;++b){const r=3*e[b],i=t[r],n=t[r+1],l=t[r+2];a[o]=c*i+h*n+p*l+x,a[o+1]=d*i+m*n+v*l+T,a[o+2]=u*i+f*n+g*l+_,o+=s}else for(let b=0;b<l;++b){const r=3*e[b],i=t[r],l=t[r+1],A=t[r+2],S=c*i+h*l+p*A+x,C=d*i+m*l+v*A+T,M=u*i+f*l+g*A+_;for(let e=0;e<n;++e)a[o]=S,a[o+1]=C,a[o+2]=M,o+=s}}function lt(e,t,r,i,o){let n=arguments.length>5&&void 0!==arguments[5]?arguments[5]:1;if(!r)return void nt(e,t,i,o,n);const a=r,l=i.typedBuffer,c=i.typedBufferStride,d=e.length,u=a[0],h=a[1],m=a[2],f=a[4],p=a[5],v=a[6],g=a[8],x=a[9],T=a[10],_=!(0,s.p)(a),b=1e-6,A=1-b;if(o*=c,1===n)for(let s=0;s<d;++s){const r=3*e[s],i=t[r],n=t[r+1],a=t[r+2];let d=u*i+f*n+g*a,S=h*i+p*n+x*a,C=m*i+v*n+T*a;if(_){const e=d*d+S*S+C*C;if(e<A&&e>b){const t=1/Math.sqrt(e);d*=t,S*=t,C*=t}}l[o+0]=d,l[o+1]=S,l[o+2]=C,o+=c}else for(let s=0;s<d;++s){const r=3*e[s],i=t[r],a=t[r+1],d=t[r+2];let S=u*i+f*a+g*d,C=h*i+p*a+x*d,M=m*i+v*a+T*d;if(_){const e=S*S+C*C+M*M;if(e<A&&e>b){const t=1/Math.sqrt(e);S*=t,C*=t,M*=t}}for(let e=0;e<n;++e)l[o+0]=S,l[o+1]=C,l[o+2]=M,o+=c}}function ct(e,t,r,i,o){let n=arguments.length>5&&void 0!==arguments[5]?arguments[5]:1;if(!r)return void at(e,t,i,o,n);const a=r,l=i.typedBuffer,c=i.typedBufferStride,d=e.length,u=a[0],h=a[1],m=a[2],f=a[4],p=a[5],v=a[6],g=a[8],x=a[9],T=a[10],_=!(0,s.p)(a),b=1e-6,A=1-b;if(o*=c,1===n)for(let s=0;s<d;++s){const r=4*e[s],i=t[r],n=t[r+1],a=t[r+2],d=t[r+3];let S=u*i+f*n+g*a,C=h*i+p*n+x*a,M=m*i+v*n+T*a;if(_){const e=S*S+C*C+M*M;if(e<A&&e>b){const t=1/Math.sqrt(e);S*=t,C*=t,M*=t}}l[o+0]=S,l[o+1]=C,l[o+2]=M,l[o+3]=d,o+=c}else for(let s=0;s<d;++s){const r=4*e[s],i=t[r],a=t[r+1],d=t[r+2],S=t[r+3];let C=u*i+f*a+g*d,M=h*i+p*a+x*d,O=m*i+v*a+T*d;if(_){const e=C*C+M*M+O*O;if(e<A&&e>b){const t=1/Math.sqrt(e);C*=t,M*=t,O*=t}}for(let e=0;e<n;++e)l[o+0]=C,l[o+1]=M,l[o+2]=O,l[o+3]=S,o+=c}}function dt(e,t,r,i,o){let n=arguments.length>5&&void 0!==arguments[5]?arguments[5]:1;const a=i.typedBuffer,s=i.typedBufferStride,l=e.length;if(o*=s,1===n){if(4===r)for(let c=0;c<l;++c){const r=4*e[c];a[o]=t[r],a[o+1]=t[r+1],a[o+2]=t[r+2],a[o+3]=t[r+3],o+=s}else if(3===r)for(let c=0;c<l;++c){const r=3*e[c];a[o]=t[r],a[o+1]=t[r+1],a[o+2]=t[r+2],a[o+3]=255,o+=s}}else if(4===r)for(let c=0;c<l;++c){const r=4*e[c];for(let e=0;e<n;++e)a[o]=t[r],a[o+1]=t[r+1],a[o+2]=t[r+2],a[o+3]=t[r+3],o+=s}else if(3===r)for(let c=0;c<l;++c){const r=3*e[c];for(let e=0;e<n;++e)a[o]=t[r],a[o+1]=t[r+1],a[o+2]=t[r+2],a[o+3]=255,o+=s}}var ut=r(27366),ht=r(33280),mt=r(81221),ft=r(73782),pt=r(60113),vt=r(71410),gt=r(137),xt=r(15226),Tt=r(41481),_t=r(23235),bt=r(18607),At=r(27254);function St(e,t,r){(0,s.j)(Ct,r,t),e.setUniform3fv("localOrigin",t),e.setUniformMatrix4fv("view",Ct)}const Ct=(0,r(92733).c)();class Mt{constructor(e,t){this._module=e,this._loadModule=t}get(){return this._module}async reload(){return this._module=await this._loadModule(),this._module}}function Ot(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(t,r)=>{var i,o;t._parameterNames=null!=(i=t._parameterNames)?i:[],t._parameterNames.push(r);const n=t._parameterNames.length-1,a=e.count||2,s=Math.ceil(Math.log2(a)),l=null!=(o=t._parameterBits)?o:[0];let c=0;for(;l[c]+s>16;)c++,c>=l.length&&l.push(0);t._parameterBits=l;const d=l[c],u=(1<<s)-1<<d;l[c]+=s,Object.defineProperty(t,r,{get(){return this[n]},set(e){if(this[n]!==e&&(this[n]=e,this._keyDirty=!0,this._parameterBits[c]=this._parameterBits[c]&~u|+e<<d&u,"number"!=typeof e&&"boolean"!=typeof e))throw"Configuration value for "+r+" must be boolean or number, got "+typeof e}})}}var yt=r(37825);class Et{constructor(e,t,r){this._context=e,this._locations=r,this._textures=new Map,this._freeTextureUnits=new y.Z({deallocator:null}),this._glProgram=e.programCache.acquire(t.generateSource("vertex"),t.generateSource("fragment"),r),this._glProgram.stop=()=>{throw new Error("Wrapped _glProgram used directly")},this._fragmentUniforms=(0,yt.hZ)()?t.fragmentUniforms.entries:null}dispose(){this._glProgram.dispose()}get glName(){return this._glProgram.glName}get isCompiled(){return this._glProgram.isCompiled}setUniform1b(e,t){this._glProgram.setUniform1i(e,t?1:0)}setUniform1i(e,t){this._glProgram.setUniform1i(e,t)}setUniform1f(e,t){this._glProgram.setUniform1f(e,t)}setUniform1fv(e,t){this._glProgram.setUniform1fv(e,t)}setUniform1iv(e,t){this._glProgram.setUniform1iv(e,t)}setUniform2f(e,t,r){this._glProgram.setUniform2f(e,t,r)}setUniform2fv(e,t){this._glProgram.setUniform2fv(e,t)}setUniform2iv(e,t){this._glProgram.setUniform2iv(e,t)}setUniform3f(e,t,r,i){this._glProgram.setUniform3f(e,t,r,i)}setUniform3fv(e,t){this._glProgram.setUniform3fv(e,t)}setUniform3iv(e,t){this._glProgram.setUniform3iv(e,t)}setUniform4f(e,t,r,i,o){this._glProgram.setUniform4f(e,t,r,i,o)}setUniform4fv(e,t){this._glProgram.setUniform4fv(e,t)}setUniform4iv(e,t){this._glProgram.setUniform4iv(e,t)}setUniformMatrix3fv(e,t){this._glProgram.setUniformMatrix3fv(e,t)}setUniformMatrix4fv(e,t){this._glProgram.setUniformMatrix4fv(e,t)}assertCompatibleVertexAttributeLocations(e){e.locations!==this._locations&&console.error("VertexAttributeLocations are incompatible")}stop(){this._textures.clear(),this._freeTextureUnits.clear()}bindTexture(e,t){if((0,o.Wi)(e)||null==e.glName){const e=this._textures.get(t);return e&&(this._context.bindTexture(null,e.unit),this._freeTextureUnit(e),this._textures.delete(t)),null}let r=this._textures.get(t);return null==r?(r=this._allocTextureUnit(e),this._textures.set(t,r)):r.texture=e,this._context.useProgram(this),this.setUniform1i(t,r.unit),this._context.bindTexture(e,r.unit),r.unit}rebindTextures(){this._context.useProgram(this),this._textures.forEach(((e,t)=>{this._context.bindTexture(e.texture,e.unit),this.setUniform1i(t,e.unit)})),(0,o.pC)(this._fragmentUniforms)&&this._fragmentUniforms.forEach((e=>{if(("sampler2D"===e.type||"samplerCube"===e.type)&&!this._textures.has(e.name))throw new Error(`Texture sampler ${e.name} has no bound texture`)}))}_allocTextureUnit(e){return{texture:e,unit:0===this._freeTextureUnits.length?this._textures.size:this._freeTextureUnits.pop()}}_freeTextureUnit(e){this._freeTextureUnits.push(e.unit)}}j.wb.LESS,j.wb.ALWAYS;const wt={mask:255},Rt={function:{func:j.wb.ALWAYS,ref:O.hU.OutlineVisualElementMask,mask:O.hU.OutlineVisualElementMask},operation:{fail:j.xS.KEEP,zFail:j.xS.KEEP,zPass:j.xS.ZERO}},Pt={function:{func:j.wb.ALWAYS,ref:O.hU.OutlineVisualElementMask,mask:O.hU.OutlineVisualElementMask},operation:{fail:j.xS.KEEP,zFail:j.xS.KEEP,zPass:j.xS.REPLACE}};j.wb.EQUAL,O.hU.OutlineVisualElementMask,O.hU.OutlineVisualElementMask,j.xS.KEEP,j.xS.KEEP,j.xS.KEEP,j.wb.NOTEQUAL,O.hU.OutlineVisualElementMask,O.hU.OutlineVisualElementMask,j.xS.KEEP,j.xS.KEEP,j.xS.KEEP;var It=r(65630),Nt=r(36207);const Lt=A.Z.getLogger("esri.views.3d.webgl-engine.shaders.DefaultTechnique");class Dt extends class{constructor(e,t,r){this.release=r,t&&(this._config=t.snapshot()),this._program=this.initializeProgram(e),this._pipeline=this.initializePipeline(e)}destroy(){this._program=(0,o.O3)(this._program),this._pipeline=this._config=null}reload(e){(0,o.O3)(this._program),this._program=this.initializeProgram(e),this._pipeline=this.initializePipeline(e)}get program(){return this._program}get key(){return this._config.key}get configuration(){return this._config}bindPass(e,t){}bindMaterial(e,t){}bindDraw(e){}bindPipelineState(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=arguments.length>2?arguments[2]:void 0;e.setPipelineState(this.getPipelineState(t,r))}ensureAttributeLocations(e){this.program.assertCompatibleVertexAttributeLocations(e)}get primitiveType(){return j.MX.TRIANGLES}getPipelineState(e,t){return this._pipeline}}{initializeProgram(e){const t=Dt.shader.get(),r=this.configuration,i=t.build({oitEnabled:r.transparencyPassType===O.Am.Color,output:r.output,viewingMode:e.viewingMode,receiveShadows:r.receiveShadows,slicePlaneEnabled:r.slicePlaneEnabled,sliceHighlightDisabled:r.sliceHighlightDisabled,sliceEnabledForVertexPrograms:!1,symbolColor:r.symbolColors,vvSize:r.vvSize,vvColor:r.vvColor,vvInstancingEnabled:!0,instanced:r.instanced,instancedColor:r.instancedColor,instancedDoublePrecision:r.instancedDoublePrecision,pbrMode:r.usePBR?r.isSchematic?Tt.f7.Schematic:Tt.f7.Normal:Tt.f7.Disabled,hasMetalnessAndRoughnessTexture:r.hasMetalnessAndRoughnessTexture,hasEmissionTexture:r.hasEmissionTexture,hasOcclusionTexture:r.hasOcclusionTexture,hasNormalTexture:r.hasNormalTexture,hasColorTexture:r.hasColorTexture,hasModelTransformation:r.hasModelTransformation,receiveAmbientOcclusion:r.receiveAmbientOcclusion,useCustomDTRExponentForWater:!1,normalType:r.normalsTypeDerivate?ft.h.ScreenDerivative:ft.h.Attribute,doubleSidedMode:r.doubleSidedMode,vertexTangents:r.vertexTangents,attributeTextureCoordinates:r.hasMetalnessAndRoughnessTexture||r.hasEmissionTexture||r.hasOcclusionTexture||r.hasNormalTexture||r.hasColorTexture?pt.N.Default:pt.N.None,textureAlphaPremultiplied:r.textureAlphaPremultiplied,attributeColor:r.vertexColors,screenSizePerspectiveEnabled:r.screenSizePerspective,verticalOffsetEnabled:r.verticalOffset,offsetBackfaces:r.offsetBackfaces,doublePrecisionRequiresObfuscation:(0,At.I)(e.rctx),alphaDiscardMode:r.alphaDiscardMode,supportsTextureAtlas:!1,multipassTerrainEnabled:r.multipassTerrainEnabled,cullAboveGround:r.cullAboveGround});return new Et(e.rctx,i,ue)}bindPass(e,t){var r,i;!function(e,t){e.setUniformMatrix4fv("proj",t)}(this.program,t.camera.projectionMatrix);const n=this.configuration.output;this.configuration.hasModelTransformation&&((0,o.pC)(e.modelTransformation)?this.program.setUniformMatrix4fv("model",e.modelTransformation):Lt.warnOnce("hasModelTransformation true, but no modelTransformation found.")),(this.configuration.output===Se.H.Depth||t.multipassTerrainEnabled||n===Se.H.Shadow)&&this.program.setUniform2fv("nearFar",t.camera.nearFar),t.multipassTerrainEnabled&&(this.program.setUniform2fv("inverseViewport",t.inverseViewport),(0,xt.p)(this.program,t)),n===Se.H.Alpha&&(this.program.setUniform1f("opacity",e.opacity),this.program.setUniform1f("layerOpacity",e.layerOpacity),this.program.setUniform4fv("externalColor",e.externalColor),this.program.setUniform1i("colorMixMode",ye.FZ[e.colorMixMode])),n===Se.H.Color?(t.lighting.setUniforms(this.program,!1,t.hasFillLights),this.program.setUniform3fv("ambient",e.ambient),this.program.setUniform3fv("diffuse",e.diffuse),this.program.setUniform4fv("externalColor",e.externalColor),this.program.setUniform1i("colorMixMode",ye.FZ[e.colorMixMode]),this.program.setUniform1f("opacity",e.opacity),this.program.setUniform1f("layerOpacity",e.layerOpacity),this.configuration.usePBR&&(0,Tt.nW)(this.program,e,this.configuration.isSchematic)):n===Se.H.Highlight&&(0,gt.wW)(this.program,t),(0,bt.uj)(this.program,e),(0,vt.Mo)(this.program,e,t),(0,ye.bj)(e.screenSizePerspective,this.program,"screenSizePerspectiveAlignment"),e.textureAlphaMode!==O.JJ.Mask&&e.textureAlphaMode!==O.JJ.MaskBlend||this.program.setUniform1f("textureAlphaCutoff",e.textureAlphaCutoff),null==(r=t.shadowMap)||r.bind(this.program),null==(i=t.ssaoHelper)||i.bind(this.program,t.camera)}bindDraw(e){const t=this.configuration.instancedDoublePrecision?(0,d.f)(e.camera.viewInverseTransposeMatrix[3],e.camera.viewInverseTransposeMatrix[7],e.camera.viewInverseTransposeMatrix[11]):e.origin;St(this.program,t,e.camera.viewMatrix),this.program.rebindTextures(),(this.configuration.output===Se.H.Color||this.configuration.output===Se.H.Alpha||this.configuration.output===Se.H.Depth&&this.configuration.screenSizePerspective||this.configuration.output===Se.H.Normal&&this.configuration.screenSizePerspective||this.configuration.output===Se.H.Highlight&&this.configuration.screenSizePerspective)&&function(e,t,r){e.setUniform3f("cameraPosition",r[3]-t[0],r[7]-t[1],r[11]-t[2])}(this.program,t,e.camera.viewInverseTransposeMatrix),this.configuration.output===Se.H.Normal&&this.program.setUniformMatrix4fv("viewNormal",e.camera.viewInverseTransposeMatrix),this.configuration.instancedDoublePrecision&&(0,mt.d3)(this.program,t),(0,ht.Vv)(this.program,this.configuration,e.slicePlane,{origin:t}),this.configuration.output===Se.H.Color&&(0,_t.vL)(this.program,e,t)}_convertDepthTestFunction(e){return e===O.Gv.Lequal?j.wb.LEQUAL:j.wb.LESS}_setPipeline(e,t){const r=this.configuration,i=e===O.Am.NONE,o=e===O.Am.FrontFace;return(0,Nt.sm)({blending:r.output!==Se.H.Color&&r.output!==Se.H.Alpha||!r.transparent?null:i?Pe.wu:(0,Pe.j7)(e),culling:Ht(r)&&(0,Nt.zp)(r.cullFace),depthTest:{func:(0,Pe.Bh)(e,this._convertDepthTestFunction(r.customDepthTest))},depthWrite:i||o?r.writeDepth&&Nt.LZ:null,colorWrite:Nt.BK,stencilWrite:r.sceneHasOcludees?wt:null,stencilTest:r.sceneHasOcludees?t?Pt:Rt:null,polygonOffset:i||o?null:(0,Pe.je)(r.enableOffset)})}initializePipeline(){return this._occludeePipelineState=this._setPipeline(this.configuration.transparencyPassType,!0),this._setPipeline(this.configuration.transparencyPassType,!1)}getPipelineState(e,t){return t?this._occludeePipelineState:super.getPipelineState(e,t)}}function Ht(e){return e.cullFace?e.cullFace!==O.Vr.None:!e.slicePlaneEnabled&&!e.transparent&&!e.doubleSidedMode}Dt.shader=new Mt(It.D,(()=>r.e(294).then(r.bind(r,40294))));class Ft extends class{constructor(){this._key="",this._keyDirty=!1,this._parameterBits=this._parameterBits?this._parameterBits.map((()=>0)):[],this._parameterNames||(this._parameterNames=[])}get key(){return this._keyDirty&&(this._keyDirty=!1,this._key=String.fromCharCode.apply(String,this._parameterBits)),this._key}snapshot(){const e=this._parameterNames,t={key:this.key};for(const r of e)t[r]=this[r];return t}}{constructor(){super(...arguments),this.output=Se.H.Color,this.alphaDiscardMode=O.JJ.Opaque,this.doubleSidedMode=Ce.q.None,this.isSchematic=!1,this.vertexColors=!1,this.offsetBackfaces=!1,this.symbolColors=!1,this.vvSize=!1,this.vvColor=!1,this.verticalOffset=!1,this.receiveShadows=!1,this.slicePlaneEnabled=!1,this.sliceHighlightDisabled=!1,this.receiveAmbientOcclusion=!1,this.screenSizePerspective=!1,this.textureAlphaPremultiplied=!1,this.hasColorTexture=!1,this.usePBR=!1,this.hasMetalnessAndRoughnessTexture=!1,this.hasEmissionTexture=!1,this.hasOcclusionTexture=!1,this.hasNormalTexture=!1,this.instanced=!1,this.instancedColor=!1,this.instancedDoublePrecision=!1,this.vertexTangents=!1,this.normalsTypeDerivate=!1,this.writeDepth=!0,this.sceneHasOcludees=!1,this.transparent=!1,this.enableOffset=!0,this.cullFace=O.Vr.None,this.transparencyPassType=O.Am.NONE,this.multipassTerrainEnabled=!1,this.cullAboveGround=!1,this.hasModelTransformation=!1,this.customDepthTest=O.Gv.Less}}(0,ut._)([Ot({count:Se.H.COUNT})],Ft.prototype,"output",void 0),(0,ut._)([Ot({count:O.JJ.COUNT})],Ft.prototype,"alphaDiscardMode",void 0),(0,ut._)([Ot({count:Ce.q.COUNT})],Ft.prototype,"doubleSidedMode",void 0),(0,ut._)([Ot()],Ft.prototype,"isSchematic",void 0),(0,ut._)([Ot()],Ft.prototype,"vertexColors",void 0),(0,ut._)([Ot()],Ft.prototype,"offsetBackfaces",void 0),(0,ut._)([Ot()],Ft.prototype,"symbolColors",void 0),(0,ut._)([Ot()],Ft.prototype,"vvSize",void 0),(0,ut._)([Ot()],Ft.prototype,"vvColor",void 0),(0,ut._)([Ot()],Ft.prototype,"verticalOffset",void 0),(0,ut._)([Ot()],Ft.prototype,"receiveShadows",void 0),(0,ut._)([Ot()],Ft.prototype,"slicePlaneEnabled",void 0),(0,ut._)([Ot()],Ft.prototype,"sliceHighlightDisabled",void 0),(0,ut._)([Ot()],Ft.prototype,"receiveAmbientOcclusion",void 0),(0,ut._)([Ot()],Ft.prototype,"screenSizePerspective",void 0),(0,ut._)([Ot()],Ft.prototype,"textureAlphaPremultiplied",void 0),(0,ut._)([Ot()],Ft.prototype,"hasColorTexture",void 0),(0,ut._)([Ot()],Ft.prototype,"usePBR",void 0),(0,ut._)([Ot()],Ft.prototype,"hasMetalnessAndRoughnessTexture",void 0),(0,ut._)([Ot()],Ft.prototype,"hasEmissionTexture",void 0),(0,ut._)([Ot()],Ft.prototype,"hasOcclusionTexture",void 0),(0,ut._)([Ot()],Ft.prototype,"hasNormalTexture",void 0),(0,ut._)([Ot()],Ft.prototype,"instanced",void 0),(0,ut._)([Ot()],Ft.prototype,"instancedColor",void 0),(0,ut._)([Ot()],Ft.prototype,"instancedDoublePrecision",void 0),(0,ut._)([Ot()],Ft.prototype,"vertexTangents",void 0),(0,ut._)([Ot()],Ft.prototype,"normalsTypeDerivate",void 0),(0,ut._)([Ot()],Ft.prototype,"writeDepth",void 0),(0,ut._)([Ot()],Ft.prototype,"sceneHasOcludees",void 0),(0,ut._)([Ot()],Ft.prototype,"transparent",void 0),(0,ut._)([Ot()],Ft.prototype,"enableOffset",void 0),(0,ut._)([Ot({count:O.Vr.COUNT})],Ft.prototype,"cullFace",void 0),(0,ut._)([Ot({count:O.Am.COUNT})],Ft.prototype,"transparencyPassType",void 0),(0,ut._)([Ot()],Ft.prototype,"multipassTerrainEnabled",void 0),(0,ut._)([Ot()],Ft.prototype,"cullAboveGround",void 0),(0,ut._)([Ot()],Ft.prototype,"hasModelTransformation",void 0),(0,ut._)([Ot({count:O.Gv.COUNT})],Ft.prototype,"customDepthTest",void 0);var Bt=r(40563);class zt extends Dt{initializeProgram(e){const t=zt.shader.get(),r=this.configuration,i=t.build({oitEnabled:r.transparencyPassType===O.Am.Color,output:r.output,viewingMode:e.viewingMode,receiveShadows:r.receiveShadows,slicePlaneEnabled:r.slicePlaneEnabled,sliceHighlightDisabled:r.sliceHighlightDisabled,sliceEnabledForVertexPrograms:!1,symbolColor:r.symbolColors,vvSize:r.vvSize,vvColor:r.vvColor,vvInstancingEnabled:!0,instanced:r.instanced,instancedColor:r.instancedColor,instancedDoublePrecision:r.instancedDoublePrecision,pbrMode:r.usePBR?Tt.f7.Normal:Tt.f7.Disabled,hasMetalnessAndRoughnessTexture:!1,hasEmissionTexture:!1,hasOcclusionTexture:!1,hasNormalTexture:!1,hasColorTexture:r.hasColorTexture,hasModelTransformation:!1,receiveAmbientOcclusion:r.receiveAmbientOcclusion,useCustomDTRExponentForWater:!1,normalType:ft.h.Attribute,doubleSidedMode:Ce.q.WindingOrder,vertexTangents:!1,attributeTextureCoordinates:r.hasColorTexture?pt.N.Default:pt.N.None,textureAlphaPremultiplied:r.textureAlphaPremultiplied,attributeColor:r.vertexColors,screenSizePerspectiveEnabled:r.screenSizePerspective,verticalOffsetEnabled:r.verticalOffset,offsetBackfaces:r.offsetBackfaces,doublePrecisionRequiresObfuscation:(0,At.I)(e.rctx),alphaDiscardMode:r.alphaDiscardMode,supportsTextureAtlas:!1,multipassTerrainEnabled:r.multipassTerrainEnabled,cullAboveGround:r.cullAboveGround});return new Et(e.rctx,i,ue)}}zt.shader=new Mt(Bt.R,(()=>r.e(8834).then(r.bind(r,88834))));class Ut extends Ee{constructor(e){super(e,Vt),this.supportsEdges=!0,this.techniqueConfig=new Ft,this.vertexBufferLayout=function(e){const t=e.textureId||e.normalTextureId||e.metallicRoughnessTextureId||e.emissiveTextureId||e.occlusionTextureId,r=(0,Ae.U$)().vec3f(D.T.POSITION).vec3f(D.T.NORMAL);return e.vertexTangents&&r.vec4f(D.T.TANGENT),t&&r.vec2f(D.T.UV0),e.vertexColors&&r.vec4u8(D.T.COLOR),e.symbolColors&&r.vec4u8(D.T.SYMBOLCOLOR),r}(this.parameters),this.instanceBufferLayout=e.instanced?function(e){let t=(0,Ae.U$)();return t=e.instancedDoublePrecision?t.vec3f(D.T.MODELORIGINHI).vec3f(D.T.MODELORIGINLO).mat3f(D.T.MODEL).mat3f(D.T.MODELNORMAL):t.mat4f(D.T.MODEL).mat4f(D.T.MODELNORMAL),e.instanced&&e.instanced.indexOf("color")>-1&&(t=t.vec4f(D.T.INSTANCECOLOR)),e.instanced&&e.instanced.indexOf("featureAttribute")>-1&&(t=t.vec4f(D.T.INSTANCEFEATUREATTRIBUTE)),t}(this.parameters):null}isVisibleInPass(e){return e!==Ie.C.MATERIAL_DEPTH_SHADOWMAP_ALL&&e!==Ie.C.MATERIAL_DEPTH_SHADOWMAP_DEFAULT&&e!==Ie.C.MATERIAL_DEPTH_SHADOWMAP_HIGHLIGHT||this.parameters.castShadows}isVisible(){const e=this.parameters;if(!super.isVisible()||0===e.layerOpacity)return!1;const t=e.instanced,r=e.vertexColors,i=e.symbolColors,o=!!t&&t.indexOf("color")>-1,n=e.vvColorEnabled,a="replace"===e.colorMixMode,s=e.opacity>0,l=e.externalColor&&e.externalColor[3]>0;return r&&(o||n||i)?!!a||s:r?a?l:s:o||n||i?!!a||s:a?l:s}getTechniqueConfig(e,t){return this.techniqueConfig.output=e,this.techniqueConfig.hasNormalTexture=!!this.parameters.normalTextureId,this.techniqueConfig.hasColorTexture=!!this.parameters.textureId,this.techniqueConfig.vertexTangents=this.parameters.vertexTangents,this.techniqueConfig.instanced=!!this.parameters.instanced,this.techniqueConfig.instancedDoublePrecision=this.parameters.instancedDoublePrecision,this.techniqueConfig.vvSize=this.parameters.vvSizeEnabled,this.techniqueConfig.verticalOffset=null!==this.parameters.verticalOffset,this.techniqueConfig.screenSizePerspective=null!==this.parameters.screenSizePerspective,this.techniqueConfig.slicePlaneEnabled=this.parameters.slicePlaneEnabled,this.techniqueConfig.sliceHighlightDisabled=this.parameters.sliceHighlightDisabled,this.techniqueConfig.alphaDiscardMode=this.parameters.textureAlphaMode,this.techniqueConfig.normalsTypeDerivate="screenDerivative"===this.parameters.normals,this.techniqueConfig.transparent=this.parameters.transparent,this.techniqueConfig.writeDepth=this.parameters.writeDepth,(0,o.pC)(this.parameters.customDepthTest)&&(this.techniqueConfig.customDepthTest=this.parameters.customDepthTest),this.techniqueConfig.sceneHasOcludees=this.parameters.sceneHasOcludees,this.techniqueConfig.cullFace=this.parameters.slicePlaneEnabled?O.Vr.None:this.parameters.cullFace,this.techniqueConfig.multipassTerrainEnabled=t.multipassTerrainEnabled,this.techniqueConfig.cullAboveGround=t.cullAboveGround,this.techniqueConfig.hasModelTransformation=(0,o.pC)(this.parameters.modelTransformation),e!==Se.H.Color&&e!==Se.H.Alpha||(this.techniqueConfig.vertexColors=this.parameters.vertexColors,this.techniqueConfig.symbolColors=this.parameters.symbolColors,this.parameters.treeRendering?this.techniqueConfig.doubleSidedMode=Ce.q.WindingOrder:this.techniqueConfig.doubleSidedMode=this.parameters.doubleSided&&"normal"===this.parameters.doubleSidedType?Ce.q.View:this.parameters.doubleSided&&"winding-order"===this.parameters.doubleSidedType?Ce.q.WindingOrder:Ce.q.None,this.techniqueConfig.instancedColor=!!this.parameters.instanced&&this.parameters.instanced.indexOf("color")>-1,this.techniqueConfig.receiveShadows=this.parameters.receiveShadows&&this.parameters.shadowMappingEnabled,this.techniqueConfig.receiveAmbientOcclusion=!!t.ssaoEnabled&&this.parameters.receiveSSAO,this.techniqueConfig.vvColor=this.parameters.vvColorEnabled,this.techniqueConfig.textureAlphaPremultiplied=!!this.parameters.textureAlphaPremultiplied,this.techniqueConfig.usePBR=this.parameters.usePBR,this.techniqueConfig.hasMetalnessAndRoughnessTexture=!!this.parameters.metallicRoughnessTextureId,this.techniqueConfig.hasEmissionTexture=!!this.parameters.emissiveTextureId,this.techniqueConfig.hasOcclusionTexture=!!this.parameters.occlusionTextureId,this.techniqueConfig.offsetBackfaces=!(!this.parameters.transparent||!this.parameters.offsetTransparentBackfaces),this.techniqueConfig.isSchematic=this.parameters.usePBR&&this.parameters.isSchematic,this.techniqueConfig.transparencyPassType=t.transparencyPassType,this.techniqueConfig.enableOffset=t.camera.relativeElevation<Pe.ve),this.techniqueConfig}intersect(e,t,r,i,n,a,s){if(null!==this.parameters.verticalOffset){const e=i.camera;(0,c.s)(Jt,r[12],r[13],r[14]);let t=null;switch(i.viewingMode){case be.JY.Global:t=(0,c.n)(jt,Jt);break;case be.JY.Local:t=(0,c.g)(jt,$t)}let o=0;if(null!==this.parameters.verticalOffset){const r=(0,c.f)(Kt,Jt,e.eye),i=(0,c.l)(r),n=(0,c.a)(r,r,1/i);let a=null;this.parameters.screenSizePerspective&&(a=(0,c.d)(t,n)),o+=(0,ye.Hx)(e,i,this.parameters.verticalOffset,a,this.parameters.screenSizePerspective)}(0,c.a)(t,t,o),(0,c.t)(Xt,t,i.transform.inverseRotation),n=(0,c.f)(qt,n,Xt),a=(0,c.f)(kt,a,Xt)}(0,ye.Bw)(e,t,i,n,a,function(e){return(0,o.pC)(e)?(rt.offset=e,rt):null}(i.verticalOffset),s)}requiresSlot(e){return e===(this.parameters.transparent?this.parameters.writeDepth?Ne.r.TRANSPARENT_MATERIAL:Ne.r.TRANSPARENT_DEPTH_WRITE_DISABLED_MATERIAL:Ne.r.OPAQUE_MATERIAL)||e===Ne.r.DRAPED_MATERIAL}createGLMaterial(e){return e.output===Se.H.Color||e.output===Se.H.Alpha||e.output===Se.H.Depth||e.output===Se.H.Normal||e.output===Se.H.Shadow||e.output===Se.H.Highlight?new Gt(e):null}createBufferWriter(){return new Wt(this.vertexBufferLayout,this.instanceBufferLayout)}}class Gt extends class extends class{constructor(e){this._material=e.material,this._techniqueRep=e.techniqueRep,this._output=e.output}dispose(){this._techniqueRep.release(this._technique)}get technique(){return this._technique}ensureTechnique(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this._output;return this._technique=this._techniqueRep.releaseAndAcquire(e,this._material.getTechniqueConfig(r,t),this._technique),this._technique}ensureResources(e){return O.Rw.LOADED}}{constructor(e){super(e),this._numLoading=0,this._disposed=!1,this._textureRepository=e.textureRep,this._textureId=e.textureId,this._acquire(e.textureId,(e=>this._texture=e)),this._acquire(e.normalTextureId,(e=>this._textureNormal=e)),this._acquire(e.emissiveTextureId,(e=>this._textureEmissive=e)),this._acquire(e.occlusionTextureId,(e=>this._textureOcclusion=e)),this._acquire(e.metallicRoughnessTextureId,(e=>this._textureMetallicRoughness=e))}dispose(){this._texture=(0,o.RY)(this._texture),this._textureNormal=(0,o.RY)(this._textureNormal),this._textureEmissive=(0,o.RY)(this._textureEmissive),this._textureOcclusion=(0,o.RY)(this._textureOcclusion),this._textureMetallicRoughness=(0,o.RY)(this._textureMetallicRoughness),this._disposed=!0}ensureResources(e){return 0===this._numLoading?O.Rw.LOADED:O.Rw.LOADING}updateTexture(e){((0,o.Wi)(this._texture)||e!==this._texture.id)&&(this._texture=(0,o.RY)(this._texture),this._textureId=e,this._acquire(this._textureId,(e=>this._texture=e)))}bindTextures(e){(0,o.pC)(this._texture)&&e.bindTexture(this._texture.glTexture,"tex"),(0,o.pC)(this._textureNormal)&&e.bindTexture(this._textureNormal.glTexture,"normalTexture"),(0,o.pC)(this._textureEmissive)&&e.bindTexture(this._textureEmissive.glTexture,"texEmission"),(0,o.pC)(this._textureOcclusion)&&e.bindTexture(this._textureOcclusion.glTexture,"texOcclusion"),(0,o.pC)(this._textureMetallicRoughness)&&e.bindTexture(this._textureMetallicRoughness.glTexture,"texMetallicRoughness")}bindTextureScale(e){const t=(0,o.pC)(this._texture)?this._texture.glTexture:null;(0,o.pC)(t)&&t.descriptor.textureCoordinateScaleFactor?e.setUniform2fv("textureCoordinateScaleFactor",t.descriptor.textureCoordinateScaleFactor):e.setUniform2f("textureCoordinateScaleFactor",1,1)}_acquire(e,t){if((0,o.Wi)(e))return void t(null);const r=this._textureRepository.acquire(e);if((0,S.y8)(r))return++this._numLoading,void r.then((e=>{if(this._disposed)return(0,o.RY)(e),void t(null);t(e)})).finally((()=>--this._numLoading));t(r)}}{constructor(e){super({...e,...e.material.parameters})}updateParameters(e){const t=this._material.parameters;return this.updateTexture(t.textureId),this.ensureTechnique(t.treeRendering?zt:Dt,e)}_updateShadowState(e){e.shadowMappingEnabled!==this._material.parameters.shadowMappingEnabled&&this._material.setParameters({shadowMappingEnabled:e.shadowMappingEnabled})}_updateOccludeeState(e){e.hasOccludees!==this._material.parameters.sceneHasOcludees&&this._material.setParameters({sceneHasOcludees:e.hasOccludees})}beginSlot(e){return this._output!==Se.H.Color&&this._output!==Se.H.Alpha||(this._updateShadowState(e),this._updateOccludeeState(e)),this.updateParameters(e)}bind(e,t){t.bindPass(this._material.parameters,e),this.bindTextures(t.program)}}const Vt={textureId:void 0,initTextureTransparent:!1,isSchematic:!1,usePBR:!1,normalTextureId:void 0,vertexTangents:!1,occlusionTextureId:void 0,emissiveTextureId:void 0,metallicRoughnessTextureId:void 0,emissiveFactor:[0,0,0],mrrFactors:[0,1,.5],ambient:[.2,.2,.2],diffuse:[.8,.8,.8],externalColor:[1,1,1,1],colorMixMode:"multiply",opacity:1,layerOpacity:1,vertexColors:!1,symbolColors:!1,doubleSided:!1,doubleSidedType:"normal",cullFace:O.Vr.Back,instanced:void 0,instancedDoublePrecision:!1,normals:"default",receiveSSAO:!0,fillLightsEnabled:!0,receiveShadows:!0,castShadows:!0,shadowMappingEnabled:!1,verticalOffset:null,screenSizePerspective:null,slicePlaneEnabled:!1,sliceHighlightDisabled:!1,offsetTransparentBackfaces:!1,vvSizeEnabled:!1,vvSizeMinSize:[1,1,1],vvSizeMaxSize:[100,100,100],vvSizeOffset:[0,0,0],vvSizeFactor:[1,1,1],vvSizeValue:[1,1,1],vvColorEnabled:!1,vvColorValues:[0,0,0,0,0,0,0,0],vvColorColors:[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],vvSymbolAnchor:[0,0,0],vvSymbolRotationMatrix:(0,a.c)(),modelTransformation:null,transparent:!1,writeDepth:!0,customDepthTest:O.Gv.Less,textureAlphaMode:O.JJ.Blend,textureAlphaCutoff:Me.F,textureAlphaPremultiplied:!1,sceneHasOcludees:!1,...we};class Wt{constructor(e,t){this.vertexBufferLayout=e,this.instanceBufferLayout=t}allocate(e){return this.vertexBufferLayout.createBuffer(e)}elementCount(e){return e.indices.get(D.T.POSITION).length}write(e,t,r,i){!function(e,t,r,i,o,n){for(const a of t.fieldNames){const t=e.vertexAttributes.get(a),s=e.indices.get(a);if(t&&s)switch(a){case D.T.POSITION:{(0,E.hu)(3===t.size);const e=o.getField(a,h.ct);e&&st(s,t.data,r,e,n);break}case D.T.NORMAL:{(0,E.hu)(3===t.size);const e=o.getField(a,h.ct);e&&lt(s,t.data,i,e,n);break}case D.T.UV0:{(0,E.hu)(2===t.size);const e=o.getField(a,h.Eu);e&&ot(s,t.data,e,n);break}case D.T.COLOR:{(0,E.hu)(3===t.size||4===t.size);const e=o.getField(a,h.mc);e&&dt(s,t.data,t.size,e,n);break}case D.T.SYMBOLCOLOR:{(0,E.hu)(3===t.size||4===t.size);const e=o.getField(a,h.mc);e&&dt(s,t.data,t.size,e,n);break}case D.T.TANGENT:{(0,E.hu)(4===t.size);const e=o.getField(a,h.ek);e&&ct(s,t.data,i,e,n);break}}}}(t,this.vertexBufferLayout,e.transformation,e.invTranspTransformation,r,i)}}const qt=(0,d.c)(),kt=(0,d.c)(),$t=(0,d.f)(0,0,1),jt=(0,d.c)(),Xt=(0,d.c)(),Jt=(0,d.c)(),Kt=(0,d.c)(),Yt=A.Z.getLogger("esri.views.3d.layers.graphics.objectResourceUtils");async function Zt(e,t){const r=await async function(e,t){const r=(0,o.pC)(t)&&t.streamDataRequester;if(r)return async function(e,t,r){const i=await(0,_.q6)(t.request(e,"json",r));if(!0===i.ok)return i.value;(0,S.r9)(i.error),Qt(i.error.details.url)}(e,r,t);const i=await(0,_.q6)((0,T.default)(e,(0,o.Wg)(t)));if(!0===i.ok)return i.value.data;(0,S.r9)(i.error),Qt(i.error)}(e,t);return{resource:r,textures:await rr(r.textureDefinitions,t)}}function Qt(e){throw new b.Z("",`Request for object resource failed: ${e}`)}function er(e){const t=e.params,r=t.topology;let i=!0;switch(t.vertexAttributes||(Yt.warn("Geometry must specify vertex attributes"),i=!1),t.topology){case"PerAttributeArray":break;case"Indexed":case null:case void 0:{const e=t.faces;if(e){if(t.vertexAttributes)for(const r in t.vertexAttributes){const t=e[r];t&&t.values?(null!=t.valueType&&"UInt32"!==t.valueType&&(Yt.warn(`Unsupported indexed geometry indices type '${t.valueType}', only UInt32 is currently supported`),i=!1),null!=t.valuesPerElement&&1!==t.valuesPerElement&&(Yt.warn(`Unsupported indexed geometry values per element '${t.valuesPerElement}', only 1 is currently supported`),i=!1)):(Yt.warn(`Indexed geometry does not specify face indices for '${r}' attribute`),i=!1)}}else Yt.warn("Indexed geometries must specify faces"),i=!1;break}default:Yt.warn(`Unsupported topology '${r}'`),i=!1}e.params.material||(Yt.warn("Geometry requires material"),i=!1);const o=e.params.vertexAttributes;for(const n in o)o[n].values||(Yt.warn("Geometries with externally defined attributes are not yet supported"),i=!1);return i}function tr(e){const t=(0,u.cS)();return e.forEach((e=>{const r=e.boundingInfo;(0,o.pC)(r)&&((0,u.pp)(t,r.getBBMin()),(0,u.pp)(t,r.getBBMax()))})),t}async function rr(e,t){const r=[];for(const a in e){const i=e[a],n=i.images[0].data;if(!n){Yt.warn("Externally referenced texture data is not yet supported");continue}const s=i.encoding+";base64,"+n,l="/textureDefinitions/"+a,c="rgba"===i.channels?i.alphaChannelUsage||"transparency":"none",d={noUnpackFlip:!0,wrap:{s:j.e8.REPEAT,t:j.e8.REPEAT},preMultiplyAlpha:ir(c)!==O.JJ.Opaque},u=(0,o.pC)(t)&&t.disableTextures?Promise.resolve(null):(0,M.t)(s,t);r.push(u.then((e=>({refId:l,image:e,params:d,alphaChannelUsage:c}))))}const i=await Promise.all(r),n={};for(const o of i)n[o.refId]=o;return n}function ir(e){switch(e){case"mask":return O.JJ.Mask;case"maskAndTransparency":return O.JJ.MaskBlend;case"none":return O.JJ.Opaque;default:return O.JJ.Blend}}function or(e){const t=e.params;return{id:1,material:t.material,texture:t.texture,region:t.texture}}const nr=new C.G(1,2,"wosr");var ar=r(68845),sr=r(19131),lr=r(69618),cr=r(92770);async function dr(e,t){const r=ur((0,i.pJ)(e));if("wosr"===r.fileType){const e=await(t.cache?t.cache.loadWOSR(r.url,t):Zt(r.url,t)),i=function(e,t){const r=[],i=[],n=[],a=[],s=e.resource,l=C.G.parse(s.version||"1.0","wosr");nr.validate(l);const c=s.model.name,u=s.model.geometries,h=s.materialDefinitions,m=e.textures;let f=0;const p=new Map;for(let v=0;v<u.length;v++){const e=u[v];if(!er(e))continue;const s=or(e),l=e.params.vertexAttributes,c=[];for(const t in l){const e=l[t],r=e.values;c.push([t,{data:r,size:e.valuesPerElement,exclusive:!0}])}const g=[];if("PerAttributeArray"!==e.params.topology){const t=e.params.faces;for(const e in t)g.push([e,new Uint32Array(t[e].values)])}const x=m&&m[s.texture];if(x&&!p.has(s.texture)){const{image:e,params:t}=x,r=new _e(e,t);a.push(r),p.set(s.texture,r)}const T=p.get(s.texture),_=T?T.id:void 0;let b=n[s.material]?n[s.material][s.texture]:null;if(!b){const e=h[s.material.substring(s.material.lastIndexOf("/")+1)].params;1===e.transparency&&(e.transparency=0);const r=x&&x.alphaChannelUsage,i=e.transparency>0||"transparency"===r||"maskAndTransparency"===r,a=x?ir(x.alphaChannelUsage):void 0,l={ambient:(0,d.d)(e.diffuse),diffuse:(0,d.d)(e.diffuse),opacity:1-(e.transparency||0),transparent:i,textureAlphaMode:a,textureAlphaCutoff:.33,textureId:_,initTextureTransparent:!0,doubleSided:!0,cullFace:O.Vr.None,colorMixMode:e.externalColorMixMode||"tint",textureAlphaPremultiplied:!!x&&!!x.params.preMultiplyAlpha};(0,o.pC)(t)&&t.materialParamsMixin&&Object.assign(l,t.materialParamsMixin),b=new Ut(l),n[s.material]||(n[s.material]={}),n[s.material][s.texture]=b}i.push(b);const A=new H(c,g);f+=g.position?g.position.length:0,r.push(A)}return{name:c,stageResources:{textures:a,materials:i,geometries:r},pivotOffset:s.model.pivotOffset,boundingBox:tr(r),numberOfVertices:f,lodThreshold:null}}(e,t);return{lods:[i],referenceBoundingBox:i.boundingBox,isEsriSymbolResource:!1,isWosr:!0,remove:e.remove}}const n=await(t.cache?t.cache.loadGLTF(r.url,t,t.usePBR):(0,g.z)(new v.C(t.streamDataRequester),r.url,t,t.usePBR)),a=(0,o.U2)(n.model.meta,"ESRI_proxyEllipsoid");n.meta.isEsriSymbolResource&&(0,o.pC)(a)&&-1!==n.meta.uri.indexOf("/RealisticTrees/")&&function(e,t){for(let r=0;r<e.model.lods.length;++r){const i=e.model.lods[r];e.customMeta.esriTreeRendering=!0;for(const n of i.parts){const i=n.attributes.normal;if((0,o.Wi)(i))return;const a=n.attributes.position,u=a.count,m=(0,d.c)(),f=(0,d.c)(),v=(0,d.c)(),g=(0,p.gS)(h.mc,u),x=(0,p.gS)(h.ct,u),T=(0,s.a)((0,l.c)(),n.transform);for(let o=0;o<u;o++){a.getVec(o,f),i.getVec(o,m),(0,c.m)(f,f,n.transform),(0,c.f)(v,f,t.center),(0,c.E)(v,v,t.radius);const s=v[2],l=(0,c.l)(v),d=Math.min(.45+.55*l*l,1);(0,c.E)(v,v,t.radius),(0,c.m)(v,v,T),(0,c.n)(v,v),r+1!==e.model.lods.length&&e.model.lods.length>1&&(0,c.e)(v,v,m,s>-1?.2:Math.min(-4*s-3.8,1)),x.setVec(o,v),g.set(o,0,255*d),g.set(o,1,255*d),g.set(o,2,255*d),g.set(o,3,255)}n.attributes.normal=x,n.attributes.color=g}}}(n,a);const u=n.meta.isEsriSymbolResource?{usePBR:t.usePBR,isSchematic:!1,treeRendering:n.customMeta.esriTreeRendering,mrrFactors:[0,1,.2]}:{usePBR:t.usePBR,isSchematic:!1,mrrFactors:[0,1,.5]},m={...t.materialParamsMixin,treeRendering:n.customMeta.esriTreeRendering};if(null!=r.specifiedLodIndex){const e=hr(n,u,m,r.specifiedLodIndex);let t=e[0].boundingBox;return 0!==r.specifiedLodIndex&&(t=hr(n,u,m,0)[0].boundingBox),{lods:e,referenceBoundingBox:t,isEsriSymbolResource:n.meta.isEsriSymbolResource,isWosr:!1,remove:n.remove}}const f=hr(n,u,m);return{lods:f,referenceBoundingBox:f[0].boundingBox,isEsriSymbolResource:n.meta.isEsriSymbolResource,isWosr:!1,remove:n.remove}}function ur(e){const t=e.match(/(.*\.(gltf|glb))(\?lod=([0-9]+))?$/);return t?{fileType:"gltf",url:t[1],specifiedLodIndex:null!=t[4]?Number(t[4]):null}:e.match(/(.*\.(json|json\.gz))$/)?{fileType:"wosr",url:e,specifiedLodIndex:null}:{fileType:"unknown",url:e,specifiedLodIndex:null}}function hr(e,t,r,i){const s=e.model,l=(0,a.c)(),c=new Array,d=new Map,v=new Map;return s.lods.forEach(((e,a)=>{if(void 0!==i&&a!==i)return;const g={name:e.name,stageResources:{textures:new Array,materials:new Array,geometries:new Array},lodThreshold:(0,o.pC)(e.lodThreshold)?e.lodThreshold:null,pivotOffset:[0,0,0],numberOfVertices:0,boundingBox:(0,u.cS)()};c.push(g),e.parts.forEach((e=>{const i=e.material+(e.attributes.normal?"_normal":"")+(e.attributes.color?"_color":"")+(e.attributes.texCoord0?"_texCoord0":"")+(e.attributes.tangent?"_tangent":""),a=s.materials.get(e.material),c=(0,o.pC)(e.attributes.texCoord0),T=(0,o.pC)(e.attributes.normal),_=function(e){switch(e){case"BLEND":return O.JJ.Blend;case"MASK":return O.JJ.Mask;case"OPAQUE":case null:case void 0:return O.JJ.Opaque}}(a.alphaMode);if(!d.has(i)){if(c){if((0,o.pC)(a.textureColor)&&!v.has(a.textureColor)){const e=s.textures.get(a.textureColor),t={...e.parameters,preMultiplyAlpha:_!==O.JJ.Opaque};v.set(a.textureColor,new _e(e.data,t))}if((0,o.pC)(a.textureNormal)&&!v.has(a.textureNormal)){const e=s.textures.get(a.textureNormal);v.set(a.textureNormal,new _e(e.data,e.parameters))}if((0,o.pC)(a.textureOcclusion)&&!v.has(a.textureOcclusion)){const e=s.textures.get(a.textureOcclusion);v.set(a.textureOcclusion,new _e(e.data,e.parameters))}if((0,o.pC)(a.textureEmissive)&&!v.has(a.textureEmissive)){const e=s.textures.get(a.textureEmissive);v.set(a.textureEmissive,new _e(e.data,e.parameters))}if((0,o.pC)(a.textureMetallicRoughness)&&!v.has(a.textureMetallicRoughness)){const e=s.textures.get(a.textureMetallicRoughness);v.set(a.textureMetallicRoughness,new _e(e.data,e.parameters))}}const n=a.color[0]**(1/ar.K),l=a.color[1]**(1/ar.K),u=a.color[2]**(1/ar.K),h=a.emissiveFactor[0]**(1/ar.K),m=a.emissiveFactor[1]**(1/ar.K),f=a.emissiveFactor[2]**(1/ar.K),p=(0,o.pC)(a.textureColor)&&c?v.get(a.textureColor):null;d.set(i,new Ut({...t,transparent:_===O.JJ.Blend,customDepthTest:O.Gv.Lequal,textureAlphaMode:_,textureAlphaCutoff:a.alphaCutoff,diffuse:[n,l,u],ambient:[n,l,u],opacity:a.opacity,doubleSided:a.doubleSided,doubleSidedType:"winding-order",cullFace:a.doubleSided?O.Vr.None:O.Vr.Back,vertexColors:!!e.attributes.color,vertexTangents:!!e.attributes.tangent,normals:T?"default":"screenDerivative",castShadows:!0,receiveSSAO:!0,fillLightsEnabled:!0,textureId:(0,o.pC)(p)?p.id:void 0,colorMixMode:a.colorMixMode,normalTextureId:(0,o.pC)(a.textureNormal)&&c?v.get(a.textureNormal).id:void 0,textureAlphaPremultiplied:(0,o.pC)(p)&&!!p.params.preMultiplyAlpha,occlusionTextureId:(0,o.pC)(a.textureOcclusion)&&c?v.get(a.textureOcclusion).id:void 0,emissiveTextureId:(0,o.pC)(a.textureEmissive)&&c?v.get(a.textureEmissive).id:void 0,metallicRoughnessTextureId:(0,o.pC)(a.textureMetallicRoughness)&&c?v.get(a.textureMetallicRoughness).id:void 0,emissiveFactor:[h,m,f],mrrFactors:[a.metallicFactor,a.roughnessFactor,t.mrrFactors[2]],isSchematic:!1,...r}))}const b=function(e,t){switch(t){case j.MX.TRIANGLES:return(0,x.nh)(e);case j.MX.TRIANGLE_STRIP:return(0,x.DA)(e);case j.MX.TRIANGLE_FAN:return(0,x.jX)(e)}}(e.indices||e.attributes.position.count,e.primitiveType),A=e.attributes.position.count,S=(0,p.gS)(h.ct,A);(0,m.t)(S,e.attributes.position,e.transform);const C=[[D.T.POSITION,{data:S.typedBuffer,size:S.elementCount,exclusive:!0}]],M=[[D.T.POSITION,b]];if((0,o.pC)(e.attributes.normal)){const t=(0,p.gS)(h.ct,A);(0,n.a)(l,e.transform),(0,m.a)(t,e.attributes.normal,l),C.push([D.T.NORMAL,{data:t.typedBuffer,size:t.elementCount,exclusive:!0}]),M.push([D.T.NORMAL,b])}if((0,o.pC)(e.attributes.tangent)){const t=(0,p.gS)(h.ek,A);(0,n.a)(l,e.transform),(0,f.t)(t,e.attributes.tangent,l),C.push([D.T.TANGENT,{data:t.typedBuffer,size:t.elementCount,exclusive:!0}]),M.push([D.T.TANGENT,b])}if((0,o.pC)(e.attributes.texCoord0)){const t=(0,p.gS)(h.Eu,A);(0,sr.n)(t,e.attributes.texCoord0),C.push([D.T.UV0,{data:t.typedBuffer,size:t.elementCount,exclusive:!0}]),M.push([D.T.UV0,b])}if((0,o.pC)(e.attributes.color)){const t=(0,p.gS)(h.mc,A);if(4===e.attributes.color.elementCount)e.attributes.color instanceof h.ek?(0,f.s)(t,e.attributes.color,255):e.attributes.color instanceof h.mc?(0,lr.c)(t,e.attributes.color):e.attributes.color instanceof h.v6&&(0,f.s)(t,e.attributes.color,1/256);else{(0,lr.f)(t,255,255,255,255);const r=new h.ne(t.buffer,0,4);e.attributes.color instanceof h.ct?(0,m.s)(r,e.attributes.color,255):e.attributes.color instanceof h.ne?(0,cr.c)(r,e.attributes.color):e.attributes.color instanceof h.mw&&(0,m.s)(r,e.attributes.color,1/256)}C.push([D.T.COLOR,{data:t.typedBuffer,size:t.elementCount,exclusive:!0}]),M.push([D.T.COLOR,b])}const y=new H(C,M);g.stageResources.geometries.push(y),g.stageResources.materials.push(d.get(i)),c&&((0,o.pC)(a.textureColor)&&g.stageResources.textures.push(v.get(a.textureColor)),(0,o.pC)(a.textureNormal)&&g.stageResources.textures.push(v.get(a.textureNormal)),(0,o.pC)(a.textureOcclusion)&&g.stageResources.textures.push(v.get(a.textureOcclusion)),(0,o.pC)(a.textureEmissive)&&g.stageResources.textures.push(v.get(a.textureEmissive)),(0,o.pC)(a.textureMetallicRoughness)&&g.stageResources.textures.push(v.get(a.textureMetallicRoughness))),g.numberOfVertices+=A;const E=y.boundingInfo;(0,o.pC)(E)&&((0,u.pp)(g.boundingBox,E.getBBMin()),(0,u.pp)(g.boundingBox,E.getBBMax()))}))})),c}},49420:(e,t,r)=>{r.d(t,{a9:()=>i});var i;r(16889);!function(e){e[e.Multiply=1]="Multiply",e[e.Ignore=2]="Ignore",e[e.Replace=3]="Replace",e[e.Tint=4]="Tint"}(i||(i={}))},55158:(e,t,r)=>{r.d(t,{U$:()=>s});var i=r(25158),o=r(48734);class n{constructor(e,t){this.layout=e,this.buffer="number"==typeof t?new ArrayBuffer(t*e.stride):t;for(const r of e.fieldNames){const t=e.fields.get(r);this[r]=new t.constructor(this.buffer,t.offset,this.stride)}}get stride(){return this.layout.stride}get count(){return this.buffer.byteLength/this.stride}get byteLength(){return this.buffer.byteLength}getField(e,t){const r=this[e];return r&&r.elementCount===t.ElementCount&&r.elementType===t.ElementType?r:null}slice(e,t){return new n(this.layout,this.buffer.slice(e*this.stride,t*this.stride))}copyFrom(e,t,r,i){const o=this.stride;if(o%4==0){const n=new Uint32Array(e.buffer,t*o,i*o/4);new Uint32Array(this.buffer,r*o,i*o/4).set(n)}else{const n=new Uint8Array(e.buffer,t*o,i*o);new Uint8Array(this.buffer,r*o,i*o).set(n)}}}class a{constructor(){this.stride=0,this.fields=new Map,this.fieldNames=[]}vec2f(e,t){return this._appendField(e,i.Eu,t),this}vec2f64(e,t){return this._appendField(e,i.q6,t),this}vec3f(e,t){return this._appendField(e,i.ct,t),this}vec3f64(e,t){return this._appendField(e,i.fP,t),this}vec4f(e,t){return this._appendField(e,i.ek,t),this}vec4f64(e,t){return this._appendField(e,i.Cd,t),this}mat3f(e,t){return this._appendField(e,i.gK,t),this}mat3f64(e,t){return this._appendField(e,i.ey,t),this}mat4f(e,t){return this._appendField(e,i.bj,t),this}mat4f64(e,t){return this._appendField(e,i.O1,t),this}vec4u8(e,t){return this._appendField(e,i.mc,t),this}f32(e,t){return this._appendField(e,i.ly,t),this}f64(e,t){return this._appendField(e,i.oS,t),this}u8(e,t){return this._appendField(e,i.D_,t),this}u16(e,t){return this._appendField(e,i.av,t),this}i8(e,t){return this._appendField(e,i.Hz,t),this}vec2i8(e,t){return this._appendField(e,i.Vs,t),this}vec2i16(e,t){return this._appendField(e,i.or,t),this}vec2u8(e,t){return this._appendField(e,i.xA,t),this}vec4u16(e,t){return this._appendField(e,i.v6,t),this}u32(e,t){return this._appendField(e,i.Nu,t),this}_appendField(e,t,r){const i=t.ElementCount*(0,o.n1)(t.ElementType),n=this.stride;this.fields.set(e,{size:i,constructor:t,offset:n,optional:r}),this.stride+=i,this.fieldNames.push(e)}alignTo(e){return this.stride=Math.floor((this.stride+e-1)/e)*e,this}hasField(e){return this.fieldNames.indexOf(e)>=0}createBuffer(e){return new n(this,e)}createView(e){return new n(this,e)}clone(){const e=new a;return e.stride=this.stride,e.fields=new Map,this.fields.forEach(((t,r)=>e.fields.set(r,t))),e.fieldNames=this.fieldNames.slice(),e.BufferType=this.BufferType,e}}function s(){return new a}},22357:(e,t,r)=>{r.d(t,{q:()=>n});var i=r(71011),o=r(98634);function n(e,t){t.output===i.H.Color&&t.receiveShadows?(e.varyings.add("linearDepth","float"),e.vertex.code.add(o.H`void forwardLinearDepth() { linearDepth = gl_Position.w; }`)):t.output===i.H.Depth||t.output===i.H.Shadow?(e.varyings.add("linearDepth","float"),e.vertex.uniforms.add("nearFar","vec2"),e.vertex.code.add(o.H`void forwardLinearDepth() {
linearDepth = (-position_view().z - nearFar[0]) / (nearFar[1] - nearFar[0]);
}`)):e.vertex.code.add(o.H`void forwardLinearDepth() {}`)}},83734:(e,t,r)=>{r.d(t,{w:()=>o});var i=r(98634);function o(e){e.vertex.code.add(i.H`vec4 offsetBackfacingClipPosition(vec4 posClip, vec3 posWorld, vec3 normalWorld, vec3 camPosWorld) {
vec3 camToVert = posWorld - camPosWorld;
bool isBackface = dot(camToVert, normalWorld) > 0.0;
if (isBackface) {
posClip.z += 0.0000003 * posClip.w;
}
return posClip;
}`)}},71011:(e,t,r)=>{var i;r.d(t,{H:()=>i}),function(e){e[e.Color=0]="Color",e[e.Depth=1]="Depth",e[e.Normal=2]="Normal",e[e.Shadow=3]="Shadow",e[e.Highlight=4]="Highlight",e[e.Draped=5]="Draped",e[e.Occlusion=6]="Occlusion",e[e.Alpha=7]="Alpha",e[e.COUNT=8]="COUNT"}(i||(i={}))},33280:(e,t,r)=>{r.d(t,{Vv:()=>d,p2:()=>c});var i=r(92026),o=r(14226),n=r(81949),a=r(11186),s=r(71353),l=r(98634);function c(e,t){if(t.slicePlaneEnabled){e.extensions.add("GL_OES_standard_derivatives"),t.sliceEnabledForVertexPrograms&&(e.vertex.uniforms.add("slicePlaneOrigin","vec3"),e.vertex.uniforms.add("slicePlaneBasis1","vec3"),e.vertex.uniforms.add("slicePlaneBasis2","vec3")),e.fragment.uniforms.add("slicePlaneOrigin","vec3"),e.fragment.uniforms.add("slicePlaneBasis1","vec3"),e.fragment.uniforms.add("slicePlaneBasis2","vec3");const r=l.H`struct SliceFactors {
float front;
float side0;
float side1;
float side2;
float side3;
};
SliceFactors calculateSliceFactors(vec3 pos) {
vec3 rel = pos - slicePlaneOrigin;
vec3 slicePlaneNormal = -cross(slicePlaneBasis1, slicePlaneBasis2);
float slicePlaneW = -dot(slicePlaneNormal, slicePlaneOrigin);
float basis1Len2 = dot(slicePlaneBasis1, slicePlaneBasis1);
float basis2Len2 = dot(slicePlaneBasis2, slicePlaneBasis2);
float basis1Dot = dot(slicePlaneBasis1, rel);
float basis2Dot = dot(slicePlaneBasis2, rel);
return SliceFactors(
dot(slicePlaneNormal, pos) + slicePlaneW,
-basis1Dot - basis1Len2,
basis1Dot - basis1Len2,
-basis2Dot - basis2Len2,
basis2Dot - basis2Len2
);
}
bool sliceByFactors(SliceFactors factors) {
return factors.front < 0.0
&& factors.side0 < 0.0
&& factors.side1 < 0.0
&& factors.side2 < 0.0
&& factors.side3 < 0.0;
}
bool sliceEnabled() {
return dot(slicePlaneBasis1, slicePlaneBasis1) != 0.0;
}
bool sliceByPlane(vec3 pos) {
return sliceEnabled() && sliceByFactors(calculateSliceFactors(pos));
}
#define rejectBySlice(_pos_) sliceByPlane(_pos_)
#define discardBySlice(_pos_) { if (sliceByPlane(_pos_)) discard; }`,i=l.H`vec4 applySliceHighlight(vec4 color, vec3 pos) {
SliceFactors factors = calculateSliceFactors(pos);
const float HIGHLIGHT_WIDTH = 1.0;
const vec4 HIGHLIGHT_COLOR = vec4(0.0, 0.0, 0.0, 0.3);
factors.front /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.front);
factors.side0 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side0);
factors.side1 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side1);
factors.side2 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side2);
factors.side3 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side3);
if (sliceByFactors(factors)) {
return color;
}
float highlightFactor = (1.0 - step(0.5, factors.front))
* (1.0 - step(0.5, factors.side0))
* (1.0 - step(0.5, factors.side1))
* (1.0 - step(0.5, factors.side2))
* (1.0 - step(0.5, factors.side3));
return mix(color, vec4(HIGHLIGHT_COLOR.rgb, color.a), highlightFactor * HIGHLIGHT_COLOR.a);
}`,o=t.sliceHighlightDisabled?l.H`#define highlightSlice(_color_, _pos_) (_color_)`:l.H`
        ${i}
        #define highlightSlice(_color_, _pos_) (sliceEnabled() ? applySliceHighlight(_color_, _pos_) : (_color_))
      `;t.sliceEnabledForVertexPrograms&&e.vertex.code.add(r),e.fragment.code.add(r),e.fragment.code.add(o)}else{const r=l.H`#define rejectBySlice(_pos_) false
#define discardBySlice(_pos_) {}
#define highlightSlice(_color_, _pos_) (_color_)`;t.sliceEnabledForVertexPrograms&&e.vertex.code.add(r),e.fragment.code.add(r)}}function d(e,t,r,n){if(t.slicePlaneEnabled)if((0,i.pC)(r)){if((0,a.g)(u,r.origin),(0,a.g)(h,r.basis1),(0,a.g)(m,r.basis2),(0,i.pC)(n)&&(0,i.pC)(n.origin)&&(0,a.f)(u,r.origin,n.origin),(0,i.pC)(n)&&(0,i.pC)(n.view)){const e=(0,i.pC)(n.origin)?(0,o.j)(f,n.view,n.origin):n.view;(0,a.b)(h,h,u),(0,a.b)(m,m,u),(0,a.m)(u,u,e),(0,a.m)(h,h,e),(0,a.m)(m,m,e),(0,a.f)(h,h,u),(0,a.f)(m,m,u)}e.setUniform3fv("slicePlaneOrigin",u),e.setUniform3fv("slicePlaneBasis1",h),e.setUniform3fv("slicePlaneBasis2",m)}else e.setUniform3fv("slicePlaneBasis1",s.Z),e.setUniform3fv("slicePlaneBasis2",s.Z),e.setUniform3fv("slicePlaneOrigin",s.Z)}const u=(0,s.c)(),h=(0,s.c)(),m=(0,s.c)(),f=(0,n.c)()},94951:(e,t,r)=>{r.d(t,{w:()=>o});var i=r(98634);function o(e,t){const r={hasModelTransformation:!1,...t};if(r.hasModelTransformation)return r.linearDepth?void e.vertex.code.add(i.H`vec4 transformPositionWithDepth(mat4 proj, mat4 view, mat4 model, vec3 pos, vec2 nearFar, out float depth) {
vec4 eye = view * (model * vec4(pos, 1.0));
depth = (-eye.z - nearFar[0]) / (nearFar[1] - nearFar[0]) ;
return proj * eye;
}`):void e.vertex.code.add(i.H`vec4 transformPosition(mat4 proj, mat4 view, mat4 model, vec3 pos) {
return proj * (view * (model * vec4(pos, 1.0)));
}`);r.linearDepth?e.vertex.code.add(i.H`vec4 transformPositionWithDepth(mat4 proj, mat4 view, vec3 pos, vec2 nearFar, out float depth) {
vec4 eye = view * vec4(pos, 1.0);
depth = (-eye.z - nearFar[0]) / (nearFar[1] - nearFar[0]) ;
return proj * eye;
}`):e.vertex.code.add(i.H`vec4 transformPosition(mat4 proj, mat4 view, vec3 pos) {
return proj * (view * vec4(pos, 1.0));
}`)}},81221:(e,t,r)=>{r.d(t,{d3:()=>d,fQ:()=>c});var i=r(71353),o=r(71011),n=r(27254),a=r(98634),s=r(4760),l=r(43411);function c(e,t){t.instanced&&t.instancedDoublePrecision&&(e.attributes.add(s.T.MODELORIGINHI,"vec3"),e.attributes.add(s.T.MODELORIGINLO,"vec3"),e.attributes.add(s.T.MODEL,"mat3"),e.attributes.add(s.T.MODELNORMAL,"mat3")),t.instancedDoublePrecision&&(e.vertex.include(n.$,t),e.vertex.uniforms.add("viewOriginHi","vec3"),e.vertex.uniforms.add("viewOriginLo","vec3"));const r=[a.H`
    vec3 calculateVPos() {
      ${t.instancedDoublePrecision?"return model * localPosition().xyz;":"return localPosition().xyz;"}
    }
    `,a.H`
    vec3 subtractOrigin(vec3 _pos) {
      ${t.instancedDoublePrecision?a.H`
          vec3 originDelta = dpAdd(viewOriginHi, viewOriginLo, -modelOriginHi, -modelOriginLo);
          return _pos - originDelta;`:"return vpos;"}
    }
    `,a.H`
    vec3 dpNormal(vec4 _normal) {
      ${t.instancedDoublePrecision?"return normalize(modelNormal * _normal.xyz);":"return normalize(_normal.xyz);"}
    }
    `,a.H`
    vec3 dpNormalView(vec4 _normal) {
      ${t.instancedDoublePrecision?"return normalize((viewNormal * vec4(modelNormal * _normal.xyz, 1.0)).xyz);":"return normalize((viewNormal * _normal).xyz);"}
    }
    `,t.vertexTangents?a.H`
    vec4 dpTransformVertexTangent(vec4 _tangent) {
      ${t.instancedDoublePrecision?"return vec4(modelNormal * _tangent.xyz, _tangent.w);":"return _tangent;"}

    }
    `:a.H``];e.vertex.code.add(r[0]),e.vertex.code.add(r[1]),e.vertex.code.add(r[2]),t.output===o.H.Normal&&e.vertex.code.add(r[3]),e.vertex.code.add(r[4])}function d(e,t){(0,l.po)(t,u,h,3),e.setUniform3fv("viewOriginHi",u),e.setUniform3fv("viewOriginLo",h)}const u=(0,i.c)(),h=(0,i.c)()},73782:(e,t,r)=>{r.d(t,{O:()=>s,h:()=>n});var i=r(98634);function o(e){const t=i.H`vec3 decodeNormal(vec2 f) {
float z = 1.0 - abs(f.x) - abs(f.y);
return vec3(f + sign(f) * min(z, 0.0), z);
}`;e.fragment.code.add(t),e.vertex.code.add(t)}var n,a=r(4760);function s(e,t){t.normalType===n.Attribute&&(e.attributes.add(a.T.NORMAL,"vec3"),e.vertex.code.add(i.H`vec3 normalModel() {
return normal;
}`)),t.normalType===n.CompressedAttribute&&(e.include(o),e.attributes.add(a.T.NORMALCOMPRESSED,"vec2"),e.vertex.code.add(i.H`vec3 normalModel() {
return decodeNormal(normalCompressed);
}`)),t.normalType===n.ScreenDerivative&&(e.extensions.add("GL_OES_standard_derivatives"),e.fragment.code.add(i.H`vec3 screenDerivativeNormal(vec3 positionView) {
return normalize(cross(dFdx(positionView), dFdy(positionView)));
}`))}!function(e){e[e.Attribute=0]="Attribute",e[e.CompressedAttribute=1]="CompressedAttribute",e[e.Ground=2]="Ground",e[e.ScreenDerivative=3]="ScreenDerivative",e[e.COUNT=4]="COUNT"}(n||(n={}))},52276:(e,t,r)=>{r.d(t,{f:()=>n});var i=r(98634),o=r(4760);function n(e){e.attributes.add(o.T.POSITION,"vec3"),e.vertex.code.add(i.H`vec3 positionModel() { return position; }`)}},53230:(e,t,r)=>{r.d(t,{R:()=>s});var i=r(49420),o=r(98634);function n(e){e.vertex.code.add(o.H`
    vec4 decodeSymbolColor(vec4 symbolColor, out int colorMixMode) {
      float symbolAlpha = 0.0;

      const float maxTint = 85.0;
      const float maxReplace = 170.0;
      const float scaleAlpha = 3.0;

      if (symbolColor.a > maxReplace) {
        colorMixMode = ${o.H.int(i.a9.Multiply)};
        symbolAlpha = scaleAlpha * (symbolColor.a - maxReplace);
      } else if (symbolColor.a > maxTint) {
        colorMixMode = ${o.H.int(i.a9.Replace)};
        symbolAlpha = scaleAlpha * (symbolColor.a - maxTint);
      } else if (symbolColor.a > 0.0) {
        colorMixMode = ${o.H.int(i.a9.Tint)};
        symbolAlpha = scaleAlpha * symbolColor.a;
      } else {
        colorMixMode = ${o.H.int(i.a9.Multiply)};
        symbolAlpha = 0.0;
      }

      return vec4(symbolColor.r, symbolColor.g, symbolColor.b, symbolAlpha);
    }
  `)}var a=r(4760);function s(e,t){t.symbolColor?(e.include(n),e.attributes.add(a.T.SYMBOLCOLOR,"vec4"),e.varyings.add("colorMixMode","mediump float")):e.fragment.uniforms.add("colorMixMode","int"),t.symbolColor?e.vertex.code.add(o.H`int symbolColorMixMode;
vec4 getSymbolColor() {
return decodeSymbolColor(symbolColor, symbolColorMixMode) * 0.003921568627451;
}
void forwardColorMixMode() {
colorMixMode = float(symbolColorMixMode) + 0.5;
}`):e.vertex.code.add(o.H`vec4 getSymbolColor() { return vec4(1.0); }
void forwardColorMixMode() {}`)}},60113:(e,t,r)=>{r.d(t,{D:()=>a,N:()=>i});var i,o=r(98634),n=r(4760);function a(e,t){t.attributeTextureCoordinates===i.Default&&(e.attributes.add(n.T.UV0,"vec2"),e.varyings.add("vuv0","vec2"),e.vertex.code.add(o.H`void forwardTextureCoordinates() {
vuv0 = uv0;
}`)),t.attributeTextureCoordinates===i.Atlas&&(e.attributes.add(n.T.UV0,"vec2"),e.varyings.add("vuv0","vec2"),e.attributes.add(n.T.UVREGION,"vec4"),e.varyings.add("vuvRegion","vec4"),e.vertex.code.add(o.H`void forwardTextureCoordinates() {
vuv0 = uv0;
vuvRegion = uvRegion;
}`)),t.attributeTextureCoordinates===i.None&&e.vertex.code.add(o.H`void forwardTextureCoordinates() {}`)}!function(e){e[e.None=0]="None",e[e.Default=1]="Default",e[e.Atlas=2]="Atlas",e[e.COUNT=3]="COUNT"}(i||(i={}))},48655:(e,t,r)=>{r.d(t,{c:()=>n});var i=r(98634),o=r(4760);function n(e,t){t.attributeColor?(e.attributes.add(o.T.COLOR,"vec4"),e.varyings.add("vColor","vec4"),e.vertex.code.add(i.H`void forwardVertexColor() { vColor = color; }`),e.vertex.code.add(i.H`void forwardNormalizedVertexColor() { vColor = color * 0.003921568627451; }`)):e.vertex.code.add(i.H`void forwardVertexColor() {}
void forwardNormalizedVertexColor() {}`)}},28719:(e,t,r)=>{r.d(t,{B:()=>c});var i=r(50951),o=r(73782),n=(r(11873),r(81949),r(71353),r(52276)),a=r(27254),s=r(98634);function l(e,t){e.include(n.f),e.vertex.include(a.$,t),e.varyings.add("vPositionWorldCameraRelative","vec3"),e.varyings.add("vPosition_view","vec3"),e.vertex.uniforms.add("transformWorldFromModelRS","mat3"),e.vertex.uniforms.add("transformWorldFromModelTH","vec3"),e.vertex.uniforms.add("transformWorldFromModelTL","vec3"),e.vertex.uniforms.add("transformWorldFromViewTH","vec3"),e.vertex.uniforms.add("transformWorldFromViewTL","vec3"),e.vertex.uniforms.add("transformViewFromCameraRelativeRS","mat3"),e.vertex.uniforms.add("transformProjFromView","mat4"),e.vertex.code.add(s.H`vec3 positionWorldCameraRelative() {
vec3 rotatedModelPosition = transformWorldFromModelRS * positionModel();
vec3 transform_CameraRelativeFromModel = dpAdd(
transformWorldFromModelTL,
transformWorldFromModelTH,
-transformWorldFromViewTL,
-transformWorldFromViewTH
);
return transform_CameraRelativeFromModel + rotatedModelPosition;
}
vec3 position_view() {
return transformViewFromCameraRelativeRS * positionWorldCameraRelative();
}
void forwardPosition() {
vPositionWorldCameraRelative = positionWorldCameraRelative();
vPosition_view = position_view();
gl_Position = transformProjFromView * vec4(vPosition_view, 1.0);
}
vec3 positionWorld() {
return transformWorldFromViewTL + vPositionWorldCameraRelative;
}`),e.fragment.uniforms.add("transformWorldFromViewTL","vec3"),e.fragment.code.add(s.H`vec3 positionWorld() {
return transformWorldFromViewTL + vPositionWorldCameraRelative;
}`)}function c(e,t){t.normalType===o.h.Attribute||t.normalType===o.h.CompressedAttribute?(e.include(o.O,t),e.varyings.add("vNormalWorld","vec3"),e.varyings.add("vNormalView","vec3"),e.vertex.uniforms.add("transformNormalGlobalFromModel","mat3"),e.vertex.uniforms.add("transformNormalViewFromGlobal","mat3"),e.vertex.code.add(s.H`void forwardNormal() {
vNormalWorld = transformNormalGlobalFromModel * normalModel();
vNormalView = transformNormalViewFromGlobal * vNormalWorld;
}`)):t.normalType===o.h.Ground?(e.include(l,t),e.varyings.add("vNormalWorld","vec3"),e.vertex.code.add(s.H`
    void forwardNormal() {
      vNormalWorld = ${t.viewingMode===i.JY.Global?s.H`normalize(vPositionWorldCameraRelative);`:s.H`vec3(0.0, 0.0, 1.0);`}
    }
    `)):e.vertex.code.add(s.H`void forwardNormal() {}`)}},27284:(e,t,r)=>{r.d(t,{i:()=>a});var i=r(60113),o=r(98634);function n(e){e.extensions.add("GL_EXT_shader_texture_lod"),e.extensions.add("GL_OES_standard_derivatives"),e.fragment.code.add(o.H`#ifndef GL_EXT_shader_texture_lod
float calcMipMapLevel(const vec2 ddx, const vec2 ddy) {
float deltaMaxSqr = max(dot(ddx, ddx), dot(ddy, ddy));
return max(0.0, 0.5 * log2(deltaMaxSqr));
}
#endif
vec4 textureAtlasLookup(sampler2D texture, vec2 textureSize, vec2 textureCoordinates, vec4 atlasRegion) {
vec2 atlasScale = atlasRegion.zw - atlasRegion.xy;
vec2 uvAtlas = fract(textureCoordinates) * atlasScale + atlasRegion.xy;
float maxdUV = 0.125;
vec2 dUVdx = clamp(dFdx(textureCoordinates), -maxdUV, maxdUV) * atlasScale;
vec2 dUVdy = clamp(dFdy(textureCoordinates), -maxdUV, maxdUV) * atlasScale;
#ifdef GL_EXT_shader_texture_lod
return texture2DGradEXT(texture, uvAtlas, dUVdx, dUVdy);
#else
vec2 dUVdxAuto = dFdx(uvAtlas);
vec2 dUVdyAuto = dFdy(uvAtlas);
float mipMapLevel = calcMipMapLevel(dUVdx * textureSize, dUVdy * textureSize);
float autoMipMapLevel = calcMipMapLevel(dUVdxAuto * textureSize, dUVdyAuto * textureSize);
return texture2D(texture, uvAtlas, mipMapLevel - autoMipMapLevel);
#endif
}`)}function a(e,t){e.include(i.D,t),e.fragment.code.add(o.H`
  struct TextureLookupParameter {
    vec2 uv;
    ${t.supportsTextureAtlas?"vec2 size;":""}
  } vtc;
  `),t.attributeTextureCoordinates===i.N.Default&&e.fragment.code.add(o.H`vec4 textureLookup(sampler2D tex, TextureLookupParameter params) {
return texture2D(tex, params.uv);
}`),t.attributeTextureCoordinates===i.N.Atlas&&(e.include(n),e.fragment.code.add(o.H`vec4 textureLookup(sampler2D tex, TextureLookupParameter params) {
return textureAtlasLookup(tex, params.size, params.uv, vuvRegion);
}`))}},71410:(e,t,r)=>{r.d(t,{LC:()=>a,Mo:()=>s});var i=r(50951),o=r(98634);r(45639);function n(e){e.vertex.code.add(o.H`float screenSizePerspectiveMinSize(float size, vec4 factor) {
float nonZeroSize = 1.0 - step(size, 0.0);
return (
factor.z * (
1.0 +
nonZeroSize *
2.0 * factor.w / (
size + (1.0 - nonZeroSize)
)
)
);
}`),e.vertex.code.add(o.H`float screenSizePerspectiveViewAngleDependentFactor(float absCosAngle) {
return absCosAngle * absCosAngle * absCosAngle;
}`),e.vertex.code.add(o.H`vec4 screenSizePerspectiveScaleFactor(float absCosAngle, float distanceToCamera, vec4 params) {
return vec4(
min(params.x / (distanceToCamera - params.y), 1.0),
screenSizePerspectiveViewAngleDependentFactor(absCosAngle),
params.z,
params.w
);
}`),e.vertex.code.add(o.H`float applyScreenSizePerspectiveScaleFactorFloat(float size, vec4 factor) {
return max(mix(size * factor.x, size, factor.y), screenSizePerspectiveMinSize(size, factor));
}`),e.vertex.code.add(o.H`float screenSizePerspectiveScaleFloat(float size, float absCosAngle, float distanceToCamera, vec4 params) {
return applyScreenSizePerspectiveScaleFactorFloat(
size,
screenSizePerspectiveScaleFactor(absCosAngle, distanceToCamera, params)
);
}`),e.vertex.code.add(o.H`vec2 applyScreenSizePerspectiveScaleFactorVec2(vec2 size, vec4 factor) {
return mix(size * clamp(factor.x, screenSizePerspectiveMinSize(size.y, factor) / max(1e-5, size.y), 1.0), size, factor.y);
}`),e.vertex.code.add(o.H`vec2 screenSizePerspectiveScaleVec2(vec2 size, float absCosAngle, float distanceToCamera, vec4 params) {
return applyScreenSizePerspectiveScaleFactorVec2(size, screenSizePerspectiveScaleFactor(absCosAngle, distanceToCamera, params));
}`)}function a(e,t){const r=e.vertex.code;t.verticalOffsetEnabled?(e.vertex.uniforms.add("verticalOffset","vec4"),t.screenSizePerspectiveEnabled&&(e.include(n),e.vertex.uniforms.add("screenSizePerspectiveAlignment","vec4")),r.add(o.H`
    vec3 calculateVerticalOffset(vec3 worldPos, vec3 localOrigin) {
      float viewDistance = length((view * vec4(worldPos, 1.0)).xyz);
      ${t.viewingMode===i.JY.Global?o.H`vec3 worldNormal = normalize(worldPos + localOrigin);`:o.H`vec3 worldNormal = vec3(0.0, 0.0, 1.0);`}
      ${t.screenSizePerspectiveEnabled?o.H`
          float cosAngle = dot(worldNormal, normalize(worldPos - cameraPosition));
          float verticalOffsetScreenHeight = screenSizePerspectiveScaleFloat(verticalOffset.x, abs(cosAngle), viewDistance, screenSizePerspectiveAlignment);`:o.H`
          float verticalOffsetScreenHeight = verticalOffset.x;`}
      // Screen sized offset in world space, used for example for line callouts
      float worldOffset = clamp(verticalOffsetScreenHeight * verticalOffset.y * viewDistance, verticalOffset.z, verticalOffset.w);
      return worldNormal * worldOffset;
    }

    vec3 addVerticalOffset(vec3 worldPos, vec3 localOrigin) {
      return worldPos + calculateVerticalOffset(worldPos, localOrigin);
    }
    `)):r.add(o.H`vec3 addVerticalOffset(vec3 worldPos, vec3 localOrigin) { return worldPos; }`)}function s(e,t,r){if(!t.verticalOffset)return;const i=function(e,t,r){let i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:l;return i.screenLength=e.screenLength,i.perDistance=Math.tan(.5*t)/(.5*r),i.minWorldLength=e.minWorldLength,i.maxWorldLength=e.maxWorldLength,i}(t.verticalOffset,r.camera.fovY,r.camera.fullViewport[3]),o=r.camera.pixelRatio||1;e.setUniform4f("verticalOffset",i.screenLength*o,i.perDistance,i.minWorldLength,i.maxWorldLength)}const l={screenLength:0,perDistance:0,minWorldLength:0,maxWorldLength:0}},32980:(e,t,r)=>{r.d(t,{s:()=>p});var i=r(71011),o=r(33280),n=r(94951),a=r(73782),s=r(60113),l=r(28719),c=r(78980),d=r(98634);function u(e,t){e.fragment.include(c.n),t.output===i.H.Shadow?(e.extensions.add("GL_OES_standard_derivatives"),e.fragment.code.add(d.H`float _calculateFragDepth(const in float depth) {
const float SLOPE_SCALE = 2.0;
const float BIAS = 2.0 * .000015259;
float m = max(abs(dFdx(depth)), abs(dFdy(depth)));
float result = depth + SLOPE_SCALE * m + BIAS;
return clamp(result, .0, .999999);
}
void outputDepth(float _linearDepth) {
gl_FragColor = float2rgba(_calculateFragDepth(_linearDepth));
}`)):t.output===i.H.Depth&&e.fragment.code.add(d.H`void outputDepth(float _linearDepth) {
gl_FragColor = float2rgba(_linearDepth);
}`)}var h=r(137),m=r(18607),f=r(10763);function p(e,t){const r=e.vertex.code,c=e.fragment.code,p=t.hasModelTransformation;t.output!==i.H.Depth&&t.output!==i.H.Shadow||(e.include(n.w,{linearDepth:!0,hasModelTransformation:p}),e.include(s.D,t),e.include(m.kl,t),e.include(u,t),e.include(o.p2,t),e.vertex.uniforms.add("nearFar","vec2"),e.varyings.add("depth","float"),t.hasColorTexture&&e.fragment.uniforms.add("tex","sampler2D"),r.add(d.H`
      void main(void) {
        vpos = calculateVPos();
        vpos = subtractOrigin(vpos);
        vpos = addVerticalOffset(vpos, localOrigin);
        gl_Position = transformPositionWithDepth(proj, view, ${p?"model,":""} vpos, nearFar, depth);
        forwardTextureCoordinates();
      }
    `),e.include(f.sj,t),c.add(d.H`
      void main(void) {
        discardBySlice(vpos);
        ${t.hasColorTexture?d.H`
        vec4 texColor = texture2D(tex, vuv0);
        discardOrAdjustAlpha(texColor);`:""}
        outputDepth(depth);
      }
    `)),t.output===i.H.Normal&&(e.include(n.w,{linearDepth:!1,hasModelTransformation:p}),e.include(a.O,t),e.include(l.B,t),e.include(s.D,t),e.include(m.kl,t),t.hasColorTexture&&e.fragment.uniforms.add("tex","sampler2D"),e.vertex.uniforms.add("viewNormal","mat4"),e.varyings.add("vPositionView","vec3"),r.add(d.H`
      void main(void) {
        vpos = calculateVPos();
        vpos = subtractOrigin(vpos);
        ${t.normalType===a.h.Attribute?d.H`
        vNormalWorld = dpNormalView(vvLocalNormal(normalModel()));`:""}
        vpos = addVerticalOffset(vpos, localOrigin);
        gl_Position = transformPosition(proj, view, ${p?"model,":""} vpos);
        forwardTextureCoordinates();
      }
    `),e.include(o.p2,t),e.include(f.sj,t),c.add(d.H`
      void main() {
        discardBySlice(vpos);
        ${t.hasColorTexture?d.H`
        vec4 texColor = texture2D(tex, vuv0);
        discardOrAdjustAlpha(texColor);`:""}

        ${t.normalType===a.h.ScreenDerivative?d.H`
            vec3 normal = screenDerivativeNormal(vPositionView);`:d.H`
            vec3 normal = normalize(vNormalWorld);
            if (gl_FrontFacing == false) normal = -normal;`}
        gl_FragColor = vec4(vec3(0.5) + 0.5 * normal, 1.0);
      }
    `)),t.output===i.H.Highlight&&(e.include(n.w,{linearDepth:!1,hasModelTransformation:p}),e.include(s.D,t),e.include(m.kl,t),t.hasColorTexture&&e.fragment.uniforms.add("tex","sampler2D"),r.add(d.H`
      void main(void) {
        vpos = calculateVPos();
        vpos = subtractOrigin(vpos);
        vpos = addVerticalOffset(vpos, localOrigin);
        gl_Position = transformPosition(proj, view, ${p?"model,":""} vpos);
        forwardTextureCoordinates();
      }
    `),e.include(o.p2,t),e.include(f.sj,t),e.include(h.bA),c.add(d.H`
      void main() {
        discardBySlice(vpos);
        ${t.hasColorTexture?d.H`
        vec4 texColor = texture2D(tex, vuv0);
        discardOrAdjustAlpha(texColor);`:""}
        outputHighlight();
      }
    `))}},137:(e,t,r)=>{r.d(t,{bA:()=>s,wW:()=>l});var i=r(67077),o=r(98634);const n=(0,i.f)(1,1,0,1),a=(0,i.f)(1,0,1,1);function s(e){e.fragment.uniforms.add("depthTex","sampler2D"),e.fragment.uniforms.add("highlightViewportPixelSz","vec4"),e.fragment.constants.add("occludedHighlightFlag","vec4",n).add("unoccludedHighlightFlag","vec4",a),e.fragment.code.add(o.H`void outputHighlight() {
vec4 fragCoord = gl_FragCoord;
float sceneDepth = texture2D(depthTex, (fragCoord.xy - highlightViewportPixelSz.xy) * highlightViewportPixelSz.zw).r;
if (fragCoord.z > sceneDepth + 5e-7) {
gl_FragColor = occludedHighlightFlag;
}
else {
gl_FragColor = unoccludedHighlightFlag;
}
}`)}function l(e,t){e.bindTexture(t.highlightDepthTexture,"depthTex"),e.setUniform4f("highlightViewportPixelSz",0,0,t.inverseViewport[0],t.inverseViewport[1])}},21002:(e,t,r)=>{r.d(t,{S:()=>n});var i=r(78980),o=r(98634);function n(e){e.include(i.n),e.code.add(o.H`float linearDepthFromFloat(float depth, vec2 nearFar) {
return -(depth * (nearFar[1] - nearFar[0]) + nearFar[0]);
}
float linearDepthFromTexture(sampler2D depthTex, vec2 uv, vec2 nearFar) {
return linearDepthFromFloat(rgba2float(texture2D(depthTex, uv)), nearFar);
}`)}},38171:(e,t,r)=>{r.d(t,{Q:()=>l});var i=r(60113),o=r(27284),n=r(96658),a=r(98634),s=r(4760);function l(e,t){const r=e.fragment;t.vertexTangents?(e.attributes.add(s.T.TANGENT,"vec4"),e.varyings.add("vTangent","vec4"),t.doubleSidedMode===n.q.WindingOrder?r.code.add(a.H`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = gl_FrontFacing ? vTangent.w : -vTangent.w;
vec3 tangent = normalize(gl_FrontFacing ? vTangent.xyz : -vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`):r.code.add(a.H`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = vTangent.w;
vec3 tangent = normalize(vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`)):(e.extensions.add("GL_OES_standard_derivatives"),r.code.add(a.H`mat3 computeTangentSpace(vec3 normal, vec3 pos, vec2 st) {
vec3 Q1 = dFdx(pos);
vec3 Q2 = dFdy(pos);
vec2 stx = dFdx(st);
vec2 sty = dFdy(st);
float det = stx.t * sty.s - sty.t * stx.s;
vec3 T = stx.t * Q2 - sty.t * Q1;
T = T - normal * dot(normal, T);
T *= inversesqrt(max(dot(T,T), 1.e-10));
vec3 B = sign(det) * cross(normal, T);
return mat3(T, B, normal);
}`)),t.attributeTextureCoordinates!==i.N.None&&(e.include(o.i,t),r.uniforms.add("normalTexture","sampler2D"),r.uniforms.add("normalTextureSize","vec2"),r.code.add(a.H`
    vec3 computeTextureNormal(mat3 tangentSpace, vec2 uv) {
      vtc.uv = uv;
      ${t.supportsTextureAtlas?"vtc.size = normalTextureSize;":""}
      vec3 rawNormal = textureLookup(normalTexture, vtc).rgb * 2.0 - 1.0;
      return tangentSpace * rawNormal;
    }
  `))}},30694:(e,t,r)=>{r.d(t,{K:()=>o});var i=r(98634);function o(e,t){const r=e.fragment;t.receiveAmbientOcclusion?(r.uniforms.add("ssaoTex","sampler2D"),r.uniforms.add("viewportPixelSz","vec4"),r.code.add(i.H`float evaluateAmbientOcclusion() {
return 1.0 - texture2D(ssaoTex, (gl_FragCoord.xy - viewportPixelSz.xy) * viewportPixelSz.zw).a;
}
float evaluateAmbientOcclusionInverse() {
float ssao = texture2D(ssaoTex, (gl_FragCoord.xy - viewportPixelSz.xy) * viewportPixelSz.zw).a;
return viewportPixelSz.z < 0.0 ? 1.0 : ssao;
}`)):r.code.add(i.H`float evaluateAmbientOcclusion() { return 0.0; }
float evaluateAmbientOcclusionInverse() { return 1.0; }`)}},4460:(e,t,r)=>{r.d(t,{X:()=>h});var i=r(50951),o=r(41481),n=r(98634);function a(e,t){const r=e.fragment,i=void 0!==t.lightingSphericalHarmonicsOrder?t.lightingSphericalHarmonicsOrder:2;0===i?(r.uniforms.add("lightingAmbientSH0","vec3"),r.code.add(n.H`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec3 ambientLight = 0.282095 * lightingAmbientSH0;
return ambientLight * (1.0 - ambientOcclusion);
}`)):1===i?(r.uniforms.add("lightingAmbientSH_R","vec4"),r.uniforms.add("lightingAmbientSH_G","vec4"),r.uniforms.add("lightingAmbientSH_B","vec4"),r.code.add(n.H`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec4 sh0 = vec4(
0.282095,
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y
);
vec3 ambientLight = vec3(
dot(lightingAmbientSH_R, sh0),
dot(lightingAmbientSH_G, sh0),
dot(lightingAmbientSH_B, sh0)
);
return ambientLight * (1.0 - ambientOcclusion);
}`)):2===i&&(r.uniforms.add("lightingAmbientSH0","vec3"),r.uniforms.add("lightingAmbientSH_R1","vec4"),r.uniforms.add("lightingAmbientSH_G1","vec4"),r.uniforms.add("lightingAmbientSH_B1","vec4"),r.uniforms.add("lightingAmbientSH_R2","vec4"),r.uniforms.add("lightingAmbientSH_G2","vec4"),r.uniforms.add("lightingAmbientSH_B2","vec4"),r.code.add(n.H`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec3 ambientLight = 0.282095 * lightingAmbientSH0;
vec4 sh1 = vec4(
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y,
1.092548 * normal.x * normal.y
);
vec4 sh2 = vec4(
1.092548 * normal.y * normal.z,
0.315392 * (3.0 * normal.z * normal.z - 1.0),
1.092548 * normal.x * normal.z,
0.546274 * (normal.x * normal.x - normal.y * normal.y)
);
ambientLight += vec3(
dot(lightingAmbientSH_R1, sh1),
dot(lightingAmbientSH_G1, sh1),
dot(lightingAmbientSH_B1, sh1)
);
ambientLight += vec3(
dot(lightingAmbientSH_R2, sh2),
dot(lightingAmbientSH_G2, sh2),
dot(lightingAmbientSH_B2, sh2)
);
return ambientLight * (1.0 - ambientOcclusion);
}`),t.pbrMode!==o.f7.Normal&&t.pbrMode!==o.f7.Schematic||r.code.add(n.H`const vec3 skyTransmittance = vec3(0.9, 0.9, 1.0);
vec3 calculateAmbientRadiance(float ambientOcclusion)
{
vec3 ambientLight = 1.2 * (0.282095 * lightingAmbientSH0) - 0.2;
return ambientLight *= (1.0 - ambientOcclusion) * skyTransmittance;
}`))}var s=r(30694);function l(e){const t=e.fragment;t.uniforms.add("lightingMainDirection","vec3"),t.uniforms.add("lightingMainIntensity","vec3"),t.uniforms.add("lightingFixedFactor","float"),t.uniforms.add("lightingSpecularStrength","float"),t.uniforms.add("lightingEnvironmentStrength","float"),t.code.add(n.H`vec3 evaluateMainLighting(vec3 normal_global, float shadowing) {
float dotVal = clamp(dot(normal_global, lightingMainDirection), 0.0, 1.0);
dotVal = mix(dotVal, 1.0, lightingFixedFactor);
return lightingMainIntensity * ((1.0 - shadowing) * dotVal);
}`)}var c=r(2116),d=r(85586),u=r(23235);function h(e,t){const r=e.fragment;e.include(l),e.include(s.K,t),t.pbrMode!==o.f7.Disabled&&e.include(c.T,t),e.include(a,t),t.receiveShadows&&e.include(u.hX,t),r.uniforms.add("lightingGlobalFactor","float"),r.uniforms.add("ambientBoostFactor","float"),r.uniforms.add("hasFillLights","bool"),e.include(d.e),r.code.add(n.H`
    const float GAMMA_SRGB = 2.1;
    const float INV_GAMMA_SRGB = 0.4761904;
    ${t.pbrMode===o.f7.Disabled?"":"const vec3 GROUND_REFLECTANCE = vec3(0.2);"}
  `),r.code.add(n.H`
    float additionalDirectedAmbientLight(vec3 vPosWorld) {
      float vndl = dot(${t.viewingMode===i.JY.Global?n.H`normalize(vPosWorld)`:n.H`vec3(0.0, 0.0, 1.0)`}, lightingMainDirection);
      return smoothstep(0.0, 1.0, clamp(vndl * 2.5, 0.0, 1.0));
    }
  `),r.code.add(n.H`vec3 evaluateAdditionalLighting(float ambientOcclusion, vec3 vPosWorld) {
float additionalAmbientScale = additionalDirectedAmbientLight(vPosWorld);
return (1.0 - ambientOcclusion) * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor * lightingMainIntensity;
}`),t.pbrMode===o.f7.Disabled||t.pbrMode===o.f7.WaterOnIntegratedMesh?r.code.add(n.H`vec3 evaluateSceneLighting(vec3 normalWorld, vec3 albedo, float shadow, float ssao, vec3 additionalLight)
{
vec3 mainLighting = evaluateMainLighting(normalWorld, shadow);
vec3 ambientLighting = calculateAmbientIrradiance(normalWorld, ssao);
vec3 albedoLinear = pow(albedo, vec3(GAMMA_SRGB));
vec3 totalLight = mainLighting + ambientLighting + additionalLight;
totalLight = min(totalLight, vec3(PI));
vec3 outColor = vec3((albedoLinear / PI) * totalLight);
return pow(outColor, vec3(INV_GAMMA_SRGB));
}`):t.pbrMode!==o.f7.Normal&&t.pbrMode!==o.f7.Schematic||(r.code.add(n.H`const float fillLightIntensity = 0.25;
const float horizonLightDiffusion = 0.4;
const float additionalAmbientIrradianceFactor = 0.02;
vec3 evaluateSceneLightingPBR(vec3 normal, vec3 albedo, float shadow, float ssao, vec3 additionalLight, vec3 viewDir, vec3 normalGround, vec3 mrr, vec3 _emission, float additionalAmbientIrradiance)
{
vec3 viewDirection = -viewDir;
vec3 mainLightDirection = lightingMainDirection;
vec3 h = normalize(viewDirection + mainLightDirection);
PBRShadingInfo inputs;
inputs.NdotL = clamp(dot(normal, mainLightDirection), 0.001, 1.0);
inputs.NdotV = clamp(abs(dot(normal, viewDirection)), 0.001, 1.0);
inputs.NdotH = clamp(dot(normal, h), 0.0, 1.0);
inputs.VdotH = clamp(dot(viewDirection, h), 0.0, 1.0);
inputs.NdotNG = clamp(dot(normal, normalGround), -1.0, 1.0);
vec3 reflectedView = normalize(reflect(viewDirection, normal));
inputs.RdotNG = clamp(dot(reflectedView, normalGround), -1.0, 1.0);
inputs.albedoLinear = pow(albedo, vec3(GAMMA_SRGB));
inputs.ssao = ssao;
inputs.metalness = mrr[0];
inputs.roughness = clamp(mrr[1] * mrr[1], 0.001, 0.99);`),r.code.add(n.H`inputs.f0 = (0.16 * mrr[2] * mrr[2]) * (1.0 - inputs.metalness) + inputs.albedoLinear * inputs.metalness;
inputs.f90 = vec3(clamp(dot(inputs.f0, vec3(50.0 * 0.33)), 0.0, 1.0));
inputs.diffuseColor = inputs.albedoLinear * (vec3(1.0) - inputs.f0) * (1.0 - inputs.metalness);`),r.code.add(n.H`vec3 ambientDir = vec3(5.0 * normalGround[1] - normalGround[0] * normalGround[2], - 5.0 * normalGround[0] - normalGround[2] * normalGround[1], normalGround[1] * normalGround[1] + normalGround[0] * normalGround[0]);
ambientDir = ambientDir != vec3(0.0)? normalize(ambientDir) : normalize(vec3(5.0, -1.0, 0.0));
inputs.NdotAmbDir = hasFillLights ? abs(dot(normal, ambientDir)) : 1.0;
vec3 mainLightIrradianceComponent = inputs.NdotL * (1.0 - shadow) * lightingMainIntensity;
vec3 fillLightsIrradianceComponent = inputs.NdotAmbDir * lightingMainIntensity * fillLightIntensity;
vec3 ambientLightIrradianceComponent = calculateAmbientIrradiance(normal, ssao) + additionalLight;
inputs.skyIrradianceToSurface = ambientLightIrradianceComponent + mainLightIrradianceComponent + fillLightsIrradianceComponent ;
inputs.groundIrradianceToSurface = GROUND_REFLECTANCE * ambientLightIrradianceComponent + mainLightIrradianceComponent + fillLightsIrradianceComponent ;`),r.code.add(n.H`vec3 horizonRingDir = inputs.RdotNG * normalGround - reflectedView;
vec3 horizonRingH = normalize(viewDirection + horizonRingDir);
inputs.NdotH_Horizon = dot(normal, horizonRingH);
vec3 mainLightRadianceComponent = lightingSpecularStrength * normalDistribution(inputs.NdotH, inputs.roughness) * lightingMainIntensity * (1.0 - shadow);
vec3 horizonLightRadianceComponent = lightingEnvironmentStrength * normalDistribution(inputs.NdotH_Horizon, min(inputs.roughness + horizonLightDiffusion, 1.0)) * lightingMainIntensity * fillLightIntensity;
vec3 ambientLightRadianceComponent = lightingEnvironmentStrength * calculateAmbientRadiance(ssao) + additionalLight;
inputs.skyRadianceToSurface = ambientLightRadianceComponent + mainLightRadianceComponent + horizonLightRadianceComponent;
inputs.groundRadianceToSurface = GROUND_REFLECTANCE * (ambientLightRadianceComponent + horizonLightRadianceComponent) + mainLightRadianceComponent;
inputs.averageAmbientRadiance = ambientLightIrradianceComponent[1] * (1.0 + GROUND_REFLECTANCE[1]);`),r.code.add(n.H`
        vec3 reflectedColorComponent = evaluateEnvironmentIllumination(inputs);
        vec3 additionalMaterialReflectanceComponent = inputs.albedoLinear * additionalAmbientIrradiance;
        vec3 emissionComponent = pow(_emission, vec3(GAMMA_SRGB));
        vec3 outColorLinear = reflectedColorComponent + additionalMaterialReflectanceComponent + emissionComponent;
        ${t.pbrMode===o.f7.Schematic?n.H`vec3 outColor = pow(max(vec3(0.0), outColorLinear - 0.005 * inputs.averageAmbientRadiance), vec3(INV_GAMMA_SRGB));`:n.H`vec3 outColor = pow(blackLevelSoftCompression(outColorLinear, inputs), vec3(INV_GAMMA_SRGB));`}
        return outColor;
      }
    `))}},15226:(e,t,r)=>{r.d(t,{l:()=>o,p:()=>n});var i=r(98634);function o(e,t){e.fragment.uniforms.add("terrainDepthTexture","sampler2D"),e.fragment.uniforms.add("nearFar","vec2"),e.fragment.uniforms.add("inverseViewport","vec2"),e.fragment.code.add(i.H`
    // Compare the linearized depths of fragment and terrain. Discard fragments on the wrong side of the terrain.
    void terrainDepthTest(vec4 fragCoord, float fragmentDepth){

      float terrainDepth = linearDepthFromTexture(terrainDepthTexture, fragCoord.xy * inverseViewport, nearFar);
      if(fragmentDepth ${t.cullAboveGround?">":"<="} terrainDepth){
        discard;
      }
    }
  `)}function n(e,t){t.multipassTerrainEnabled&&t.terrainLinearDepthTexture&&e.bindTexture(t.terrainLinearDepthTexture,"terrainDepthTexture")}},96658:(e,t,r)=>{r.d(t,{k:()=>a,q:()=>i});var i,o=r(41644),n=r(98634);function a(e,t){const r=e.fragment;switch(r.code.add(n.H`struct ShadingNormalParameters {
vec3 normalView;
vec3 viewDirection;
} shadingParams;`),t.doubleSidedMode){case i.None:r.code.add(n.H`vec3 shadingNormal(ShadingNormalParameters params) {
return normalize(params.normalView);
}`);break;case i.View:r.code.add(n.H`vec3 shadingNormal(ShadingNormalParameters params) {
return dot(params.normalView, params.viewDirection) > 0.0 ? normalize(-params.normalView) : normalize(params.normalView);
}`);break;case i.WindingOrder:r.code.add(n.H`vec3 shadingNormal(ShadingNormalParameters params) {
return gl_FrontFacing ? normalize(params.normalView) : normalize(-params.normalView);
}`);break;default:(0,o.Bg)(t.doubleSidedMode);case i.COUNT:}}!function(e){e[e.None=0]="None",e[e.View=1]="View",e[e.WindingOrder=2]="WindingOrder",e[e.COUNT=3]="COUNT"}(i||(i={}))},2116:(e,t,r)=>{r.d(t,{T:()=>s});var i=r(98634);function o(e){const t=e.fragment.code;t.add(i.H`vec3 evaluateDiffuseIlluminationHemisphere(vec3 ambientGround, vec3 ambientSky, float NdotNG)
{
return ((1.0 - NdotNG) * ambientGround + (1.0 + NdotNG) * ambientSky) * 0.5;
}`),t.add(i.H`float integratedRadiance(float cosTheta2, float roughness)
{
return (cosTheta2 - 1.0) / (cosTheta2 * (1.0 - roughness * roughness) - 1.0);
}`),t.add(i.H`vec3 evaluateSpecularIlluminationHemisphere(vec3 ambientGround, vec3 ambientSky, float RdotNG, float roughness)
{
float cosTheta2 = 1.0 - RdotNG * RdotNG;
float intRadTheta = integratedRadiance(cosTheta2, roughness);
float ground = RdotNG < 0.0 ? 1.0 - intRadTheta : 1.0 + intRadTheta;
float sky = 2.0 - ground;
return (ground * ambientGround + sky * ambientSky) * 0.5;
}`)}var n=r(41481),a=r(85586);function s(e,t){const r=e.fragment.code;e.include(a.e),t.pbrMode===n.f7.Water||t.pbrMode===n.f7.WaterOnIntegratedMesh?(r.add(i.H`
    struct PBRShadingWater
    {
        float NdotL;   // cos angle between normal and light direction
        float NdotV;   // cos angle between normal and view direction
        float NdotH;   // cos angle between normal and half vector
        float VdotH;   // cos angle between view direction and half vector
        float LdotH;   // cos angle between light direction and half vector
        float VdotN;   // cos angle between view direction and normal vector
    };

    float dtrExponent = ${t.useCustomDTRExponentForWater?"2.2":"2.0"};
    `),r.add(i.H`vec3 fresnelReflection(float angle, vec3 f0, float f90) {
return f0 + (f90 - f0) * pow(1.0 - angle, 5.0);
}`),r.add(i.H`float normalDistributionWater(float NdotH, float roughness)
{
float r2 = roughness * roughness;
float NdotH2 = NdotH * NdotH;
float denom = pow((NdotH2 * (r2 - 1.0) + 1.0), dtrExponent) * PI;
return r2 / denom;
}`),r.add(i.H`float geometricOcclusionKelemen(float LoH)
{
return 0.25 / (LoH * LoH);
}`),r.add(i.H`vec3 brdfSpecularWater(in PBRShadingWater props, float roughness, vec3 F0, float F0Max)
{
vec3  F = fresnelReflection(props.VdotH, F0, F0Max);
float dSun = normalDistributionWater(props.NdotH, roughness);
float V = geometricOcclusionKelemen(props.LdotH);
float diffusionSunHaze = mix(roughness + 0.045, roughness + 0.385, 1.0 - props.VdotH);
float strengthSunHaze  = 1.2;
float dSunHaze = normalDistributionWater(props.NdotH, diffusionSunHaze)*strengthSunHaze;
return ((dSun + dSunHaze) * V) * F;
}
vec3 tonemapACES(const vec3 x) {
return (x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14);
}`)):t.pbrMode!==n.f7.Normal&&t.pbrMode!==n.f7.Schematic||(e.include(o),r.add(i.H`struct PBRShadingInfo
{
float NdotL;
float NdotV;
float NdotH;
float VdotH;
float LdotH;
float NdotNG;
float RdotNG;
float NdotAmbDir;
float NdotH_Horizon;
vec3 skyRadianceToSurface;
vec3 groundRadianceToSurface;
vec3 skyIrradianceToSurface;
vec3 groundIrradianceToSurface;
float averageAmbientRadiance;
float ssao;
vec3 albedoLinear;
vec3 f0;
vec3 f90;
vec3 diffuseColor;
float metalness;
float roughness;
};`),r.add(i.H`float normalDistribution(float NdotH, float roughness)
{
float a = NdotH * roughness;
float b = roughness / (1.0 - NdotH * NdotH + a * a);
return b * b * INV_PI;
}`),r.add(i.H`const vec4 c0 = vec4(-1.0, -0.0275, -0.572,  0.022);
const vec4 c1 = vec4( 1.0,  0.0425,  1.040, -0.040);
const vec2 c2 = vec2(-1.04, 1.04);
vec2 prefilteredDFGAnalytical(float roughness, float NdotV) {
vec4 r = roughness * c0 + c1;
float a004 = min(r.x * r.x, exp2(-9.28 * NdotV)) * r.x + r.y;
return c2 * a004 + r.zw;
}`),r.add(i.H`vec3 evaluateEnvironmentIllumination(PBRShadingInfo inputs) {
vec3 indirectDiffuse = evaluateDiffuseIlluminationHemisphere(inputs.groundIrradianceToSurface, inputs.skyIrradianceToSurface, inputs.NdotNG);
vec3 indirectSpecular = evaluateSpecularIlluminationHemisphere(inputs.groundRadianceToSurface, inputs.skyRadianceToSurface, inputs.RdotNG, inputs.roughness);
vec3 diffuseComponent = inputs.diffuseColor * indirectDiffuse * INV_PI;
vec2 dfg = prefilteredDFGAnalytical(inputs.roughness, inputs.NdotV);
vec3 specularColor = inputs.f0 * dfg.x + inputs.f90 * dfg.y;
vec3 specularComponent = specularColor * indirectSpecular;
return (diffuseComponent + specularComponent);
}`),r.add(i.H`float gamutMapChanel(float x, vec2 p){
return (x < p.x) ? mix(0.0, p.y, x/p.x) : mix(p.y, 1.0, (x - p.x) / (1.0 - p.x) );
}`),r.add(i.H`vec3 blackLevelSoftCompression(vec3 inColor, PBRShadingInfo inputs){
vec3 outColor;
vec2 p = vec2(0.02 * (inputs.averageAmbientRadiance), 0.0075 * (inputs.averageAmbientRadiance));
outColor.x = gamutMapChanel(inColor.x, p) ;
outColor.y = gamutMapChanel(inColor.y, p) ;
outColor.z = gamutMapChanel(inColor.z, p) ;
return outColor;
}`))}},41481:(e,t,r)=>{r.d(t,{f7:()=>a,jV:()=>s,nW:()=>l});var i=r(8229),o=r(27284),n=r(98634);(0,i.f)(0,.6,.2);var a;function s(e,t){const r=e.fragment,i=t.hasMetalnessAndRoughnessTexture||t.hasEmissionTexture||t.hasOcclusionTexture;t.pbrMode===a.Normal&&i&&e.include(o.i,t),t.pbrMode!==a.Schematic?(t.pbrMode===a.Disabled&&r.code.add(n.H`float getBakedOcclusion() { return 1.0; }`),t.pbrMode===a.Normal&&(r.uniforms.add("emissionFactor","vec3"),r.uniforms.add("mrrFactors","vec3"),r.code.add(n.H`vec3 mrr;
vec3 emission;
float occlusion;`),t.hasMetalnessAndRoughnessTexture&&(r.uniforms.add("texMetallicRoughness","sampler2D"),t.supportsTextureAtlas&&r.uniforms.add("texMetallicRoughnessSize","vec2"),r.code.add(n.H`void applyMetallnessAndRoughness(TextureLookupParameter params) {
vec3 metallicRoughness = textureLookup(texMetallicRoughness, params).rgb;
mrr[0] *= metallicRoughness.b;
mrr[1] *= metallicRoughness.g;
}`)),t.hasEmissionTexture&&(r.uniforms.add("texEmission","sampler2D"),t.supportsTextureAtlas&&r.uniforms.add("texEmissionSize","vec2"),r.code.add(n.H`void applyEmission(TextureLookupParameter params) {
emission *= textureLookup(texEmission, params).rgb;
}`)),t.hasOcclusionTexture?(r.uniforms.add("texOcclusion","sampler2D"),t.supportsTextureAtlas&&r.uniforms.add("texOcclusionSize","vec2"),r.code.add(n.H`void applyOcclusion(TextureLookupParameter params) {
occlusion *= textureLookup(texOcclusion, params).r;
}
float getBakedOcclusion() {
return occlusion;
}`)):r.code.add(n.H`float getBakedOcclusion() { return 1.0; }`),r.code.add(n.H`
    void applyPBRFactors() {
      mrr = mrrFactors;
      emission = emissionFactor;
      occlusion = 1.0;
      ${i?"vtc.uv = vuv0;":""}
      ${t.hasMetalnessAndRoughnessTexture?t.supportsTextureAtlas?"vtc.size = texMetallicRoughnessSize; applyMetallnessAndRoughness(vtc);":"applyMetallnessAndRoughness(vtc);":""}
      ${t.hasEmissionTexture?t.supportsTextureAtlas?"vtc.size = texEmissionSize; applyEmission(vtc);":"applyEmission(vtc);":""}
      ${t.hasOcclusionTexture?t.supportsTextureAtlas?"vtc.size = texOcclusionSize; applyOcclusion(vtc);":"applyOcclusion(vtc);":""}
    }
  `))):r.code.add(n.H`const vec3 mrr = vec3(0.0, 0.6, 0.2);
const vec3 emission = vec3(0.0);
float occlusion = 1.0;
void applyPBRFactors() {}
float getBakedOcclusion() { return 1.0; }`)}function l(e,t){let r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];r||(e.setUniform3fv("mrrFactors",t.mrrFactors),e.setUniform3fv("emissionFactor",t.emissiveFactor))}!function(e){e[e.Disabled=0]="Disabled",e[e.Normal=1]="Normal",e[e.Schematic=2]="Schematic",e[e.Water=3]="Water",e[e.WaterOnIntegratedMesh=4]="WaterOnIntegratedMesh",e[e.COUNT=5]="COUNT"}(a||(a={}))},85586:(e,t,r)=>{r.d(t,{e:()=>o});var i=r(98634);function o(e){e.vertex.code.add(i.H`const float PI = 3.141592653589793;`),e.fragment.code.add(i.H`const float PI = 3.141592653589793;
const float LIGHT_NORMALIZATION = 1.0 / PI;
const float INV_PI = 0.3183098861837907;
const float HALF_PI = 1.570796326794897;`)}},23235:(e,t,r)=>{r.d(t,{hX:()=>n,vL:()=>a});var i=r(78980),o=r(98634);function n(e){e.fragment.include(i.n),e.fragment.uniforms.add("shadowMapTex","sampler2D"),e.fragment.uniforms.add("numCascades","int"),e.fragment.uniforms.add("cascadeDistances","vec4"),e.fragment.uniforms.add("shadowMapMatrix","mat4",4),e.fragment.uniforms.add("depthHalfPixelSz","float"),e.fragment.code.add(o.H`int chooseCascade(float _linearDepth, out mat4 mat) {
vec4 distance = cascadeDistances;
float depth = _linearDepth;
int i = depth < distance[1] ? 0 : depth < distance[2] ? 1 : depth < distance[3] ? 2 : 3;
mat = i == 0 ? shadowMapMatrix[0] : i == 1 ? shadowMapMatrix[1] : i == 2 ? shadowMapMatrix[2] : shadowMapMatrix[3];
return i;
}
vec3 lightSpacePosition(vec3 _vpos, mat4 mat) {
vec4 lv = mat * vec4(_vpos, 1.0);
lv.xy /= lv.w;
return 0.5 * lv.xyz + vec3(0.5);
}
vec2 cascadeCoordinates(int i, vec3 lvpos) {
return vec2(float(i - 2 * (i / 2)) * 0.5, float(i / 2) * 0.5) + 0.5 * lvpos.xy;
}
float readShadowMapDepth(vec2 uv, sampler2D _depthTex) {
return rgba2float(texture2D(_depthTex, uv));
}
float posIsInShadow(vec2 uv, vec3 lvpos, sampler2D _depthTex) {
return readShadowMapDepth(uv, _depthTex) < lvpos.z ? 1.0 : 0.0;
}
float filterShadow(vec2 uv, vec3 lvpos, float halfPixelSize, sampler2D _depthTex) {
float texSize = 0.5 / halfPixelSize;
vec2 st = fract((vec2(halfPixelSize) + uv) * texSize);
float s00 = posIsInShadow(uv + vec2(-halfPixelSize, -halfPixelSize), lvpos, _depthTex);
float s10 = posIsInShadow(uv + vec2(halfPixelSize, -halfPixelSize), lvpos, _depthTex);
float s11 = posIsInShadow(uv + vec2(halfPixelSize, halfPixelSize), lvpos, _depthTex);
float s01 = posIsInShadow(uv + vec2(-halfPixelSize, halfPixelSize), lvpos, _depthTex);
return mix(mix(s00, s10, st.x), mix(s01, s11, st.x), st.y);
}
float readShadowMap(const in vec3 _vpos, float _linearDepth) {
mat4 mat;
int i = chooseCascade(_linearDepth, mat);
if (i >= numCascades) { return 0.0; }
vec3 lvpos = lightSpacePosition(_vpos, mat);
if (lvpos.z >= 1.0) { return 0.0; }
if (lvpos.x < 0.0 || lvpos.x > 1.0 || lvpos.y < 0.0 || lvpos.y > 1.0) { return 0.0; }
vec2 uv = cascadeCoordinates(i, lvpos);
return filterShadow(uv, lvpos, depthHalfPixelSz, shadowMapTex);
}`)}function a(e,t,r){t.shadowMappingEnabled&&t.shadowMap.bindView(e,r)}},18607:(e,t,r)=>{r.d(t,{kl:()=>n,uj:()=>s});var i=r(98634),o=r(4760);function n(e,t){t.vvInstancingEnabled&&(t.vvSize||t.vvColor)&&e.attributes.add(o.T.INSTANCEFEATUREATTRIBUTE,"vec4"),t.vvSize?(e.vertex.uniforms.add("vvSizeMinSize","vec3"),e.vertex.uniforms.add("vvSizeMaxSize","vec3"),e.vertex.uniforms.add("vvSizeOffset","vec3"),e.vertex.uniforms.add("vvSizeFactor","vec3"),e.vertex.uniforms.add("vvSymbolRotationMatrix","mat3"),e.vertex.uniforms.add("vvSymbolAnchor","vec3"),e.vertex.code.add(i.H`vec3 vvScale(vec4 _featureAttribute) {
return clamp(vvSizeOffset + _featureAttribute.x * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize);
}
vec4 vvTransformPosition(vec3 position, vec4 _featureAttribute) {
return vec4(vvSymbolRotationMatrix * ( vvScale(_featureAttribute) * (position + vvSymbolAnchor)), 1.0);
}`),e.vertex.code.add(i.H`
      const float eps = 1.192092896e-07;
      vec4 vvTransformNormal(vec3 _normal, vec4 _featureAttribute) {
        vec3 vvScale = clamp(vvSizeOffset + _featureAttribute.x * vvSizeFactor, vvSizeMinSize + eps, vvSizeMaxSize);
        return vec4(vvSymbolRotationMatrix * _normal / vvScale, 1.0);
      }

      ${t.vvInstancingEnabled?i.H`
      vec4 vvLocalNormal(vec3 _normal) {
        return vvTransformNormal(_normal, instanceFeatureAttribute);
      }

      vec4 localPosition() {
        return vvTransformPosition(position, instanceFeatureAttribute);
      }`:""}
    `)):e.vertex.code.add(i.H`vec4 localPosition() { return vec4(position, 1.0); }
vec4 vvLocalNormal(vec3 _normal) { return vec4(_normal, 1.0); }`),t.vvColor?(e.vertex.constants.add("vvColorNumber","int",8),e.vertex.code.add(i.H`
      uniform float vvColorValues[vvColorNumber];
      uniform vec4 vvColorColors[vvColorNumber];

      vec4 vvGetColor(vec4 featureAttribute, float values[vvColorNumber], vec4 colors[vvColorNumber]) {
        float value = featureAttribute.y;
        if (value <= values[0]) {
          return colors[0];
        }

        for (int i = 1; i < vvColorNumber; ++i) {
          if (values[i] >= value) {
            float f = (value - values[i-1]) / (values[i] - values[i-1]);
            return mix(colors[i-1], colors[i], f);
          }
        }
        return colors[vvColorNumber - 1];
      }

      ${t.vvInstancingEnabled?i.H`
      vec4 vvColor() {
        return vvGetColor(instanceFeatureAttribute, vvColorValues, vvColorColors);
      }`:""}
    `)):e.vertex.code.add(i.H`vec4 vvColor() { return vec4(1.0); }`)}function a(e,t){t.vvSizeEnabled&&(e.setUniform3fv("vvSizeMinSize",t.vvSizeMinSize),e.setUniform3fv("vvSizeMaxSize",t.vvSizeMaxSize),e.setUniform3fv("vvSizeOffset",t.vvSizeOffset),e.setUniform3fv("vvSizeFactor",t.vvSizeFactor)),t.vvColorEnabled&&(e.setUniform1fv("vvColorValues",t.vvColorValues),e.setUniform4fv("vvColorColors",t.vvColorColors))}function s(e,t){a(e,t),t.vvSizeEnabled&&(e.setUniform3fv("vvSymbolAnchor",t.vvSymbolAnchor),e.setUniformMatrix3fv("vvSymbolRotationMatrix",t.vvSymbolRotationMatrix))}},10763:(e,t,r)=>{r.d(t,{F:()=>n,bf:()=>a,sj:()=>s});var i=r(98634),o=r(68401);const n=.1,a=.001;function s(e,t){const r=e.fragment;switch(t.alphaDiscardMode){case o.JJ.Blend:r.code.add(i.H`
        #define discardOrAdjustAlpha(color) { if (color.a < ${i.H.float(a)}) { discard; } }
      `);break;case o.JJ.Opaque:r.code.add(i.H`void discardOrAdjustAlpha(inout vec4 color) {
color.a = 1.0;
}`);break;case o.JJ.Mask:r.uniforms.add("textureAlphaCutoff","float"),r.code.add(i.H`#define discardOrAdjustAlpha(color) { if (color.a < textureAlphaCutoff) { discard; } else { color.a = 1.0; } }`);break;case o.JJ.MaskBlend:e.fragment.uniforms.add("textureAlphaCutoff","float"),e.fragment.code.add(i.H`#define discardOrAdjustAlpha(color) { if (color.a < textureAlphaCutoff) { discard; } }`)}}},27254:(e,t,r)=>{r.d(t,{$:()=>n,I:()=>a});var i=r(93169),o=r(98634);function n(e,t){let{code:r}=e;t.doublePrecisionRequiresObfuscation?r.add(o.H`vec3 dpPlusFrc(vec3 a, vec3 b) {
return mix(a, a + b, vec3(notEqual(b, vec3(0))));
}
vec3 dpMinusFrc(vec3 a, vec3 b) {
return mix(vec3(0), a - b, vec3(notEqual(a, b)));
}
vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {
vec3 t1 = dpPlusFrc(hiA, hiB);
vec3 e = dpMinusFrc(t1, hiA);
vec3 t2 = dpMinusFrc(hiB, e) + dpMinusFrc(hiA, dpMinusFrc(t1, e)) + loA + loB;
return t1 + t2;
}`):r.add(o.H`vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {
vec3 t1 = hiA + hiB;
vec3 e = t1 - hiA;
vec3 t2 = ((hiB - e) + (hiA - (t1 - e))) + loA + loB;
return t1 + t2;
}`)}function a(e){return!!(0,i.Z)("force-double-precision-obfuscation")||e.driverTest.doublePrecisionRequiresObfuscation}},14282:(e,t,r)=>{r.d(t,{a:()=>a});var i=r(71011),o=r(98634),n=r(37825);function a(e,t){const r=o.H`
  /*
  *  ${t.name}
  *  ${t.output===i.H.Color?"RenderOutput: Color":t.output===i.H.Depth?"RenderOutput: Depth":t.output===i.H.Shadow?"RenderOutput: Shadow":t.output===i.H.Normal?"RenderOutput: Normal":t.output===i.H.Highlight?"RenderOutput: Highlight":""}
  */
  `;(0,n.CG)()&&(e.fragment.code.add(r),e.vertex.code.add(r))}},98082:(e,t,r)=>{r.d(t,{y:()=>a});var i=r(49420),o=r(98634);function n(e){e.code.add(o.H`vec4 premultiplyAlpha(vec4 v) {
return vec4(v.rgb * v.a, v.a);
}
vec3 rgb2hsv(vec3 c) {
vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
vec4 p = c.g < c.b ? vec4(c.bg, K.wz) : vec4(c.gb, K.xy);
vec4 q = c.r < p.x ? vec4(p.xyw, c.r) : vec4(c.r, p.yzx);
float d = q.x - min(q.w, q.y);
float e = 1.0e-10;
return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), min(d / (q.x + e), 1.0), q.x);
}
vec3 hsv2rgb(vec3 c) {
vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
float rgb2v(vec3 c) {
return max(c.x, max(c.y, c.z));
}`)}function a(e){e.include(n),e.code.add(o.H`
    vec3 mixExternalColor(vec3 internalColor, vec3 textureColor, vec3 externalColor, int mode) {
      // workaround for artifacts in OSX using Intel Iris Pro
      // see: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/10475
      vec3 internalMixed = internalColor * textureColor;
      vec3 allMixed = internalMixed * externalColor;

      if (mode == ${o.H.int(i.a9.Multiply)}) {
        return allMixed;
      }
      else if (mode == ${o.H.int(i.a9.Ignore)}) {
        return internalMixed;
      }
      else if (mode == ${o.H.int(i.a9.Replace)}) {
        return externalColor;
      }
      else {
        // tint (or something invalid)
        float vIn = rgb2v(internalMixed);
        vec3 hsvTint = rgb2hsv(externalColor);
        vec3 hsvOut = vec3(hsvTint.x, hsvTint.y, vIn * hsvTint.z);
        return hsv2rgb(hsvOut);
      }
    }

    float mixExternalOpacity(float internalOpacity, float textureOpacity, float externalOpacity, int mode) {
      // workaround for artifacts in OSX using Intel Iris Pro
      // see: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/10475
      float internalMixed = internalOpacity * textureOpacity;
      float allMixed = internalMixed * externalOpacity;

      if (mode == ${o.H.int(i.a9.Ignore)}) {
        return internalMixed;
      }
      else if (mode == ${o.H.int(i.a9.Replace)}) {
        return externalOpacity;
      }
      else {
        // multiply or tint (or something invalid)
        return allMixed;
      }
    }
  `)}},78980:(e,t,r)=>{r.d(t,{n:()=>o});var i=r(98634);function o(e){e.code.add(i.H`const float MAX_RGBA_FLOAT =
255.0 / 256.0 +
255.0 / 256.0 / 256.0 +
255.0 / 256.0 / 256.0 / 256.0 +
255.0 / 256.0 / 256.0 / 256.0 / 256.0;
const vec4 FIXED_POINT_FACTORS = vec4(1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0);
vec4 float2rgba(const float value) {
float valueInValidDomain = clamp(value, 0.0, MAX_RGBA_FLOAT);
vec4 fixedPointU8 = floor(fract(valueInValidDomain * FIXED_POINT_FACTORS) * 256.0);
const float toU8AsFloat = 1.0 / 255.0;
return fixedPointU8 * toU8AsFloat;
}
const vec4 RGBA_2_FLOAT_FACTORS = vec4(
255.0 / (256.0),
255.0 / (256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0 * 256.0)
);
float rgba2float(vec4 rgba) {
return dot(rgba, RGBA_2_FLOAT_FACTORS);
}`)}},64201:(e,t,r)=>{r.d(t,{kG:()=>n});const i=r(32718).Z.getLogger("esri.views.3d.webgl-engine.core.shaderModules.shaderBuilder");class o{constructor(){this.includedModules=new Map}include(e,t){this.includedModules.has(e)?this.includedModules.get(e)!==t&&i.error("Trying to include shader module multiple times with different sets of options."):(this.includedModules.set(e,t),e(this.builder,t))}}class n extends o{constructor(){super(...arguments),this.vertex=new l,this.fragment=new l,this.attributes=new c,this.varyings=new d,this.extensions=new u,this.constants=new h}get fragmentUniforms(){return this.fragment.uniforms}get builder(){return this}generateSource(e){const t=this.extensions.generateSource(e),r=this.attributes.generateSource(e),i=this.varyings.generateSource(),o="vertex"===e?this.vertex:this.fragment,n=o.uniforms.generateSource(),a=o.code.generateSource(),s="vertex"===e?f:m,l=this.constants.generateSource().concat(o.constants.generateSource());return`\n${t.join("\n")}\n\n${s}\n\n${l.join("\n")}\n\n${n.join("\n")}\n\n${r.join("\n")}\n\n${i.join("\n")}\n\n${a.join("\n")}`}}class a{constructor(){this._entries=new Map}add(e,t,r){const i=`${e}_${t}_${r}`;return this._entries.set(i,{name:e,type:t,arraySize:r}),this}generateSource(){return Array.from(this._entries.values()).map((e=>`uniform ${e.type} ${e.name}${(e=>e?`[${e}]`:"")(e.arraySize)};`))}get entries(){return Array.from(this._entries.values())}}class s{constructor(){this._entries=new Array}add(e){this._entries.push(e)}generateSource(){return this._entries}}class l extends o{constructor(){super(...arguments),this.uniforms=new a,this.code=new s,this.constants=new h}get builder(){return this}}class c{constructor(){this._entries=new Array}add(e,t){this._entries.push([e,t])}generateSource(e){return"fragment"===e?[]:this._entries.map((e=>`attribute ${e[1]} ${e[0]};`))}}class d{constructor(){this._entries=new Array}add(e,t){this._entries.push([e,t])}generateSource(){return this._entries.map((e=>`varying ${e[1]} ${e[0]};`))}}class u{constructor(){this._entries=new Set}add(e){this._entries.add(e)}generateSource(e){const t="vertex"===e?u.ALLOWLIST_VERTEX:u.ALLOWLIST_FRAGMENT;return Array.from(this._entries).filter((e=>t.includes(e))).map((e=>`#extension ${e} : enable`))}}u.ALLOWLIST_FRAGMENT=["GL_EXT_shader_texture_lod","GL_OES_standard_derivatives"],u.ALLOWLIST_VERTEX=[];class h{constructor(){this._entries=[]}add(e,t,r){let i="ERROR_CONSTRUCTOR_STRING";switch(t){case"float":i=h._numberToFloatStr(r);break;case"int":i=h._numberToIntStr(r);break;case"bool":i=r.toString();break;case"vec2":i=`vec2(${h._numberToFloatStr(r[0])},                            ${h._numberToFloatStr(r[1])})`;break;case"vec3":i=`vec3(${h._numberToFloatStr(r[0])},                            ${h._numberToFloatStr(r[1])},                            ${h._numberToFloatStr(r[2])})`;break;case"vec4":i=`vec4(${h._numberToFloatStr(r[0])},                            ${h._numberToFloatStr(r[1])},                            ${h._numberToFloatStr(r[2])},                            ${h._numberToFloatStr(r[3])})`;break;case"ivec2":i=`ivec2(${h._numberToIntStr(r[0])},                             ${h._numberToIntStr(r[1])})`;break;case"ivec3":i=`ivec3(${h._numberToIntStr(r[0])},                             ${h._numberToIntStr(r[1])},                             ${h._numberToIntStr(r[2])})`;break;case"ivec4":i=`ivec4(${h._numberToIntStr(r[0])},                             ${h._numberToIntStr(r[1])},                             ${h._numberToIntStr(r[2])},                             ${h._numberToIntStr(r[3])})`;break;case"mat2":case"mat3":case"mat4":i=`${t}(${Array.prototype.map.call(r,(e=>h._numberToFloatStr(e))).join(", ")})`}return this._entries.push(`const ${t} ${e} = ${i};`),this}static _numberToIntStr(e){return e.toFixed(0)}static _numberToFloatStr(e){return Number.isInteger(e)?e.toFixed(1):e.toString()}generateSource(){return Array.from(this._entries)}}const m="#ifdef GL_FRAGMENT_PRECISION_HIGH\n  precision highp float;\n  precision highp sampler2D;\n#else\n  precision mediump float;\n  precision mediump sampler2D;\n#endif",f="precision highp float;\nprecision highp sampler2D;"},98634:(e,t,r)=>{function i(e){let t="";for(let r=0;r<(arguments.length<=1?0:arguments.length-1);r++)t+=e[r]+(r+1<1||arguments.length<=r+1?void 0:arguments[r+1]);return t+=e[e.length-1],t}r.d(t,{H:()=>i}),function(e){e.int=function(e){return Math.round(e).toString()},e.float=function(e){return e.toPrecision(8)}}(i||(i={}))},78041:(e,t,r)=>{r.d(t,{Bh:()=>m,IB:()=>l,j7:()=>c,je:()=>h,ve:()=>d,wu:()=>a});var i=r(68401),o=r(8548),n=r(36207);const a=(0,n.wK)(o.zi.SRC_ALPHA,o.zi.ONE,o.zi.ONE_MINUS_SRC_ALPHA,o.zi.ONE_MINUS_SRC_ALPHA),s=(0,n.if)(o.zi.ONE,o.zi.ONE),l=(0,n.if)(o.zi.ZERO,o.zi.ONE_MINUS_SRC_ALPHA);function c(e){return e===i.Am.FrontFace?null:e===i.Am.Alpha?l:s}const d=5e5,u={factor:-1,units:-2};function h(e){return e?u:null}function m(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o.wb.LESS;return e===i.Am.NONE||e===i.Am.FrontFace?t:o.wb.LEQUAL}},68198:(e,t,r)=>{var i;r.d(t,{C:()=>i}),function(e){e[e.MATERIAL=0]="MATERIAL",e[e.MATERIAL_ALPHA=1]="MATERIAL_ALPHA",e[e.MATERIAL_DEPTH=2]="MATERIAL_DEPTH",e[e.MATERIAL_NORMAL=3]="MATERIAL_NORMAL",e[e.MATERIAL_DEPTH_SHADOWMAP_ALL=4]="MATERIAL_DEPTH_SHADOWMAP_ALL",e[e.MATERIAL_HIGHLIGHT=5]="MATERIAL_HIGHLIGHT",e[e.MATERIAL_DEPTH_SHADOWMAP_DEFAULT=6]="MATERIAL_DEPTH_SHADOWMAP_DEFAULT",e[e.MATERIAL_DEPTH_SHADOWMAP_HIGHLIGHT=7]="MATERIAL_DEPTH_SHADOWMAP_HIGHLIGHT",e[e.MAX_PASS=8]="MAX_PASS"}(i||(i={}))},93822:(e,t,r)=>{var i;r.d(t,{r:()=>i}),function(e){e[e.INTEGRATED_MESH=0]="INTEGRATED_MESH",e[e.OPAQUE_TERRAIN=1]="OPAQUE_TERRAIN",e[e.OPAQUE_MATERIAL=2]="OPAQUE_MATERIAL",e[e.OPAQUE_PLUGIN=3]="OPAQUE_PLUGIN",e[e.TRANSPARENT_MATERIAL=4]="TRANSPARENT_MATERIAL",e[e.TRANSPARENT_PLUGIN=5]="TRANSPARENT_PLUGIN",e[e.TRANSPARENT_TERRAIN=6]="TRANSPARENT_TERRAIN",e[e.TRANSPARENT_DEPTH_WRITE_DISABLED_MATERIAL=7]="TRANSPARENT_DEPTH_WRITE_DISABLED_MATERIAL",e[e.OCCLUDED_TERRAIN=8]="OCCLUDED_TERRAIN",e[e.OCCLUDER_MATERIAL=9]="OCCLUDER_MATERIAL",e[e.TRANSPARENT_OCCLUDER_MATERIAL=10]="TRANSPARENT_OCCLUDER_MATERIAL",e[e.OCCLUSION_PIXELS=11]="OCCLUSION_PIXELS",e[e.POSTPROCESSING_ENVIRONMENT_OPAQUE=12]="POSTPROCESSING_ENVIRONMENT_OPAQUE",e[e.POSTPROCESSING_ENVIRONMENT_TRANSPARENT=13]="POSTPROCESSING_ENVIRONMENT_TRANSPARENT",e[e.LASERLINES=14]="LASERLINES",e[e.LASERLINES_CONTRAST_CONTROL=15]="LASERLINES_CONTRAST_CONTROL",e[e.HUD_MATERIAL=16]="HUD_MATERIAL",e[e.LABEL_MATERIAL=17]="LABEL_MATERIAL",e[e.LINE_CALLOUTS=18]="LINE_CALLOUTS",e[e.LINE_CALLOUTS_HUD_DEPTH=19]="LINE_CALLOUTS_HUD_DEPTH",e[e.DRAPED_MATERIAL=20]="DRAPED_MATERIAL",e[e.DRAPED_WATER=21]="DRAPED_WATER",e[e.VOXEL=22]="VOXEL",e[e.MAX_SLOTS=23]="MAX_SLOTS"}(i||(i={}))},97731:(e,t,r)=>{r.d(t,{hu:()=>o});r(88396),r(6394),r(90045);(0,r(67077).c)();class i{constructor(e){this.message=e}toString(){return`AssertException: ${this.message}`}}function o(e,t){if(!e)throw t=t||"assert",console.log(new Error(t).stack),new i(t)}},4760:(e,t,r)=>{var i;r.d(t,{T:()=>i}),function(e){e.POSITION="position",e.NORMAL="normal",e.UV0="uv0",e.AUXPOS1="auxpos1",e.AUXPOS2="auxpos2",e.MAPPOS="mapPos",e.COLOR="color",e.SYMBOLCOLOR="symbolColor",e.SIZE="size",e.TANGENT="tangent",e.OFFSET="offset",e.SUBDIVISIONFACTOR="subdivisionFactor",e.COLORFEATUREATTRIBUTE="colorFeatureAttribute",e.SIZEFEATUREATTRIBUTE="sizeFeatureAttribute",e.OPACITYFEATUREATTRIBUTE="opacityFeatureAttribute",e.DISTANCETOSTART="distanceToStart",e.UVMAPSPACE="uvMapSpace",e.BOUNDINGRECT="boundingRect",e.UVREGION="uvRegion",e.NORMALCOMPRESSED="normalCompressed",e.PROFILERIGHT="profileRight",e.PROFILEUP="profileUp",e.PROFILEVERTEXANDNORMAL="profileVertexAndNormal",e.FEATUREVALUE="featureValue",e.MODELORIGINHI="modelOriginHi",e.MODELORIGINLO="modelOriginLo",e.MODEL="model",e.MODELNORMAL="modelNormal",e.INSTANCECOLOR="instanceColor",e.INSTANCEFEATUREATTRIBUTE="instanceFeatureAttribute",e.LOCALTRANSFORM="localTransform",e.GLOBALTRANSFORM="globalTransform",e.BOUNDINGSPHERE="boundingSphere",e.MODELORIGIN="modelOrigin",e.MODELSCALEFACTORS="modelScaleFactors",e.FEATUREATTRIBUTE="featureAttribute",e.STATE="state",e.LODLEVEL="lodLevel",e.POSITION0="position0",e.POSITION1="position1",e.NORMALA="normalA",e.NORMALB="normalB",e.COMPONENTINDEX="componentIndex",e.VARIANTOFFSET="variantOffset",e.VARIANTSTROKE="variantStroke",e.VARIANTEXTENSION="variantExtension",e.U8PADDING="u8padding",e.U16PADDING="u16padding",e.SIDENESS="sideness",e.START="start",e.END="end",e.UP="up",e.EXTRUDE="extrude"}(i||(i={}))},68401:(e,t,r)=>{var i,o,n,a,s,l,c,d,u,h,m,f,p,v;r.d(t,{Am:()=>a,CE:()=>m,Gv:()=>o,JJ:()=>p,MX:()=>h,Rw:()=>l,Vr:()=>i,hU:()=>c}),function(e){e[e.None=0]="None",e[e.Front=1]="Front",e[e.Back=2]="Back",e[e.COUNT=3]="COUNT"}(i||(i={})),function(e){e[e.Less=0]="Less",e[e.Lequal=1]="Lequal",e[e.COUNT=2]="COUNT"}(o||(o={})),function(e){e[e.NONE=0]="NONE",e[e.SMAA=1]="SMAA"}(n||(n={})),function(e){e[e.Color=0]="Color",e[e.Alpha=1]="Alpha",e[e.FrontFace=2]="FrontFace",e[e.NONE=3]="NONE",e[e.COUNT=4]="COUNT"}(a||(a={})),function(e){e[e.BACKGROUND=0]="BACKGROUND",e[e.UPDATE=1]="UPDATE"}(s||(s={})),function(e){e[e.NOT_LOADED=0]="NOT_LOADED",e[e.LOADING=1]="LOADING",e[e.LOADED=2]="LOADED"}(l||(l={})),function(e){e[e.IntegratedMeshMaskExcluded=1]="IntegratedMeshMaskExcluded",e[e.OutlineVisualElementMask=2]="OutlineVisualElementMask"}(c||(c={})),function(e){e[e.ASYNC=0]="ASYNC",e[e.SYNC=1]="SYNC"}(d||(d={})),function(e){e[e.Highlight=0]="Highlight",e[e.MaskOccludee=1]="MaskOccludee",e[e.COUNT=2]="COUNT"}(u||(u={})),function(e){e[e.Triangle=0]="Triangle",e[e.Point=1]="Point",e[e.Line=2]="Line"}(h||(h={})),function(e){e[e.STRETCH=1]="STRETCH",e[e.PAD=2]="PAD"}(m||(m={})),function(e){e[e.CHANGED=0]="CHANGED",e[e.UNCHANGED=1]="UNCHANGED"}(f||(f={})),function(e){e[e.Blend=0]="Blend",e[e.Opaque=1]="Opaque",e[e.Mask=2]="Mask",e[e.MaskBlend=3]="MaskBlend",e[e.COUNT=4]="COUNT"}(p||(p={})),function(e){e[e.OFF=0]="OFF",e[e.ON=1]="ON"}(v||(v={}))},45639:(e,t,r)=>{r.d(t,{bj:()=>O,FZ:()=>R,Uf:()=>y,Bw:()=>g,LO:()=>E,Hx:()=>M});var i=r(16889),o=r(92026),n=r(11186),a=r(71353),s=r(41414),l=r(68401);r(50951);function c(e,t,r){const i=r.parameters,o=r.paddingPixelsOverride;return h.scale=Math.min(i.divisor/(t-i.offset),1),h.factor=function(e){return Math.abs(e*e*e)}(e),h.minPixelSize=i.minPixelSize,h.paddingPixels=o,h}function d(e,t){return 0===e?t.minPixelSize:t.minPixelSize*(1+2*t.paddingPixels/e)}function u(e,t){return Math.max((0,i.t7)(e*t.scale,e,t.factor),d(e,t))}(0,i.Vl)(10),(0,i.Vl)(12),(0,i.Vl)(70),(0,i.Vl)(40);const h={scale:0,factor:0,minPixelSize:0,paddingPixels:0};var m=r(97731),f=r(4760),p=(r(14226),r(81949));r(43411);new Float64Array(3),new Float32Array(6),(0,p.c)();const v=(0,s.Ue)();function g(e,t,r,i,n,a,s){if(!function(e){return!!(0,o.pC)(e)&&!e.visible}(t))if(e.boundingInfo){(0,m.hu)(e.primitiveType===l.MX.Triangle);const t=r.tolerance;T(e.boundingInfo,i,n,t,a,s)}else{const t=e.indices.get(f.T.POSITION),r=e.vertexAttributes.get(f.T.POSITION);b(i,n,0,t.length/3,t,r,void 0,a,s)}}const x=(0,a.c)();function T(e,t,r,i,a,l){if((0,o.Wi)(e))return;const c=function(e,t,r){return(0,n.s)(r,1/(t[0]-e[0]),1/(t[1]-e[1]),1/(t[2]-e[2]))}(t,r,x);if((0,s.op)(v,e.getBBMin()),(0,s.Tn)(v,e.getBBMax()),(0,o.pC)(a)&&a.applyToAabb(v),function(e,t,r,i){return function(e,t,r,i,o){const n=(e[0]-i-t[0])*r[0],a=(e[3]+i-t[0])*r[0];let s=Math.min(n,a),l=Math.max(n,a);const c=(e[1]-i-t[1])*r[1],d=(e[4]+i-t[1])*r[1];if(l=Math.min(l,Math.max(c,d)),l<0)return!1;if(s=Math.max(s,Math.min(c,d)),s>l)return!1;const u=(e[2]-i-t[2])*r[2],h=(e[5]+i-t[2])*r[2];return l=Math.min(l,Math.max(u,h)),!(l<0)&&(s=Math.max(s,Math.min(u,h)),!(s>l)&&s<o)}(e,t,r,i,1/0)}(v,t,c,i)){const{primitiveIndices:o,indices:n,position:s}=e,c=o?o.length:n.length/3;if(c>P){const o=e.getChildren();if(void 0!==o){for(let e=0;e<8;++e)void 0!==o[e]&&T(o[e],t,r,i,a,l);return}}b(t,r,0,c,n,s,o,a,l)}}const _=(0,a.c)();function b(e,t,r,i,n,a,s,l,c){if(s)return function(e,t,r,i,n,a,s,l,c){const d=a.data,u=a.stride||a.size,h=e[0],m=e[1],f=e[2],p=t[0]-h,v=t[1]-m,g=t[2]-f;for(let x=r;x<i;++x){const e=s[x];let t=3*e,r=u*n[t++],i=d[r++],a=d[r++],T=d[r];r=u*n[t++];let b=d[r++],A=d[r++],S=d[r];r=u*n[t];let M=d[r++],O=d[r++],y=d[r];(0,o.pC)(l)&&([i,a,T]=l.applyToVertex(i,a,T,x),[b,A,S]=l.applyToVertex(b,A,S,x),[M,O,y]=l.applyToVertex(M,O,y,x));const E=b-i,w=A-a,R=S-T,P=M-i,I=O-a,N=y-T,L=v*N-I*g,D=g*P-N*p,H=p*I-P*v,F=E*L+w*D+R*H;if(Math.abs(F)<=Number.EPSILON)continue;const B=h-i,z=m-a,U=f-T,G=B*L+z*D+U*H;if(F>0){if(G<0||G>F)continue}else if(G>0||G<F)continue;const V=z*R-w*U,W=U*E-R*B,q=B*w-E*z,k=p*V+v*W+g*q;if(F>0){if(k<0||G+k>F)continue}else if(k>0||G+k<F)continue;const $=(P*V+I*W+N*q)/F;$>=0&&c($,C(E,w,R,P,I,N,_),e,!1)}}(e,t,r,i,n,a,s,l,c);const d=a.data,u=a.stride||a.size,h=e[0],m=e[1],f=e[2],p=t[0]-h,v=t[1]-m,g=t[2]-f;for(let x=r,T=3*r;x<i;++x){let e=u*n[T++],t=d[e++],r=d[e++],i=d[e];e=u*n[T++];let a=d[e++],s=d[e++],b=d[e];e=u*n[T++];let A=d[e++],S=d[e++],M=d[e];(0,o.pC)(l)&&([t,r,i]=l.applyToVertex(t,r,i,x),[a,s,b]=l.applyToVertex(a,s,b,x),[A,S,M]=l.applyToVertex(A,S,M,x));const O=a-t,y=s-r,E=b-i,w=A-t,R=S-r,P=M-i,I=v*P-R*g,N=g*w-P*p,L=p*R-w*v,D=O*I+y*N+E*L;if(Math.abs(D)<=Number.EPSILON)continue;const H=h-t,F=m-r,B=f-i,z=H*I+F*N+B*L;if(D>0){if(z<0||z>D)continue}else if(z>0||z<D)continue;const U=F*E-y*B,G=B*O-E*H,V=H*y-O*F,W=p*U+v*G+g*V;if(D>0){if(W<0||z+W>D)continue}else if(W>0||z+W<D)continue;const q=(w*U+R*G+P*V)/D;q>=0&&c(q,C(O,y,E,w,R,P,_),x,!1)}}const A=(0,a.c)(),S=(0,a.c)();function C(e,t,r,i,o,a,s){return(0,n.s)(A,e,t,r),(0,n.s)(S,i,o,a),(0,n.c)(s,A,S),(0,n.n)(s,s),s}function M(e,t,r,o,n){let a=(r.screenLength||0)*e.pixelRatio;n&&(a=function(e,t,r,i){return u(e,c(t,r,i))}(a,o,t,n));const s=a*Math.tan(.5*e.fovY)/(.5*e.fullHeight);return(0,i.uZ)(s*t,r.minWorldLength||0,null!=r.maxWorldLength?r.maxWorldLength:1/0)}function O(e,t,r){if(!e)return;const i=e.parameters,o=e.paddingPixelsOverride;t.setUniform4f(r,i.divisor,i.offset,i.minPixelSize,o)}function y(e,t){const r=t?y(t):{};for(const i in e){let t=e[i];t&&t.forEach&&(t=w(t)),null==t&&i in r||(r[i]=t)}return r}function E(e,t){let r=!1;for(const i in t){const o=t[i];void 0!==o&&(r=!0,Array.isArray(o)?e[i]=o.slice():e[i]=o)}return r}function w(e){const t=[];return e.forEach((e=>t.push(e))),t}const R={multiply:1,ignore:2,replace:3,tint:4},P=1e3},61109:(e,t,r)=>{r.d(t,{G:()=>i});class i{constructor(e,t,r,i,o){let n=arguments.length>5&&void 0!==arguments[5]&&arguments[5],a=arguments.length>6&&void 0!==arguments[6]?arguments[6]:0;this.name=e,this.count=t,this.type=r,this.offset=i,this.stride=o,this.normalized=n,this.divisor=a}}},43411:(e,t,r)=>{function i(e,t,r){for(let i=0;i<r;++i)t[2*i]=e[i],t[2*i+1]=e[i]-t[2*i]}function o(e,t,r,o){for(let s=0;s<o;++s)n[0]=e[s],i(n,a,1),t[s]=a[0],r[s]=a[1]}r.d(t,{LF:()=>i,po:()=>o});const n=new Float64Array(1),a=new Float32Array(2)},36207:(e,t,r)=>{r.d(t,{BK:()=>u,LZ:()=>d,if:()=>n,jp:()=>U,sm:()=>_,wK:()=>a,zp:()=>c});var i=r(68401),o=r(8548);function n(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:o.db.ADD,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[0,0,0,0];return{srcRgb:e,srcAlpha:e,dstRgb:t,dstAlpha:t,opRgb:r,opAlpha:r,color:{r:i[0],g:i[1],b:i[2],a:i[3]}}}function a(e,t,r,i){let n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:o.db.ADD,a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:o.db.ADD,s=arguments.length>6&&void 0!==arguments[6]?arguments[6]:[0,0,0,0];return{srcRgb:e,srcAlpha:t,dstRgb:r,dstAlpha:i,opRgb:n,opAlpha:a,color:{r:s[0],g:s[1],b:s[2],a:s[3]}}}const s={face:o.LR.BACK,mode:o.Wf.CCW},l={face:o.LR.FRONT,mode:o.Wf.CCW},c=e=>e===i.Vr.Back?s:e===i.Vr.Front?l:null,d={zNear:0,zFar:1},u={r:!0,g:!0,b:!0,a:!0};function h(e){return S.intern(e)}function m(e){return M.intern(e)}function f(e){return y.intern(e)}function p(e){return w.intern(e)}function v(e){return P.intern(e)}function g(e){return N.intern(e)}function x(e){return D.intern(e)}function T(e){return F.intern(e)}function _(e){return z.intern(e)}class b{constructor(e,t){this.makeKey=e,this.makeRef=t,this.interns=new Map}intern(e){if(!e)return null;const t=this.makeKey(e),r=this.interns;return r.has(t)||r.set(t,this.makeRef(e)),r.get(t)}}function A(e){return"["+e.join(",")+"]"}const S=new b(C,(e=>({__tag:"Blending",...e})));function C(e){return e?A([e.srcRgb,e.srcAlpha,e.dstRgb,e.dstAlpha,e.opRgb,e.opAlpha,e.color.r,e.color.g,e.color.b,e.color.a]):null}const M=new b(O,(e=>({__tag:"Culling",...e})));function O(e){return e?A([e.face,e.mode]):null}const y=new b(E,(e=>({__tag:"PolygonOffset",...e})));function E(e){return e?A([e.factor,e.units]):null}const w=new b(R,(e=>({__tag:"DepthTest",...e})));function R(e){return e?A([e.func]):null}const P=new b(I,(e=>({__tag:"StencilTest",...e})));function I(e){return e?A([e.function.func,e.function.ref,e.function.mask,e.operation.fail,e.operation.zFail,e.operation.zPass]):null}const N=new b(L,(e=>({__tag:"DepthWrite",...e})));function L(e){return e?A([e.zNear,e.zFar]):null}const D=new b(H,(e=>({__tag:"ColorWrite",...e})));function H(e){return e?A([e.r,e.g,e.b,e.a]):null}const F=new b(B,(e=>({__tag:"StencilWrite",...e})));function B(e){return e?A([e.mask]):null}const z=new b((function(e){return e?A([C(e.blending),O(e.culling),E(e.polygonOffset),R(e.depthTest),I(e.stencilTest),L(e.depthWrite),H(e.colorWrite),B(e.stencilWrite)]):null}),(e=>({blending:h(e.blending),culling:m(e.culling),polygonOffset:f(e.polygonOffset),depthTest:p(e.depthTest),stencilTest:v(e.stencilTest),depthWrite:g(e.depthWrite),colorWrite:x(e.colorWrite),stencilWrite:T(e.stencilWrite)})));class U{constructor(e){this._pipelineInvalid=!0,this._blendingInvalid=!0,this._cullingInvalid=!0,this._polygonOffsetInvalid=!0,this._depthTestInvalid=!0,this._stencilTestInvalid=!0,this._depthWriteInvalid=!0,this._colorWriteInvalid=!0,this._stencilWriteInvalid=!0,this._stateSetters=e}setPipeline(e){(this._pipelineInvalid||e!==this._pipeline)&&(this._setBlending(e.blending),this._setCulling(e.culling),this._setPolygonOffset(e.polygonOffset),this._setDepthTest(e.depthTest),this._setStencilTest(e.stencilTest),this._setDepthWrite(e.depthWrite),this._setColorWrite(e.colorWrite),this._setStencilWrite(e.stencilWrite),this._pipeline=e),this._pipelineInvalid=!1}invalidateBlending(){this._blendingInvalid=!0,this._pipelineInvalid=!0}invalidateCulling(){this._cullingInvalid=!0,this._pipelineInvalid=!0}invalidatePolygonOffset(){this._polygonOffsetInvalid=!0,this._pipelineInvalid=!0}invalidateDepthTest(){this._depthTestInvalid=!0,this._pipelineInvalid=!0}invalidateStencilTest(){this._stencilTestInvalid=!0,this._pipelineInvalid=!0}invalidateDepthWrite(){this._depthWriteInvalid=!0,this._pipelineInvalid=!0}invalidateColorWrite(){this._colorWriteInvalid=!0,this._pipelineInvalid=!0}invalidateStencilWrite(){this._stencilTestInvalid=!0,this._pipelineInvalid=!0}_setBlending(e){this._blending=this._setSubState(e,this._blending,this._blendingInvalid,this._stateSetters.setBlending),this._blendingInvalid=!1}_setCulling(e){this._culling=this._setSubState(e,this._culling,this._cullingInvalid,this._stateSetters.setCulling),this._cullingInvalid=!1}_setPolygonOffset(e){this._polygonOffset=this._setSubState(e,this._polygonOffset,this._polygonOffsetInvalid,this._stateSetters.setPolygonOffset),this._polygonOffsetInvalid=!1}_setDepthTest(e){this._depthTest=this._setSubState(e,this._depthTest,this._depthTestInvalid,this._stateSetters.setDepthTest),this._depthTestInvalid=!1}_setStencilTest(e){this._stencilTest=this._setSubState(e,this._stencilTest,this._stencilTestInvalid,this._stateSetters.setStencilTest),this._stencilTestInvalid=!1}_setDepthWrite(e){this._depthWrite=this._setSubState(e,this._depthWrite,this._depthWriteInvalid,this._stateSetters.setDepthWrite),this._depthWriteInvalid=!1}_setColorWrite(e){this._colorWrite=this._setSubState(e,this._colorWrite,this._colorWriteInvalid,this._stateSetters.setColorWrite),this._colorWriteInvalid=!1}_setStencilWrite(e){this._stencilWrite=this._setSubState(e,this._stencilWrite,this._stencilWriteInvalid,this._stateSetters.setStencilWrite),this._stencilTestInvalid=!1}_setSubState(e,t,r,i){return(r||e!==t)&&(i(e),this._pipelineInvalid=!0),e}}}}]);
//# sourceMappingURL=5500.c0ce2975.chunk.js.map