/**
 * HTMLElement methods
 * @module internal/htmlelement
 */

/**
 * Create a new childnode onto the element
 * @param {HTMLElement} element The HTMLElement
 * @param {string} elementName Name of the new node.
 * @param {object} attributes An object with attributes to set on the new node.
 * @param {boolean} [append=true] Append to the end of the parent node.
 * @returns {HTMLElement} The newly created HTMLElement
 */
export function addChild(element,elementName,attributes,append=true) {
	var m = document.createElement(elementName);
	if (attributes!==undefined) setAttributes(m,attributes);
	if (append===true) element.appendChild(m);
	else element.insertBefore(m, element.firstChild);
	return m;
}

/**
 * Create a new childnode next to the element
 * @param {HTMLElement} element The HTMLElement
 * @param {string} elementName Name of the new node.
 * @param {object} attributes An object with attributes to set on the new node.
 * @param {boolean} [after=true] Add after its sibling.
 * @returns {HTMLElement} The newly created HTMLElement
 */
export function addSibling(element,elementName,attributes,after=true) {
	var m = document.createElement(elementName);
	if (attributes!==undefined) setAttributes(m,attributes);
	if (after===true) {
		if (element.nextSibling) element.parentNode.insertBefore(m, element.nextSibling);
		else element.parentNode.appendChild(m);
	} else {
		element.parentNode.insertBefore(m, element);
	}
	return m;
}

/**
 * Set attributes on an HTMLElement.
 * @param {HTMLElement} element The HTMLElement
 * @param {object} attributes An object with attributes to set.
 * @returns {HTMLElement} The subject HTMLElement.
 */
export function setAttributes(element,attributes) {
	for (var s in attributes) element.setAttribute(s,attributes[s]);
	return element;
}

/**
 * Remove an HTMLElement.
 * @param {HTMLElement} element The HTMLElement
 * @returns {HTMLElement} The removed HTMLElement.
 */
export function remove(element) {
	element.parentNode&&element.parentNode.removeChild(element);
	return element;
}

/**
 * Remove all the children.
 * @param {HTMLElement} element The HTMLElement
 * @returns {HTMLElement} The subject HTMLElement.
 */
export function empty(element){
	for (var i=0,l=element.children.length;i<l;i++) element.removeChild(element.children[0]);
	return element;
}

/**
 * Set the style of an HTMLElement.
 * @param {HTMLElement} element The HTMLElement
 * @param {object} rules An object with style rules to set.
 * @returns {HTMLElement} The subject HTMLElement.
 */
export function css(element,rules){
	var oStyle = element.style;
	for (var s in rules) {
		var oVal = rules[s];
		if (oStyle[s]!==oVal) oStyle[s] = oVal;
	}
	return element;
}

/**
 * Checks if the element descends from another element.
 * @param {HTMLElement} element The HTMLElement
 * @param {HTMLElement} parentNode The parent.
 * @returns {boolean} Is descendant.
 */
export function descendsFrom(element,parentNode){
	var mParent = element.parentNode;
	while (parentNode!==mParent&&mParent!==document.body) {
		mParent = mParent.parentNode;
	}
	return parentNode===mParent;
}

/**
 * Traverses a nodes ancestors in search for a specific tag
 * @param {HTMLElement} element The HTMLElement
 * @param {string} parentName
 * @param {string} parentClass
 * @returns {HTMLElement}
 */
export function findParent(element,parentName,parentClass){
	var mParent = element
		,sParentName = parentName&&parentName.toLowerCase()
		,mFound;
	if (mParent) {
		while (mParent!==document.body) {
			mParent = mParent.parentNode;
			if (sParentName&&mParent.nodeName.toLowerCase()===sParentName) {
				mFound = mParent;
			}
			if (parentClass) {
				if (mParent.classList.contains(parentClass)) {
					mFound = mParent;
				} else {
					mFound = undefined;
				}
			}
			if (mFound) break;
		}
	}
	return mFound;
}

/**
 * Checks if width and height are set.
 * @param {HTMLElement} element The HTMLElement
 * @returns {boolean} Is visible.
 */
export function visible(element){
	return element.offsetWidth>0||element.offsetHeight>0;
}