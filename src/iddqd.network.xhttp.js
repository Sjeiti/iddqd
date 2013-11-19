/* global ActiveXObject */
/**
 * Do an xhttp request
 * @name iddqd.network.xhttp
 * @method
 * @param {string} url
 * @param {Function} callback
 * @param {Object} postData
 **/
iddqd.ns('iddqd.network.xhttp',(function(){
	'use strict';
	var XMLHttpFactories = [
		function () {return new XMLHttpRequest();},
		function () {return new ActiveXObject("Msxml2.XMLHTTP");},
		function () {return new ActiveXObject("Msxml3.XMLHTTP");},
		function () {return new ActiveXObject("Microsoft.XMLHTTP");}
	];

	function sendRequest(url,callback,postData) {
		var req = createXMLHTTPObject();
		if (!req) return;
		var method = (postData) ? "POST" : "GET";
		req.open(method,url,true);
		//req.setRequestHeader('User-Agent','XMLHTTP/1.0');
		if (postData)
			req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		req.onreadystatechange = function () {
			if (req.readyState != 4) return;
			if (req.status != 200 && req.status != 304) {
				alert('HTTP error ' + req.status);
				return;
			}
			callback(req);
		};
		if (req.readyState == 4) return;
		req.send(postData);
	}

	/**
	 * Create an xhttp object
	 * @name iddqd.network.xhttp
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

	sendRequest.createObject = createXMLHTTPObject;

	return sendRequest;
})());