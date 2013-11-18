/**
 * HTMLElement methods
 * @namespace iddqd.internal.host.htmlelement
 */
iddqd.ns('iddqd.internal.host.htmlelement',(function(internal){
	'use strict';
	return internal(HTMLElement,{
		/**
		 * Create a new childnode onto the element
		 * @name iddqd.internal.host.htmlelement.addChild
		 * @method
		 * @param {string} elementName Name of the new node.
		 * @param {object} attributes An object with attributes to set on the new node.
		 * @param {boolean} [append=true] Append to the end of the parent node.
		 * @returns {HTMLElement} The newly created HTMLElement
		 */
		addChild: function(elementName,attributes,append) {
			if (append===undefined) append = true;
			var m = document.createElement(elementName);
			if (attributes!==undefined) m.setAttributes(attributes);
			if (append===true) this.appendChild(m);
			else this.insertBefore(m, this.firstChild);
			return m;
		}
		/**
		 * Create a new childnode next to the element
		 * @name iddqd.internal.host.htmlelement.addSibling
		 * @method
		 * @param {string} elementName Name of the new node.
		 * @param {object} attributes An object with attributes to set on the new node.
		 * @param {boolean} [after=true] Add after its sibling.
		 * @returns {HTMLElement} The newly created HTMLElement
		 */
		,addSibling: function(elementName,attributes,after) {
			if (after===undefined) after = true;
			var m = document.createElement(elementName);
			if (attributes!==undefined) m.setAttributes(attributes);
			if (after===true) {
				if (this.nextSibling) this.parentNode.insertBefore(m, this.nextSibling);
				else this.parentNode.appendChild(m);
			} else {
				this.parentNode.insertBefore(m, this);
			}
			return m;
		}
		/**
		 * Set attributes on an HTMLElement.
		 * @name iddqd.internal.host.htmlelement.setAttributes
		 * @method
		 * @param {object} attributes An object with attributes to set.
		 * @returns {HTMLElement} The subject HTMLElement.
		 */
		,setAttributes: function(o) {
			for (var s in o) this.setAttribute(s,o[s]);
			return this;
		}
		/**
		 * Remove an HTMLElement.
		 * @name iddqd.internal.host.htmlelement.remove
		 * @method
		 * @returns {HTMLElement} The removed HTMLElement.
		 */
		,remove: function() {
			if (this.parentNode) this.parentNode.removeChild(this);
			return this;
		}
		/**
		 * Remove all the children.
		 * @name iddqd.internal.host.htmlelement.empty
		 * @method
		 * @returns {HTMLElement} The subject HTMLElement.
		 */
		,empty: function(){
			for (var i=0,l=this.children.length;i<l;i++) this.removeChild(this.children[0]);
			return this;
		}
		/**
		 * Set the style of an HTMLElement.
		 * @name iddqd.internal.host.htmlelement.css
		 * @method
		 * @param {object} rules An object with style rules to set.
		 * @returns {HTMLElement} The subject HTMLElement.
		 */
		,css: function(rules){
			var oStyle = this.style;
			for (var s in rules) {
				var oVal = rules[s];
				if (oStyle[s]!=oVal) oStyle[s] = oVal;
			}
			return this;
		}
		,hasClass: function(name){
			return !!~this.className.indexOf(name);
		}
		,removeClass: function(name){
			this.className = this.className.replace(name,'').replace(/\s{2,}/g,' ');
			return this;
		}
		,addClass: function(name){
			if (!this.hasClass(name)) this.className += this.classNamelength===0?name:' '+name;
			return this;
		}
		,toggleClass: function(name){
			if (this.hasClass(name)) this.removeClass(name);
			else this.addClass(name);
			return this;
		}
		/*,addEvent: function(evt,fn,useCapture){
			iddqd.addEvent(this,evt,fn,useCapture);
			return this;
		}*/
		/**
		 * Checks if the element descends from another element.
		 * @name iddqd.internal.host.htmlelement.descendsFrom
		 * @method
		 * @param {HTMLElement} parentNode The parent.
		 * @returns {boolean} Is descendant.
		 */
		,descendsFrom: function(parentNode){
			var mParent = this.parentNode;
			while (parentNode!==mParent&&mParent!==document.body) {
				mParent = mParent.parentNode;
			}
			return parentNode===mParent;
		}
		/**
		 * Checks if width and height are set.
		 * @name iddqd.internal.host.htmlelement.visible
		 * @method
		 * @returns {boolean} Is visible.
		 */
		,visible: function(){
			return this.offsetWidth>0||this.offsetHeight>0;
		}
	});
})(iddqd.internal));