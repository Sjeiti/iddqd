/* global module, ok, asyncTest, start */
(function(){
	'use strict';

	module('iddqd.image.js');
	asyncTest('iddqd.image.load uri',function () {
		var sImageUri = 'data/image320.jpg'
			,sImageName = sImageUri.split('/').pop()
			,oImageLoad = iddqd.image.load(sImageUri,loadCallback);
		ok(!!oImageLoad.load,'oImageLoad.load');
		ok(oImageLoad.getResult()===undefined,'oImageLoad.getResult undefined');
		function loadCallback(imageLoaded){
			ok(true,'loadCallback');
			ok(oImageLoad.getResult()===imageLoaded,'oImageLoad.getResult');
			ok(imageLoaded.width===320,'width');
			ok(imageLoaded.height===256,'height');
			ok(imageLoaded.uri===sImageUri,'uri');
			ok(imageLoaded.name===sImageName,'name');
			ok(imageLoaded.type==='jpg','type');
			start();
		}
	});
	/*asyncTest('iddqd.image.load anonymous',function () {
		var sImageUri = 'data/image.php?img=image320.jpg&foobar'
			,sImageName = sImageUri.split('/').pop()
			,oImageLoad = iddqd.image.load(sImageUri,loadCallback);
		ok(!!oImageLoad.load,'oImageLoad.load');
		ok(oImageLoad.getResult()===undefined,'oImageLoad.getResult undefined');
		function loadCallback(imageLoaded){
			ok(true,'loadCallback');
			ok(oImageLoad.getResult()===imageLoaded,'oImageLoad.getResult');
			ok(imageLoaded.width===320,'width');
			ok(imageLoaded.height===256,'height');
			ok(imageLoaded.uri===sImageUri,'uri');
			ok(imageLoaded.name===sImageName,'name');
			ok(imageLoaded.type==='jpg&foobar','type'); // todo: wrong
			start();
		}
	});*/
	asyncTest('iddqd.image.load error',function () {
		var sImageUri = 'data/image.gif'
			,oImageLoad = iddqd.image.load(sImageUri,iddqd.fn,loadError);
		ok(!!oImageLoad.load,'oImageLoad.load');
		ok(oImageLoad.getResult()===undefined,'oImageLoad.getResult undefined');
		function loadError(error){
			ok(true,'loadError');
			ok(iddqd.type(error)===iddqd.type.EVENT,'event');
			ok(error.type==='error','type is error');
			start();
		}
	});
})();