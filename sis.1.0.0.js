/*
	SIS 1.0 || Company: Empire Games
	Message: EmpireGames Use sis as a plugin for the creation of games on the page and in its emulator

*/
var $,sis;
(function(window,document){
	//"use strict";
	function parseInts(string){
		var s = string.split("");
		var g = "";
		for(var i = 0; i < s.length; i++){
			if( s[i] == "." || isNaN(parseInt(s[i])) == false){
				g+=s[i];
			}else{
				break;
			}
		}
		g = g?g:"0";
		return eval("("+g+")");
	}
	function todCss(g){
		if(window.getComputedStyle){
			return window.getComputedStyle(g);
		}else{

		}
	}
	/* Object */
	var animations = {};
	var S =	{
		fnA:{
			cl:function(g){
				if(g!==null && (g.nodeType==1 || g.nodeType==11 || g.nodeType==9)){
					
					var css = todCss(g);
					
					var element = new S.fn.init("<"+g.tagName+">");
					element.css(css);
					if(g.hasAttributes()){
						var atr = g.attributes;
						for(var i = 0; i < atr.length; i++){
							element.attr(atr[i].name,atr[i].value);
						}
					}
					if(g.innerHTML){
						element.html(g.innerHTML);
					}
					return element;
				}else{
					return new S.fn.init(null);
				}
			},
			TPX:function(e,t){
				var j = {
					"px":1,
					"cm": 96,
					"mm":96/10,
					"in":2.54*96,
					"pc":(2.54*96) /16,
					"pt":(2.54*96) / 72
				}
				return e*j[t];
			},
			reviser:function(e){
				e = e.split(".");
				e[1]?e=e[1]:e=e[0];
				var s = e.split("");
				var string = "";
				for(var i = 0; i < s.length; i++){
					var h = parseInt(s[i]);
					if(h >= 0 && h <= 9){

					}else{
						string = e.substring(i-1,e.length);
					}
				}
				return string;

			},
			OA:function(obj){
				var j = [Object.keys(obj),Object.values(obj)];
				var fo = new FormData();
				for(var i = 0; i < j[0].length; i++){
					fo.append(j[0][i],j[1][i]);
				}
				return fo;
			},
			css:function(e,i,object){
				if(Array.isArray(e)){
					var array = [];
					for(var i = 0; i < e.length; i++){
						array.push(S.fnA.css(e[i],null,object));
					}
					return array;
				}else if(typeof e =="object"){
					var obje = [Object.keys(e),Object.values(e)];
					for(var i = 0; i < obje[0].length; i++){
						S.fnA.css(obje[0][i],obje[1][i],object);
					}
				}else if(e && (typeof i =="string")){
					var type = i.substring(0,2);
					if(type=="-="){
						i = i.substring(2);
						var style = parseInts(object.style[e]);
						style = isNaN(style)?0:style;
						var top = parseInts(i);
						var total = S.fnA.TPX(top,S.fnA.reviser(i));
						object.style[e] = "-"+(total-style)+"px";
					}else if(type =="+="){
						i = i.substring(2);
						var style = parseInts(object.style[e]);
						style = isNaN(style)?0:style;
						var top = parseInts(i);

						var total = S.fnA.TPX(top,S.fnA.reviser(i));
						object.style[e] = "+"+(total+style)+"px";
					}else{
						object.style[e] = i;
					}
				}else if(typeof e == "string"){
					if(object.style){
						return object.style[e];
					}else{
						return "";
					}
				}
			},
			isNumber:function(e){
				var string = "";
				var s = e.split("");
				for(var i = 0; i < s.length; i++){
					if(isNaN(parseInt(s[i]))){

					}else{
						string = e.substring(i-1,s.length);
					}
				}
				return parseInts(string);
			},
			getAnimation:function(){
				var t = Math.round(Math.random() * 1000000);
				while(animations[t]){
					t = Math.round(Math.random() * 1000000);
				}
				return t;
			},
			/*createAnimation:function(object,time,ele,a){
				time = time / 1000;
				ele.setAttribute("animationForSis",a);
				var style = document.createElement("style");
				style.setAttribute("type","text/css");
				var name = ele.tagName+"ElementAnimation";
				var text = "0%{";
				var cien = "100%{";
				var q = Object.keys(object);
				var css = window.getComputedStyle(ele);
				for(var i = 0; i < q.length; i++){
					var r = q[i];
					text+=r+":"+css[r]+";";
					cien+=r+":"+S.fnE.transform(object[r],css.left)+";";
				}
				animations[a] = {style:style,name:name};
				text+="}";
				var total = text+"\n"+cien+"}";
				var webkit = "@keyframes "+name+"{"+total+"}";
				style.innerHTML = webkit;
				document.head.appendChild(style);
				ele.style.animation = name+" "+time+"s";
				ele.onanimationend = ()=>{
					document.head.removeChild(style);
					ele.style.animation = "";
					ele.removeAttribute("animationForSis");
					S.fnA.css(object,null,ele);

				}

			},
			stopAnimation:function(ele){
				ele.style["animation-play-state"] = "paused";
				var w = window.getComputedStyle(ele);
				ele.style.animation = "";
				ele.removeAttribute("animationForSis");
				document.head.removeChild(ele);
			}*/
			createAnimation:function(object,time,ele,a){
				if(ele.setAttribute){
					ele.setAttribute("animationForSis",a);
					var obj =window.getComputedStyle(ele);
					var k = {};
					var s = Object.keys(object);
					for(var i = 0; i < s.length; i++){
						var n = s[i];
						k[n] = obj[n];
						object[n] = S.fnE.transform(object[n],obj[n]);
					}
					animations[a] = ele.animate([
						k,
						object
						],
						{duration:time,iterationComposite:true}
					);
					animations[a].onfinish = ()=>{
						S.fnA.css(object,null,ele);
						ele.removeAttribute("animationForSis");
					}
				}
				
			},
			stopAnimation:function(ele){
				if(ele.getAttribute){
					var a = ele.getAttribute("animationForSis"); 
					animations[a].commitStyles();
					animations[a].cancel();
					ele.removeAttribute("animationForSis");
				}
			},
			emp:function(ele){
				var k = ele.querySelectorAll("*");
				for(var i = 0; i < k.length; i++){
					ele.removeChild(k[i]);
				}
				ele.innerText = "";
			}
		},
		fnE:{
			transform:function(e,i){
				var r = e.substring(0,2);
				if(r=="+=" || r=="-="){
					e=e.substring(2);
					var k = S.fnA.reviser(e);
					var t = S.fnA.TPX(parseInt(e),k);
					var k2 = S.fnA.reviser(i);
					var f = S.fnA.TPX(parseInt(i),k2);
					var total = f+t;
					return total+"px";

				}else{
					return e;
				}
			},
			nx:function(g){
				if(g!==null){
					var k = (g.nextElementSibling);
					return new S.fn.init(k?k:null);
				}
			},
			text:function(g,e){
				if((e || e=="") && g){
					g.innerText = e;
				}else{
					return g && typeof g.innerText =="string"?g.innerText:"";
				}
			},
			html:function(g,e){
				if(e || e=="" && g){
					g.innerHTML = e;
				}else{
					return g && typeof g.innerHTML =="string"?g.innerHTML:"";
				}
			},
			eA:function(g,e){
				for(var i = 0; i < g.length; i++){
					var k = e.bind(g[i]);
					e(i+1);
				}
			},
			val:function(g,e){
				if((e == "" || e) && g){
					g.value = e;
				}else{
					return g && g.value?g.value:"";
				}
			},
			src:function(g,e){
				if(e || e==""){
					g.src = e;
				}else{
					return g!==null  && g.src?g.src:"";
				}
			},
			A:function(g,o){
				if(g && g.setAttribute && (o[1] == "" || o[1])){
					g.setAttribute(o[0],o[1]);
				}else{
					return g && g.getAttribute?g.getAttribute(o[0]):"";
				}
			},
			rA:function(g,o){
				if(g && g.removeAttribute){
					g.removeAttribute(o);
				}
			}
		},
		fn:{
			start:function(e,q){
				var g;
				if(typeof e == "object"){
					g = Array.isArray(e)?e:[e];
				}else{
					g = document.querySelectorAll(e);
				}
				var t = g;
				t.__proto__ = {
					length: g.length,
					sis: "1.0.0",
					/* TEXT */
					text:function(e){
						return S.fnE.text(g[0],e);
					},
					html:function(e){
						return S.fnE.html(g[0],e)
					},
					val:function(e){
						return S.fnE.val(g[0],e);
					},
					src:function(e){
						return S.fnE.src(g[0],e);
					},
					/*POSITION*/
					offsetTop:function(){
						if(typeof g[0] == "object" && g[0] !== null){
							var top = g[0].offsetTop;
							typeof top !=="number"?top=0:top=top;
							return top;
						}else{
							return 0;
						}
					},
					offsetLeft:function(){
						if(typeof g[0] == "object" && g[0] !== null){
							var left = g[0].offsetLeft;
							typeof left !=="number"?left=0:left=left;
							return left;
						}else{
							return 0;
						}
					},
					offset:function(){
						
						return {
							left:this.offsetLeft(),
							top:this.offsetTop()
						}
						
					},
					offsetParent:function(){
						if(typeof g[0] == "object" && g[0]){
							return g[0].offsetParent;
						}
					},
					position:function(){
						if(typeof g[0] == "object" && g[0]){
							if(g[0].getBoundingClientRect){
								return g[0].getBoundingClientRect();
							}else{
							    var _x = 0;
							    var _y = 0;
							    var el = g[0];
							    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
							        _x += el.offsetLeft - el.scrollLeft;
							        _y += el.offsetTop - el.scrollTop;
							        el = el.offsetParent;
							    }
							    return { top: _y, left: _x };
							}
						}else{
							return {
								left:0,
								top:0
							}
						}
					},
					/* ATTRIBUTOS */
					attr:function(e,i){
						return S.fnE.A(g[0],[e,i]);
					},
					removeAttr:function(e){
						S.fnE.rA(g[0],e)
					},
					each:function(e){
						S.fnE.eA(g,e);
					},
					/* EVENT */
					on:function(e,i,o){
						if(g[0] && g[0].addEventListener){
							g[0].addEventListener(e, i, o);
						}
					},
					submit:function(e){
						if(typeof e == "function"){
							this.on("submit",e);
						}else{
							return g[0].submit?g[0].submit():null;
						}
					},
					click:function(e){
						if(e){
							this.on("click",e);
						}else{
							g[0].click?g[0].click():null;
						}
					},
					focus:function(e){
						if(e){
							this.on("focus",e);
						}else{
							g[0].focus?g[0].focus():null;
						}
					},
					change:function(e){
						this.on("change",e);
					},
					dblclick:function(e){
						this.on("dblclick",e);
					},
					keydown:function(e){
						this.on("keydown",e);
					},
					keypress:function(e){
						this.on("keypress",e);
					},
					keyup:function(e){
						this.on("keyup",e);
					},
					blur:function(e){
						this.on("blur",e);
					},
					contextmenu:function(e){
						this.on("contextmenu",e);
					},
					/* DOM */
					has:function(s){
						return new S.fn.init(g[0].querySelector(s));
					},
					append:function(e){
						var val = e.nodeType==1 || e.nodeType==11 || e.nodeType==9?e:(typeof e=="string")?S.fn.init(e)[0]:e[0];
						if(val){
							g[0].appendChild(val);
						}
						
					},
					empty:function(){
						if(g[0] !== null){
							g[0].innerHTML = "";
							if(g[0].innerHTML){
								S.fnA.emp(g[0]);
							}
						}
					},
					next:function(){
						return S.fnE.nx(g[0]);
					},
					remove:function(e){
						var val = e.nodeType==1 || e.nodeType==11 || e.nodeType==9?e:e[0];
						if(val){
							g[0].removeChild(val);
						}			
					},
					clone:function(){
						return S.fnA.cl(g[0]);
					},
					before:function(e){
						return new S.fn.init(g[0]);
					},
					after:function(){
						return new S.fn.init(g[g.length-1]);
					},
					/* CSS */
					css:function(e,i){
						return S.fnA.css(e,i,g[0]);
					},
					hide:function(){
						S.fnA.css("display","none");
					},
					show:function(){
						S.fnA.css("display","block");
					},
					width:function(e){
						return this.css("width",e);
					},
					height:function(e){
						return this.css("height",e);
					},

					/* ANIMATIONS */
					animate:function(object,s){
						var h = S.fnA.getAnimation();
						if(g!==null && g.getAttribute && !g[0].getAttribute("animationForSis")){
							S.fnA.createAnimation(object,s,g[0],h);
						}
					},
					stop:function(){
						return S.fnA.stopAnimation(g[0]);
					},
					/* SCROLL */
					scroll:function(left,top){
						g[0].scroll(left,top);
					},
					scrollTop:function(top){
						if(!top){
							return g[0].scrollTop;
						}else{
							g[0].scrollTop = top;
						}
					},
					scrollLeft:function(left){
						if(!left){
							return g[0].scrollLeft;
						}else{
							g[0].scrollLeft = left;
						}
					}
				};
				return t;

			},
			init:function(e){
				if(typeof e == "string" && e.substring(0,1) == "<"){
 					var h = e.substring(1);
 					h = h.substring(0,h.indexOf(">"));
 					var s = h.split(" ");
 					var name = s[0];
 					var c = document.createElement(name);
 					function newAttr(n,v){
 						c.setAttribute(n,v);
 					}
 					for(var i = 1; i < s.length;i++){
 						var k = s[i].split("=");
 						var n = s[i+1];
 						var string = k[1];
 						if(string){

							var g = string.substring(0,1);
	 						
	 						if( g == '"' || g =="'"){

	 							var l = string.substring(1);
	 							
	 							if(l.indexOf(g)>=0){
	 								newAttr(k[0],l.substring(0,l.indexOf(g)))
	 							}else{
	 								for(var m=i+1; m < s.length; m++){
	 									if(s[m].indexOf(g) > 0){
	 										l += " "+s[m].substring(0,s[m].indexOf(g));
	 										i=m;

	 										break;
	 									}else{
	 										l+= " "+s[m];

	 									}
	 								}
	 								newAttr(k[0],l)
	 							}
	 						}else{
	 							newAttr(k[0],string);
	 						}
 						}
 					}
 					var isset = "</"+name+">";
 					if(e.lastIndexOf(isset)>0){
 						var html = e.substring(e.indexOf(">")+1,e.lastIndexOf(isset));
 						c.innerHTML = html;
 					}
 					this.__proto__ =  S.fn.start(c);
				}else{
					this.__proto__ = S.fn.start(e,e);
				}
			}
		}
	};

	sis = function(e){
		if(typeof e == "function"){
			sis(window).on("load",e);
		}else{
			
			return new S.fn.init(e);

		}

	};
	sis.url = {
		get:function(){
			try{
				var tod = window.location.search.substring(1);
				var get = {};
				var s = tod.split("&");
				for(var i = 0; i < s.length; i++){
					var h = s[i].split("=");
					var name = decodeURI(h[0].replace(/\+/g," "));
					get[name] = decodeURI(h[1].replace(/\+/g," "));
				}
				return get;
			}catch(e){
				console.warn("error avoided: "+e);
				return {};
			}
		},
		hash:function(){
			return window.location.hash.substring(1);
		}
	}

	/* BLOB */
	sis.blob = function(content,type){
		if(window.Blob){
			content = Array.isArray(content)?content:[content];
			var blob = new Blob(content,{type:type});
			return URL.createObjectURL(blob);
		}
	}
	sis.saveAs = function(object){
		var a = sis("<a href='"+object.url+"' download='"+object.name+"'></a>");
		document.body.appendChild(a[0]);
		a.click();
		document.body.removeChild(a[0]);
	}
	/* AJAX */
	sis.ajax = function(obj){
		if(window.XMLHttpRequest){
			obj.data = obj.data || {};
			var i = obj.data instanceof FormData;
			obj.data = typeof obj.data =="object" && i == false?S.fnA.OA(obj.data):obj.data;
			obj.type = obj.type || "GET";
			var ajax = new XMLHttpRequest();
			ajax.open(obj.type,obj.url);
			obj.dataType = obj.dataType || "text";
			ajax.responseType = obj.dataType;
			obj.beforeSend?obj.beforeSend(ajax):null;
			ajax.onprogress = function(event){
				obj.progress?obj.progress(event):null;
			};
			ajax.onload = function(){
				
				obj.complete?obj.complete(ajax.status,ajax):null;
				if(ajax.status == 200){
					obj.success?obj.success(ajax.response,ajax.status,ajax):null;
				}else{
					obj.error?obj.error(ajax,ajax.status):null;					
				}
			}

			ajax.send(obj.data);
		}
	}
	sis.post = function(url,data,success,dataType){
		success = (!success && typeof data =="function")?data:success;
		data = typeof data =="function"?"":data;
		sis.ajax({
			url:url,
			type:"POST",
			data:data,
			dataType:dataType,
			success:success

		}) 
	}
	sis.get = function(url,data,success,dataType){
		success = (!success && typeof data =="function")?data:success;
		data = typeof data =="function"?"":data;
		if(typeof data == "object"){
			var tem = data; 
			var t = Object.keys(tem);
			data = "?";
			for(var i = 0; i < t.length; i++){
				var h = t[i];
				data += h+"="+tem[h]+"&";
			}
			data = data.substring(0,data.length-1);
			url+=data;
		}
		sis.ajax({
			url:url,
			type:"GET",
			success:success,
			dataType:dataType
		})
	}
	/* COOKIE */
	sis.cookie = function(){
		var cookie = {};
		var s = document.cookie.split(";");
		for(var i = 0; i < s.length; i++){
			var f = s[i].split("=");
			var n = f[0];
			n = n.substring(0,1) == " "?n.substring(1):n;
			cookie[n] = f[1];
		}
		return cookie;
	}
	/* SCROLL */
	sis.scroll = function(obj){
		obj.duration = !obj.duration?0:obj.duration;
		obj.left = !obj.left?window.scrollLeft:obj.left;
		obj.top = !obj.top?window.scrollTop:obj.top;
		if(obj.duration === 0){
			window.scroll(obj.left,obj.top);
		}else{
			if(!document.querySelector("wc-scrollanimation")){
				var l = sis("<wc-scrollanimation>");
				l.css({
					left:document.documentElement.scrollLeft+"px",
					display:"block",
					top:document.documentElement.scrollTop+"px",
					position:"absolute",
					width:"100%",
					height:"1px",
					opacity:0
				});
				var animate = l[0].animate([
				{
					left:document.documentElement.scrollLeft+"px",
					top:document.documentElement.scrollTop+"px"
				},
				{
					left:obj.left+"px",
					top:obj.top+"px"
				}
				],{duration:obj.duration});
				setInterval(()=>{
					animate.commitStyles();
					window.scrollTo(parseInts(l.css("left")),parseInts(l.css("top")))
				},1)
				animate.onfinish = function(){
					sis("body").remove(l);
					clearInterval(interval);
				}
				sis("body").append(l);
			}
		}
	}
	sis.vertion = "1.0.0";
	$ = sis;
	if(typeof module == "object" && module.exports){
		module.exports = sis;
	};
})(window,document);
