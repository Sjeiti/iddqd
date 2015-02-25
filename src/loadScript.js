/**
 * Load javascript file
 * @name loadScript
 * @param {String} src The source location of the file.
 * @returns {Promise}
 */
module.exports = src => {
	return new Promise((resolve,reject) => {
		const mScript = document.createElement('script');
		mScript.src = src;
		mScript.addEventListener('load',resolve);
		mScript.addEventListener('error',reject);
		(document.head||document.getElementsByTagName('head')[0]).appendChild(mScript);
	});
};