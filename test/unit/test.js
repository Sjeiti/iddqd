/*global QUnit*/
(function(){
	'use strict';

	QUnit.config.hidepassed = true;
	var sSourcePath = '../../src/'
			,sTestPrefix = 'test-'
		,aTests = [
			'iddqd.js'
			,'iddqd.type.js'
			,'iddqd.capabilities.js'
			,'iddqd.environment.js'
			,'iddqd.internal.js'
			,'iddqd.internal.host.node.js'
			,'iddqd.internal.native.string.js'
			,'iddqd.internal.native.array.js'
			,'iddqd.internal.native.number.js'
			,'iddqd.internal.native.object.js'
			,'iddqd.internal.native.date.js'
			,'iddqd.math.color.js'
			,'iddqd.math.prng.js'
			,'iddqd.math.vector.js'
			,'iddqd.network.jsonp.js'
			,'iddqd.pattern.js'
			,'iddqd.storage.js'
			,'iddqd.storage.cookie.js'
			,'iddqd.signal.js'
			,'iddqd.image.js'
		];
	// todo iddqd.log.js
	// todo iddqd.image.js
	// todo iddqd.style.js
	// todo iddqd.ui.scroll.js
	// todo iddqd.utils.ga.js
	// todo iddqd.network.jsonp
	// todo iddqd.network.xhttp
	// todo iddqd.signal.DOMReady
	// todo iddqd.signal.readyState
	// todo iddqd.signal.resize
	// todo iddqd.signal.breakpoint
	/*
	todo: iddqd.requestAnimationFrame fails
	module('iddqd.requestAnimationFrame.js');
	asyncTest('iddqd.requestAnimationFrame',function () {
		iddqd.requestAnimationFrame(next);
		function next(imageLoaded){
			ok(true,'requestAnimationFrame');
			start();
		}
	});
	*/
	aTests.forEach(function(name){
		/*jslint evil: true */
		document.write('<script src="'+sSourcePath+name+'"></script>');
		document.write('<script src="'+sTestPrefix+name+'"></script>');
	});
})();