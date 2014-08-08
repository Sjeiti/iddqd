/* global ActiveXObject */
/**
 * Do an xhttp request
 * @name iddqd.network.xhttp
 * @method
 * @param {string} url
 * @param {Function} callback
 * @param {Object} postData
 * @returns {XMLHttpRequest}
 **/
iddqd.ns('iddqd.network.xhttp',(function(){
	'use strict';
	var XMLHttpFactories = [
		function () {return new XMLHttpRequest();},
		function () {return new ActiveXObject("Msxml2.XMLHTTP");},
		function () {return new ActiveXObject("Msxml3.XMLHTTP");},
		function () {return new ActiveXObject("Microsoft.XMLHTTP");}
	];

	function sendRequest(url,callback,errorCallback,postData) {
		var req = createXMLHTTPObject();
		if (!req) return;
		var method = (postData) ? "POST" : "GET";
		req.open(method,url,true);
		//req.setRequestHeader('User-Agent','XMLHTTP/1.0');
		if (postData) {
			req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		}
		req.onreadystatechange = function () {
			if (req.readyState!=4) return;
			if (req.status!=200 && req.status!=304) {
				errorCallback('HTTP error ' + req.status); // todo: check error stati and flow
				return;
			}
			callback(req);
		};
		if (req.readyState==4) return;
		req.send(postData);
		return req;
	}

	/**
	 * Create an xhttp object
	 * @name iddqd.network.xhttp.create
	 * @method
	 * @return {XMLHttpRequest}
	 **/
	function createXMLHTTPObject() {
		var xmlhttp = false;
		for (var i=0;i<XMLHttpFactories.length;i++) {
			try {
				xmlhttp = XMLHttpFactories[i]();
			} catch (e) {
				continue;
			}
			break;
		}
		return xmlhttp;
	}
	sendRequest.create = createXMLHTTPObject;

	return sendRequest;
//[
//	'Content-length'
//	//
//	,'Cache-Control'
//	,'Content-Language'
//	,'Content-Type'
//	,'Expires'
//	,'Last-Modified'
//	,'Pragma'
//	,'Pragma'
//	//
//	,'Access-Control-Request-Method'
//	,'Access-Control-Request-Headers'
//	,'Access-Control-Allow-Origin'
//	,'Access-Control-Allow-Credentials'
//	,'Access-Control-Expose-Headers'
//	,'Access-Control-Max-Age'
//	,'Access-Control-Allow-Methods'
//	,'Access-Control-Allow-Headers'
//	//
//	,'Content-Transfer-Encoding'
//]
})());