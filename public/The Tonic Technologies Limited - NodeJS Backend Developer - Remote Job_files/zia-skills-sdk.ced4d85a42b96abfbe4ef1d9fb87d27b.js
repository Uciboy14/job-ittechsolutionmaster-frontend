if(typeof ziaskills === "undefined"){
	var ziaskills={};
	let versions = {};
	Object.defineProperty(versions,"sdk",{ //NO I18N
		value:"3.0.0", //NO I18N
		writable:false
	})
	Object.defineProperty(versions,"lyteuicomp",{ //NO I18N
		value:"3.19.1", //NO I18N
		writable:false
	})
	Object.defineProperty(versions,"clientutils",{ //NO I18N
		value:"1.0.2", //NO I18N
		writable:false
	})
	Object.defineProperty(ziaskills,"versions",{ //NO I18N
		value:versions,
		writable:false
	})
}

if(typeof ziapf === "undefined"){
	var ziapf={};
}

if(typeof _ziaskills === "undefined"){
	var _ziaskills={};
}

if(typeof ziapf.url_templates === "undefined"){
	ziapf.url_templates = {};
}

ziaskills.init = function(info){
	if(typeof info.zia_url === "undefined" || typeof info.zia_url !== "string"){
		alert("either zia_url is missing or is not a string"); //NO I18N
		return;
	}
	if(typeof info.api_namespace !== "undefined"){
		let namespace = info.api_namespace
		if(typeof info.api_namespace === "string"){
			namespace = {
				chat_api: info.api_namespace,
				other_api: info.api_namespace
			}
		}
		Object.defineProperty(ziaskills,"api_namespace",{ //NO I18N
			value:namespace,
			writable:false
		});
	}
	else{
		Object.defineProperty(ziaskills,"api_namespace",{ //NO I18N
			value:{},
			writable:false
		});	
	}
	let static_urls = info.static_urls, proceed = false;
	if(typeof static_urls === "string"){
		static_urls = {
			js_static_url:info.static_urls,
			css_static_url:info.static_urls,
			img_static_url:info.static_urls
		}
		proceed = true;
	}
	else if(typeof static_urls === "object"){
		if(typeof static_urls.js_static_url === "undefined" || typeof static_urls.css_static_url ==="undefined" || typeof static_urls.img_static_url ==="undefined"){
			alert("object type static_urls should contain js_static_url, css_static_url & img_static_url"); //NO I18N
			return;
		}
		proceed = true;
	}
	else{
		alert("static_urls should either be a string or an object"); //NO I18N
		return;
	}
	let fingerprints = info.fingerprint_json || {}
	if(info.useOffline){
		Object.defineProperty(ziaskills,'useOffline',{//NO I18N
			value: info.useOffline,
			writable: false
		})
	}
	else{
		Object.defineProperty(ziaskills,'useOffline',{//NO I18N
			value: false,
			writable: false
		})
	}

	if(info.cancel_requests && Object.keys(info.cancel_requests).length){
		let cancel_requests = {};
		for(let api in info.cancel_requests){
			Object.defineProperty(cancel_requests,api,{
				value: info.cancel_requests[api],
				writable: false
			});
		}
		Object.defineProperty(ziaskills,'cancel_requests',{//NO I18N
			value: cancel_requests,
			writable: false
		});
	}

	if(proceed){

		if(info.zia_url.endsWith("/")){
			info.zia_url = info.zia_url.substr(0,info.zia_url.length - 1)
		}

		_ziaskills.isZia = info.isZia;

		_ziaskills.baseUrl = info.zia_url;
		_ziaskills.namespace= ziaskills.api_namespace.other_api || "api/v1"; //NO I18N
		
		_ziaskills.apiUrl=info.zia_url+'/'+_ziaskills.namespace+"/sdkcontract"; //NO I18N
		_ziaskills.backupUrl=info.zia_url+'/'+_ziaskills.namespace+"/sdkcontract"; //NO I18N
		ziapf.apiUrl=info.zia_url+'/'+_ziaskills.namespace+"/sdkcontract"; //NO I18N
        ziapf.backupUrl=info.zia_url+'/'+_ziaskills.namespace+"/sdkcontract"; //NO I18N

		for(let url_type in static_urls){
			ziapf.url_templates[url_type]=static_urls[url_type]
		}
		if(fingerprints) {
			ziapf.url_templates.fingerprints = fingerprints
		}
		var sdk_core = document.createElement('script'), pagehead = document.querySelector('head'); //NO I18N;
		sdk_core.onload = sdk_core.onreadystatechange = function(){
			if ( this.readyState && this.readyState != "complete" && this.readyState != "loaded" ) {
				return; 
			}

			this.onload = this.onreadystatechange = null; // ensure callback is only called once

			if(!_ziaskills.essentials){
				_ziaskills.essentials=true;
				_ziaskills.onEssentials().then(function(){
					if(ziaskills.cancel_requests && ziaskills.cancel_requests.sdkcontract){
						if(ziaChatBot){
							ziaChatBot.component.setData("clientcontract_permission",true); //NO I18N
						}
					}
					else if(_ziaskills.initCount<3){
						_ziaskills.initCount++;
						_ziaskills.getSDKContract(undefined,undefined,false);
					}
				});
			}
			else{
				if(_ziaskills.initCount<3){
					_ziaskills.initCount++;
					_ziaskills.getSDKContract(undefined,undefined,false);
				}
			}

		};
		let sdkCorePath = "addons/@zia/ziaSkillsSdk/assets/js/zia-skills-sdk-core.js", sdkUtilsPath = "addons/@zia/ziaskills-clientutils/assets/js/common-utils.js"; //NO I18N
		sdk_core.src = static_urls.js_static_url+ ((fingerprints) ? fingerprints[sdkCorePath] : sdkCorePath);
		var sdk_utils = document.createElement('script');
		sdk_utils.onload = sdk_utils.onreadystatechange = function(){
			pagehead.appendChild(sdk_core, pagehead);
		};
		sdk_utils.src = static_urls.js_static_url+ ((fingerprints) ? fingerprints[sdkUtilsPath] : sdkUtilsPath);
		if(typeof _ziaskills.isZia === "undefined" || !_ziaskills.isZia){
			pagehead.appendChild(sdk_utils, pagehead);
		}
		else{
			pagehead.appendChild(sdk_core, pagehead);
		}
	}
}
