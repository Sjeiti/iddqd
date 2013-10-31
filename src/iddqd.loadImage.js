/* global iddqd */
/*! loadImage */
// todo: document
iddqd.ns('iddqd.loadImage',function(uri,callback,error){
	'use strict';
	var  mImgLoader = document.createElement('img')
		,sUri = uri
		,fnCallback = callback
		,fnError = error
		,oResult
		,mCanvas
		,oContext
		,bCanvasSet = false
		,iW = null
		,iH = null
		,fnLoad = function(uri,callBack){
			oResult = mCanvas = oContext = null;
			bCanvasSet = false;
			sUri = uri;
			if (callBack!==undefined) fnCallback = callback;
			mImgLoader.setAttribute('src',sUri);
		}
		,fnGetCanvas = function(){
			if (!mCanvas) mCanvas = document.createElement('canvas');
			if (!bCanvasSet) {
				mCanvas.width = iW;
				mCanvas.height = iH;
				oContext = mCanvas.getContext('2d');
				oContext.drawImage(mImgLoader,0,0);
				bCanvasSet = true;
			}
			return mCanvas;
		}
		,fnGetContext = function(){
			return oContext;
		}
		,fnGetImgData = function(){
			return fnGetCanvas().toDataURL("image/jpeg");
		}
		,fnHandleLoad = function(e){
			iW = mImgLoader.width;//todo:original
			iH = mImgLoader.height;
			oResult = {
				toString: function(){return 'object [ImageLoader]';}
				,loadEvent:e
				,width:iW
				,height:iH
				,uri:sUri
				,name:sUri.split('/').pop()
				,type:sUri.split('.').pop()
				,img:mImgLoader
				,getCanvas:fnGetCanvas
				,getContext:fnGetContext
				,getImageData:fnGetImgData
			};
			if (fnCallback!==undefined) fnCallback.call(this,oResult);
		}
	;
	mImgLoader.addEventListener('load',fnHandleLoad);
	mImgLoader.addEventListener('error',function(r){
		fnError&&fnError(r);
	});
	if (uri) fnLoad(uri);
	return {
		toString: function(){return '[object loadImage]';}
		,load: fnLoad
		,getResult: function(){return oResult;}
//		,addEventListener: function(){} // todo: add signal
	};
});
