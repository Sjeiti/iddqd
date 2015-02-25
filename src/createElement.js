/**
 * Small utility method for quickly creating elements.
 * @name createElement
 * @param {String} [type='div'] The element type
 * @param {String|Array} classes An optional string or list of classes to be added
 * @param {HTMLElement} parent An optional parent to add the element to
 * @param {Object} attributes An optional click event handler
 * @param {String} text An optional click event handler
 * @param {Function} click An optional click event handler
 * @returns {HTMLElement} Returns the newly created element
 */
module.exports = (type,classes,parent,attributes,text,click) => {
	const mElement = document.createElement(type||'div');
	if (attributes) for (var attr in attributes) mElement.setAttribute(attr,attributes[attr]);
	if (classes) {
		const oClassList = mElement.classList
			,aArguments = typeof(classes)==='string'?classes.split(' '):classes;
		oClassList.add.apply(oClassList,aArguments);
	}
	if (text) mElement.textContent = text;
	click&&mElement.addEventListener('click',click);
	parent&&parent.appendChild(mElement);
	return mElement;
};