/**
 * Node methods
 * @name iddqd.host.node
 * @namespace iddqd.host.node
 */
iddqd.ns('iddqd.host.node',(function(){
	'use strict';
	return iddqd.primitive(Node,{
		/**
		 * Converts a node to an object (attribute and childnode collisions may occur)
		 * @name iddqd.host.node.toObject
		 * @method
		 * @param {object} obj An optional pre-existing object to fill.
		 * @returns {object}
		 */
		toObject: function(obj){
			if (obj===undefined) obj = {};
			var i,l
				,aAttributes = this.attributes
				,aChildNodes = this.childNodes;
			// attributes
			if (aAttributes&&aAttributes.length) {
				for (i=0,l=aAttributes.length;i<l;i++) {
					var oAttr = aAttributes[i];
					obj[oAttr.nodeName] = oAttr.nodeValue;
				}
			}
			// nodes
			for (i=0,l=aChildNodes.length;i<l;i++) {
				var el = aChildNodes[i]
					,sElNodeName = el.nodeName
					,iNodeType = el.nodeType
					,oNode = iddqd.host.node.toObject.apply(el);
				switch (iNodeType) {
					case 1: // node
						if (obj.hasOwnProperty(sElNodeName)) {
							if (Array.isArray(obj[sElNodeName])) obj[sElNodeName].push(oNode);
							else obj[sElNodeName] = [obj[el.nodeName],oNode];
						} else {
							obj[sElNodeName] = oNode;
						}
					break;
					case 3: // text
						obj._text = el.innerText||el.textContent;
				}
			}
			return obj;
		}
	});
})());