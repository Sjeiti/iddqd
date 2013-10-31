/* global iddqd */
iddqd.ns('iddqd.jsonp',(function(){
	'use strict';
	var iNr = 2222;
	return function(uri,callback){
		iNr++;
		var sCallback = 'rvjsonp'+iNr
			,mScript = document.createElement('script');
		mScript.src = uri+'&callback='+sCallback;
		document.getElementsByTagName('head')[0].appendChild(mScript);
		window[sCallback] = function(data) {
			callback(data);
			mScript.parentNode.removeChild(mScript);
			delete window[sCallback];
		};
	};
})());