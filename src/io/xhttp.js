/* global ActiveXObject */
/**
 * Do an xhttp request
 * @module io/xhttp
 * @param {string} url
 * @param {Function} callback
 * @param {Object} postData
 * @returns {XMLHttpRequest}
 **/
export default (function(){
	'use strict';
	// todo: refactor
	var XMLHttpFactories = [
		function () {return new XMLHttpRequest();},
		function () {return new ActiveXObject("Msxml2.XMLHTTP");},
		function () {return new ActiveXObject("Msxml3.XMLHTTP");},
		function () {return new ActiveXObject("Microsoft.XMLHTTP");}
	];

	function sendRequest(url,callback,errorCallback,postData) {
		var oXHR = getXHR()
			,sMethod = (postData)?'POST':'GET';
		if (!oXHR) return;
		oXHR.open(sMethod,url,true);
		//req.setRequestHeader('User-Agent','XMLHTTP/1.0');
		if (postData) {
			oXHR.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		}
		oXHR.onreadystatechange = function () {
			if (oXHR.readyState!=4) return;
			if (oXHR.status!=200 && oXHR.status!=304) {
				errorCallback('HTTP error ' + oXHR.status); // todo: check error stati and flow
				return;
			}
			callback(oXHR);
		};
		if (oXHR.readyState==4) return;
		oXHR.send(postData);
		return oXHR;
	}

	/**
	 * Create an xhttp object
	 * @name iddqd.network.xhttp.create
	 * @method
	 * @return {XMLHttpRequest}
	 **/
	function getXHR() {
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
	sendRequest.create = getXHR;

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
})();