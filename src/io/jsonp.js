/**
 * Do a jsonp request
 * @module io/jsonp
 * @param {string} uri
 * @param {Function} callback
 **/
export default (function(){
	var iNr = 2222;
	return (uri,callback)=>{
		iNr++;
		var sCallback = 'rvjsonp'+iNr
			,mScript = document.createElement('script');
		mScript.src = uri+'?callback='+sCallback;
		document.getElementsByTagName('head')[0].appendChild(mScript);
		window[sCallback] = function(data) {
			callback(data);
			mScript.parentNode.removeChild(mScript);
			delete window[sCallback];
		};
	};
})();