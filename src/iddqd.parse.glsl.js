iddqd.ns('iddqd.parse.glsl',(function(){
	'use strict';

	var xhttp = iddqd.network.xhttp;

	function parse(uri){
		var defer = Promise.defer()
			,promise = defer.promise;
		xhttp(uri,handleXHR.bind(null,defer));
		return promise;
	}

	function handleXHR(defer,request){
		var responseText = request.responseText
			,includes = responseText.match(/\n\s*\#include\s+"[^"]+"|\n\s*\#include\s+<[^>]+>/g)||[]
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
		Promise.all(promises).then(handleParseInclude.bind(null,defer,request,responseText,includes));
	}

	function handleParseInclude(defer,request,responseText,includes,results){
		for (var i=0,l=includes.length;i<l;i++) {
			var include = includes[i]
				,result = results[i];
			responseText = responseText.replace(include,'\n'+result);
		}
		defer.resolve(responseText);
	}

	return parse;
})());