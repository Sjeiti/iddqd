iddqd.ns('iddqd.parse.glsl',(function(){
	'use strict';

	var xhttp = iddqd.network.xhttp;

	function parse(uri){
		return new Promise(function(resolve,reject){
			//XMLHttpRequest
			xhttp(uri,handleXHR.bind(null,resolve,reject));
		});
	}

	function handleXHR(resolve,reject,request){
		var responseText = request.responseText
			,includes = responseText.match(/\n*\#include\s+"[^"]+"|\n*\#include\s+<[^>]+>/g)||[]
			,promises = [];
		if (includes) {
			for (var i=0,l=includes.length;i<l;i++) {
				var include = includes[i]
					,matchIncludeUri = include.match(/"([^"]+)"|<([^>]+)>/)
					,includeUri = matchIncludeUri&&(matchIncludeUri[1]||matchIncludeUri[2])
					,promise = parse(includeUri);
				promises.push(promise);
			}
		}
		Promise.all(promises)
			.then(handleParseInclude.bind(null,resolve,reject,request,responseText,includes));
	}

	function handleParseInclude(resolve,reject,request,responseText,includes,results){
		for (var i=0,l=includes.length;i<l;i++) {
			var include = includes[i]
				,result = results[i];
			responseText = responseText.replace(include,'\n'+result);
		}
		resolve(responseText);
	}

	return parse;

})());





