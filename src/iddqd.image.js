/**
 * Image methods
 * @summary Image methods
 * @namespace iddqd.image
 */
iddqd.ns('iddqd.image',(function(iddqd,uses,undefined){
	'use strict';
	return {
		/**
		 * Load an image
		 * If {@link iddqd.network.xhttp xhttp} is present proper filesize and mime types will also be returned in the callback
		 * @name iddqd.image.load
		 * @method
		 * @param {String} uri The uri of the image.
		 * @param {iddqd.image~loadCallback} loadCallback A callback method.
		 * @param {iddqd.image~loadError} loadError A method for error handling.
		 * @return {iddqd.image~loadImage} A loadImage object.
		 */
		load: function(uri,loadCallback,loadError,useXHTTP){
			var xhttp = useXHTTP?iddqd.network.xhttp:undefined// todo: document optional
				//
				,mImgLoader = document.createElement('img')
				,sUri = uri
				,fnCallback = loadCallback
				,fnError = loadError
				,oResult
				,mCanvas
				,oContext
				,bCanvasSet = false
				,iW = null
				,iH = null
				/**
				 * The return value for the {@link iddqd.image.load} method.
				 * @callback iddqd.image~loadImage
				 * @param {Function} load - Load another image. Similar implementation as the original {@link iddqd.image.load}
				 * @param {Function} getResult - Show the last result
				 */
				,oReturn = {
					toString: function(){return '[object loadImage]';}
					,load: load
					,getResult: function(){return oResult;}
				}
			;

			mImgLoader.addEventListener('load',handleImageLoad,false);
			mImgLoader.addEventListener('error',handleLoadError,false);
			if (sUri) load(sUri);

			function load(uri,loadCallback,loadError){
				oResult = mCanvas = oContext = undefined;
				bCanvasSet = false;
				sUri = uri;
				if (loadCallback!==undefined) fnCallback = loadCallback;
				if (loadError!==undefined) fnError = loadError;

				mImgLoader.setAttribute('src',sUri);
				return oReturn;
			}
			function handleImageLoad(e){
				iW = mImgLoader.naturalWidth||mImgLoader.width;
				iH = mImgLoader.naturalHeight||mImgLoader.height;

				/**
				 * The callback from the {@link iddqd.image.load} method.
				 * @callback iddqd.image~loadCallback
				 * @param {Event} loadEvent The original load event
				 * @param {Number} width The width of the image
				 * @param {Number} height The height of the image
				 * @param {String} uri The image uri
				 * @param {String} name The name of the image file
				 * @param {HTMLImageElement} img The original img element used for the load
				 * @param {Function} getCanvas Creates and returns a HTMLCanvasElement with the size of the image
				 * @param {Function} getContext Creates and returns a CanvasRenderingContext2D
				 * @param {string} getImageData Returns the base64 uri of the image
				 */
				oResult = {
					toString: function(){return '[object imageLoader]';}
					,loadEvent:e
					,width:iW
					,height:iH
					,size:undefined
					,mime:undefined
					,uri:sUri
					,name:sUri.split('/').pop()
					,type:sUri.split('.').pop()
					,img:mImgLoader
					,getCanvas:getCanvas
					,getContext:getContext
					,getImageData:getData
				};
				// if xhttp is present we delay the callback to retreive filesize and mimetype
				// the request should load from cache
				if (xhttp) {
					xhttp(sUri,function(req){
						oResult.size = req.getResponseHeader('Content-Length')<<0;
						oResult.mime = req.getResponseHeader('Content-Type');
						oResult.type = oResult.mime.split('/').pop();
						doCallback(oResult);
					},function(){
						doCallback(oResult);
					});
				} else {
					doCallback(oResult);
				}
				function doCallback(result){
					if (fnCallback!==undefined) fnCallback.call(oReturn,result);
				}
			}
			/**
			 * The error callback from the {@link iddqd.image.load} method.
			 * @callback iddqd.image~loadError
			 * @param {Error} err The load error
			 */
			function handleLoadError(err){
				console.warn('iddqd.image.error',err); // log
				fnError&&fnError(err);
			}
			function getCanvas(){
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
			function getContext(){
				if (!mCanvas) getCanvas();
				return oContext;
			}
			// todo: oContext.getImageData(0,0,iW,iH) and aPixels = oImgData.data
			function getData(type){
				return getCanvas().toDataURL('image/'+(type||'jpeg'));
			}
			return oReturn;
		}
	};
})(iddqd,iddqd.uses));
