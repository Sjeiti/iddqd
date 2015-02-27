/**
 * Load an image
 * If {@link iddqd.network.xhttp xhttp} is present proper filesize and mime types will also be returned in the callback
 * @name loadImage
 * @param {String} uri The uri of the image.
 * @param {boolean} useXHTTP Use XHTTP to retreive more data.
 * @return {Promise} A loadImage object.
 */
export default (uri,useXHTTP) => {
	return new Promise((resolve,reject) => {
		var xhttp = useXHTTP?/*require('./network.xhttp')*/false:undefined// todo: document optional
			//

			,mImgLoader = document.createElement('img')
			,sUri = uri
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
		mImgLoader.addEventListener('error',reject,false);
		if (sUri) load(sUri);

		function load(uri){
			oResult = mCanvas = oContext = undefined;
			bCanvasSet = false;
			sUri = uri;

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
					resolve(oResult);
				},function(){
					resolve(oResult);
				});
			} else {
				resolve(mImgLoader);
			}
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
	});
};