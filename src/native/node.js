/**
 * Node methods
 * @module native/node
 */

/**
 * Converts a node to an object (attribute and childnode collisions may occur)
 * @param {Node} node A node
 * @param {object} extendTo An optional pre-existing object to fill.
 * @returns {object}
 */
export function toObject(node,extendTo){
	if (extendTo===undefined) extendTo = {};
	var i,l
		,aAttributes = node.attributes
		,aChildNodes = node.childNodes;
	// attributes
	if (aAttributes&&aAttributes.length) {
		for (i=0,l=aAttributes.length;i<l;i++) {
			var oAttr = aAttributes[i];
			extendTo[oAttr.nodeName] = oAttr.nodeValue;
		}
	}
	// nodes
	for (i=0,l=aChildNodes.length;i<l;i++) {
		var el = aChildNodes[i]
			,sElNodeName = el.nodeName
			,iNodeType = el.nodeType
			,oNode = iddqd.internal.host.node.toObject(el);
		switch (iNodeType) {
			case 1: // node
				if (extendTo.hasOwnProperty(sElNodeName)) {
					if (Array.isArray(extendTo[sElNodeName])) extendTo[sElNodeName].push(oNode);
					else extendTo[sElNodeName] = [extendTo[el.nodeName],oNode];
				} else {
					extendTo[sElNodeName] = oNode;
				}
			break;
			case 3: // text
				extendTo._text = el.innerText||el.textContent;
		}
	}
	return extendTo;
}