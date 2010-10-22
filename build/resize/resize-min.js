YUI.add("resize-base",function(O){var Q=O.Lang,b=Q.isArray,ao=Q.isBoolean,J=Q.isNumber,au=Q.isString,al=Q.trim,k=O.Array.indexOf,X=".",q=",",p=" ",F="{handle}",o="active",I="activeHandle",z="activeHandleNode",u="all",ae="autoHide",aj="bottom",af="className",ai="cursor",at="defMinHeight",ay="defMinWidth",aa="dragCursor",v="handle",H="handles",W="hidden",t="inner",a="left",G="margin",n="node",y="nodeName",P="none",C="offsetHeight",ar="offsetWidth",e="parentNode",l="position",ak="proxy",d="proxyNode",j="relative",ad="resize",m="resizing",g="right",az="static",i="top",ag="wrap",av="wrapper",ab="wrapTypes",D="resize:mouseUp",r="resize:resize",w="resize:align",E="resize:end",N="resize:start",S="t",ax="tr",U="r",an="br",ac="b",ap="bl",Z="l",aA="tl",K=function(B){return(B instanceof O.Node);},aB=function(B){return v+B.toUpperCase();},aw=function(){return Array.prototype.slice.call(arguments).join(p);},M=O.cached(function(B){return B.substring(0,1).toUpperCase()+B.substring(1);}),x=O.ClassNameManager.getClassName,am=x(ad),ah=x(ad,v),V=x(ad,v,o),f=x(ad,v,t),A=x(ad,v,t,F),aC=x(ad,v,F),c=x(ad,W,H),s=x(ad,ak),aq=x(ad,av);function h(){h.superclass.constructor.apply(this,arguments);}O.mix(h,{NAME:ad,ATTRS:{activeHandle:{value:null,validator:au},activeHandleNode:{value:null,validator:K},autoHide:{value:false,validator:ao},defMinHeight:{value:15,validator:J},defMinWidth:{value:15,validator:J},handles:{setter:"_setHandles",value:u},node:{setter:O.one},proxy:{value:false,validator:ao},proxyNode:{setter:O.one,valueFn:function(){return O.Node.create(this.PROXY_TEMPLATE);}},resizing:{value:false,validator:ao},wrap:{setter:"_setWrap",value:false,validator:ao},wrapTypes:{readOnly:true,value:/^canvas|textarea|input|select|button|img|iframe|table|embed$/i},wrapper:{readOnly:true,valueFn:"_valueWrapper",writeOnce:true}}});O.Resize=O.extend(h,O.Base,{ALL_HANDLES:[S,ax,U,an,ac,ap,Z,aA],REGEX_CHANGE_HEIGHT:/^(t|tr|b|bl|br|tl)$/i,REGEX_CHANGE_LEFT:/^(tl|l|bl)$/i,REGEX_CHANGE_TOP:/^(tl|t|tr)$/i,REGEX_CHANGE_WIDTH:/^(bl|br|l|r|tl|tr)$/i,WRAP_TEMPLATE:'<div class="'+aq+'"></div>',PROXY_TEMPLATE:'<div class="'+s+'"></div>',HANDLE_TEMPLATE:'<div class="'+aw(ah,aC)+'">'+'<div class="'+aw(f,A)+'">&nbsp;</div>'+"</div>",changeHeightHandles:false,changeLeftHandles:false,changeTopHandles:false,changeWidthHandles:false,delegate:null,info:null,lastInfo:null,originalInfo:null,initializer:function(){var B=this;B.info={};B.originalInfo={};B.get(n).addClass(am);B.renderer();},renderUI:function(){var B=this;B._renderHandles();},bindUI:function(){var B=this;B._createEvents();B._bindDD();B._bindHandle();},syncUI:function(){var B=this;B._setHideHandlesUI(B.get(ae));},destructor:function(){var B=this,R=B.get(n),T=B.get(av),L=T.get(e);O.Event.purgeElement(T,true);B.eachHandle(function(Y){B.delegate.dd.destroy();Y.remove(true);});if(B.get(ag)){B._copyStyles(T,R);if(L){L.insertBefore(R,T);}T.remove(true);}R.removeClass(am);R.removeClass(c);},renderer:function(){this.renderUI();this.bindUI();this.syncUI();},eachHandle:function(L){var B=this;O.each(B.get(H),function(Y,R){var T=B.get(aB(Y));L.apply(B,[T,Y,R]);});},_bindDD:function(){var B=this;B.delegate=new O.DD.Delegate({bubbleTargets:B,container:B.get(av),dragConfig:{clickPixelThresh:0,clickTimeThresh:0,useShim:true,move:false},nodes:X+ah,target:false});B.on("drag:drag",B._handleResizeEvent);B.on("drag:dropmiss",B._handleMouseUpEvent);B.on("drag:end",B._handleResizeEndEvent);B.on("drag:start",B._handleResizeStartEvent);},_bindHandle:function(){var B=this,L=B.get(av);L.on("mouseenter",O.bind(B._onWrapperMouseEnter,B));L.on("mouseleave",O.bind(B._onWrapperMouseLeave,B));L.delegate("mouseenter",O.bind(B._onHandleMouseEnter,B),X+ah);L.delegate("mouseleave",O.bind(B._onHandleMouseLeave,B),X+ah);},_createEvents:function(){var B=this,L=function(R,T){B.publish(R,{defaultFn:T,queuable:false,emitFacade:true,bubbles:true,prefix:ad});};L(N,this._defResizeStartFn);L(r,this._defResizeFn);L(w,this._defResizeAlignFn);L(E,this._defResizeEndFn);L(D,this._defMouseUpFn);},_renderHandles:function(){var B=this,L=B.get(av);B.eachHandle(function(R){L.append(R);});},_renderProxy:function(){var B=this,L=B.get(d);if(!L.inDoc()){B.get(av).get(e).append(L.hide());}},_buildHandle:function(L){var B=this;return O.Node.create(O.substitute(B.HANDLE_TEMPLATE,{handle:L}));},_checkSize:function(aD,L){var B=this,Y=B.info,T=B.originalInfo,R=(aD==C)?i:a;Y[aD]=L;if(((R==a)&&B.changeLeftHandles)||((R==i)&&B.changeTopHandles)){Y[R]=T[R]+T[aD]-L;}},_copyStyles:function(T,Y){var B=T.getStyle(l).toLowerCase(),L={},R;if(B==az){B=j;}R={position:B};O.each([i,a],function(aD){L[aD]=Y.getStyle(aD);R[aD]=T.getStyle(aD);});O.each([i,g,aj,a],function(aE){var aD=G+M(aE);L[aD]=Y.getStyle(aD);R[aD]=T.getStyle(aD);});Y.setStyles(R);T.setStyles(L);T.setStyles({margin:0});Y.set(C,T.get(C));Y.set(ar,T.get(ar));},_extractHandleName:O.cached(function(R){var L=R.get(af),B=L.match(new RegExp(x(ad,v,"(\\w{1,2})\\b")));return B?B[1]:null;}),_getInfo:function(Y,B){var aD,aF=B.dragEvent.target,aE=Y.getXY(),T=aE[0],R=aE[1],L=Y.get(C),aG=Y.get(ar);if(B){aD=(aF.actXY.length?aF.actXY:aF.lastXY);}return{actXY:aD,bottom:(R+L),left:T,offsetHeight:L,offsetWidth:aG,right:(T+aG),top:R};},_resize:function(){var B=this,T=B.get(I),aD=B.info,Y=B.originalInfo,R=aD.actXY[0]-Y.actXY[0],L=aD.actXY[1]-Y.actXY[1],aE={t:function(){aD.top=Y.top+L;aD.offsetHeight=Y.offsetHeight-L;},r:function(){aD.offsetWidth=Y.offsetWidth+R;},l:function(){aD.left=Y.left+R;aD.offsetWidth=Y.offsetWidth-R;},b:function(){aD.offsetHeight=Y.offsetHeight+L;},tr:function(){this.t();this.r();},br:function(){this.b();this.r();},tl:function(){this.t();this.l();},bl:function(){this.b();this.l();}};aE[T](R,L);},_setOffset:function(R,L,B){R.set(ar,L);R.set(C,B);},_syncUI:function(){var B=this,R=B.info,T=B.get(av),L=B.get(n);B._setOffset(T,R.offsetWidth,R.offsetHeight);if(B.changeLeftHandles||B.changeTopHandles){T.setXY([R.left,R.top]);}if(!T.compareTo(L)){B._setOffset(L,R.offsetWidth,R.offsetHeight);}if(O.UA.webkit){L.setStyle(ad,P);
}},_syncProxyUI:function(){var B=this,T=B.info,R=B.get(z),L=B.get(d),Y=R.getStyle(ai);L.show().setStyle(ai,Y);B.delegate.dd.set(aa,Y);B._setOffset(L,T.offsetWidth,T.offsetHeight);L.setXY([T.left,T.top]);},_updateChangeHandleInfo:function(L){var B=this;B.changeHeightHandles=B.REGEX_CHANGE_HEIGHT.test(L);B.changeLeftHandles=B.REGEX_CHANGE_LEFT.test(L);B.changeTopHandles=B.REGEX_CHANGE_TOP.test(L);B.changeWidthHandles=B.REGEX_CHANGE_WIDTH.test(L);},_updateInfo:function(L){var B=this;B.info=B._getInfo(B.get(av),L);},_setActiveHandlesUI:function(R){var B=this,L=B.get(z);if(L){if(R){B.eachHandle(function(T){T.removeClass(V);});L.addClass(V);}else{L.removeClass(V);}}},_setHandles:function(R){var B=this,L=[];if(b(R)){L=R;}else{if(au(R)){if(R.toLowerCase()==u){L=B.ALL_HANDLES;}else{O.each(R.split(q),function(Y,T){var aD=al(Y);if(k(B.ALL_HANDLES,aD)>-1){L.push(aD);}});}}}return L;},_setHideHandlesUI:function(L){var B=this,R=B.get(av);if(!B.get(m)){if(L){R.addClass(c);}else{R.removeClass(c);}}},_setWrap:function(T){var B=this,R=B.get(n),Y=R.get(y),L=B.get(ab);if(L.test(Y)){T=true;}return T;},_defMouseUpFn:function(L){var B=this;B.set(m,false);},_defResizeFn:function(L){var B=this;B._handleResizeAlignEvent(L.dragEvent);if(B.get(ak)){B._syncProxyUI();}else{B._syncUI();}},_defResizeAlignFn:function(R){var B=this,T;B.lastInfo=B.info;B._updateInfo(R);T=B.info;B._resize();if(!B.con){var L=B.get(at),Y=B.get(ay);if(T.offsetHeight<=L){B._checkSize(C,L);}if(T.offsetWidth<=Y){B._checkSize(ar,Y);}}},_defResizeEndFn:function(R){var B=this,L=R.dragEvent.target;L.actXY=[];if(B.get(ak)){B._syncProxyUI();B.get(d).hide();}B._syncUI();B.set(I,null);B.set(z,null);B._setActiveHandlesUI(false);},_defResizeStartFn:function(L){var B=this;B.set(m,true);B.originalInfo=B._getInfo(B.get(av),L);B._updateInfo(L);if(B.get(ak)){B._renderProxy();}},_handleMouseUpEvent:function(B){this.fire(D,{dragEvent:B,info:this.info});},_handleResizeEvent:function(B){this.fire(r,{dragEvent:B,info:this.info});},_handleResizeAlignEvent:function(B){this.fire(w,{dragEvent:B,info:this.info});},_handleResizeEndEvent:function(B){this.fire(E,{dragEvent:B,info:this.info});},_handleResizeStartEvent:function(B){this.fire(N,{dragEvent:B,info:this.info});},_onWrapperMouseEnter:function(L){var B=this;if(B.get(ae)){B._setHideHandlesUI(false);}},_onWrapperMouseLeave:function(L){var B=this;if(B.get(ae)){B._setHideHandlesUI(true);}},_onHandleMouseEnter:function(R){var B=this,L=R.currentTarget,T=B._extractHandleName(L);if(!B.get(m)){B.set(I,T);B.set(z,L);B._setActiveHandlesUI(true);B._updateChangeHandleInfo(T);}},_onHandleMouseLeave:function(L){var B=this;if(!B.get(m)){B._setActiveHandlesUI(false);}},_valueWrapper:function(){var B=this,R=B.get(n),L=R.get(e),T=R;if(B.get(ag)){T=O.Node.create(B.WRAP_TEMPLATE);if(L){L.insertBefore(T,R);}T.append(R);B._copyStyles(R,T);R.setStyles({position:az,left:0,top:0});}return T;}});O.each(O.Resize.prototype.ALL_HANDLES,function(L,B){O.Resize.ATTRS[aB(L)]={setter:function(){return this._buildHandle(L);},value:null,writeOnce:true};});},"@VERSION@",{skinnable:true,requires:["base","widget","substitute","event","oop","dd-drag","dd-delegate","dd-drop"]});YUI.add("resize-constrain",function(c){var j=c.Lang,p=j.isBoolean,t=j.isNumber,r=j.isString,z=function(G){return(G instanceof c.Node);},C="borderBottomWidth",g="borderLeftWidth",y="borderRightWidth",k="borderTopWidth",n="bottom",m="con",D="constrain",E="host",s="left",i="maxHeight",v="maxWidth",a="minHeight",l="minWidth",F="node",b="offsetHeight",o="offsetWidth",e="preserveRatio",x="region",u="resizeConstrained",q="right",f="tickX",d="tickY",w="top",B="view",A="viewportRegion";function h(){h.superclass.constructor.apply(this,arguments);}c.mix(h,{NAME:u,NS:m,ATTRS:{constrain:{setter:function(G){if(G&&(z(G)||r(G)||G.nodeType)){G=c.one(G);}return G;}},minHeight:{value:15,validator:t},minWidth:{value:15,validator:t},maxHeight:{value:Infinity,validator:t},maxWidth:{value:Infinity,validator:t},preserveRatio:{value:false,validator:p},tickX:{value:false},tickY:{value:false}}});c.extend(h,c.Plugin.Base,{constrainBorderInfo:null,initializer:function(){var G=this,H=G.get(E);G.constrainBorderInfo={bottom:0,left:0,right:0,top:0};H.delegate.dd.plug(c.Plugin.DDConstrained,{tickX:G.get(f),tickY:G.get(d)});H.after("resize:align",c.bind(G._handleResizeAlignEvent,G));H.on("resize:start",c.bind(G._handleResizeStartEvent,G));},_checkConstrain:function(H,Q,I){var N=this,M,J,K,P,O=N.get(E),G=O.info,L=N._getConstrainRegion();if(L){M=G[H]+G[I];J=L[Q]-N.constrainBorderInfo[Q];if(M>=J){G[I]-=(M-J);}K=G[H];P=L[H]+N.constrainBorderInfo[H];if(K<=P){G[H]+=(P-K);G[I]-=(P-K);}}},_checkHeight:function(){var G=this,I=G.get(E),K=I.info,H=G.get(i),J=G.get(a);G._checkConstrain(w,n,b);if(K.offsetHeight>H){I._checkSize(b,H);}if(K.offsetHeight<J){I._checkSize(b,J);}},_checkRatio:function(){var U=this,N=U.get(E),T=N.info,J=N.originalInfo,M=J.offsetWidth,V=J.offsetHeight,L=J.top,W=J.left,P=J.bottom,S=J.right,I=function(){return(T.offsetWidth/M);},K=function(){return(T.offsetHeight/V);},O=N.changeHeightHandles,G,X,Q,R,H,Y;if(U.get(D)&&N.changeHeightHandles&&N.changeWidthHandles){Q=U._getConstrainRegion();X=U.constrainBorderInfo;G=(Q.bottom-X.bottom)-P;R=W-(Q.left+X.left);H=(Q.right-X.right)-S;Y=L-(Q.top+X.top);if(N.changeLeftHandles&&N.changeTopHandles){O=(Y<R);}else{if(N.changeLeftHandles){O=(G<R);}else{if(N.changeTopHandles){O=(Y<H);}else{O=(G<H);}}}}if(O){T.offsetWidth=M*K();U._checkWidth();T.offsetHeight=V*I();}else{T.offsetHeight=V*I();U._checkHeight();T.offsetWidth=M*K();}if(N.changeTopHandles){T.top=L+(V-T.offsetHeight);}if(N.changeLeftHandles){T.left=W+(M-T.offsetWidth);}c.each(T,function(aa,Z){if(t(aa)){T[Z]=Math.round(aa);}});},_checkRegion:function(){var G=this,H=G.get(E),I=G._getConstrainRegion();return c.DOM.inRegion(null,I,true,H.info);},_checkWidth:function(){var G=this,J=G.get(E),K=J.info,I=G.get(v),H=G.get(l);G._checkConstrain(s,q,o);if(K.offsetWidth<H){J._checkSize(o,H);}if(K.offsetWidth>I){J._checkSize(o,I);
}},_getConstrainRegion:function(){var G=this,I=G.get(E),H=I.get(F),K=G.get(D),J=null;if(K){if(K==B){J=H.get(A);}else{if(z(K)){J=K.get(x);}else{J=K;}}}return J;},_handleResizeAlignEvent:function(I){var G=this,H=G.get(E);G._checkHeight();G._checkWidth();if(G.get(e)){G._checkRatio();}if(G.get(D)&&!G._checkRegion()){H.info=H.lastInfo;}},_handleResizeStartEvent:function(H){var G=this;G._updateConstrainBorderInfo();},_updateConstrainBorderInfo:function(){var H=this,I=H.get(D),G;if(z(I)){G=function(J){return parseFloat(I.getStyle(J))||0;};H.constrainBorderInfo.bottom=G(C);H.constrainBorderInfo.left=G(g);H.constrainBorderInfo.right=G(y);H.constrainBorderInfo.top=G(k);}}});c.namespace("Plugin");c.Plugin.ResizeConstrained=h;},"@VERSION@",{requires:["resize-base","plugin"],skinnable:false});YUI.add("resize",function(a){},"@VERSION@",{use:["resize-base","resize-constrain"]});