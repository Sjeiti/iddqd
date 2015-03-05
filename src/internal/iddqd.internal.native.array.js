/**
 * Array methods
 * @namespace internal.array
 */
iddqd.ns('iddqd.internal.native.array',(function(internal) {
	'use strict';
	return internal(Array,{
		/**
		 * Returns the largest value in the array
		 * @name iddqd.internal.native.array.largest
		 * @method
		 * @returns {number}
		 */
		largest: function () {
			return Math.max.apply(Math,this);
		}
		/**
		 * Returns the smallest value in the array
		 * @name iddqd.internal.native.array.smallest
		 * @method
		 * @returns {number}
		 */
		,smallest: function () {
			return Math.min.apply(Math,this);
		}
		/**
		 * Returns a random array value
		 * @name iddqd.internal.native.array.rnd
		 * @method
		 * @returns {object}
		 */
		,rnd: function () {
			return this[Math.round(Math.random() * this.length) - 1];
		}
		/**
		 * Filters out duplicate array entries
		 * @name iddqd.internal.native.array.unique
		 * @method
		 * @returns {number} The number of deleted items
		 */
		,unique: function () {
			var a = [], i, j = this.length, k = j, o;
			for (i = 0; i<j; i++) {
				o = this[i];
				if (a.indexOf(o)=== -1) {
					a.push(o);
				} else {
					this.splice(i,1);
					i--;
					j--;
				}
			}
			return k - j;
		}
		// todo: clone?
		/**
		 * Deepclone an array
		 * @name iddqd.internal.native.array.copy
		 * @method
		 * @returns {array} The new array
		 */
		,copy: function () { // todo check functionality outside prototype
			var a = [], i = this.length;
			while (i--) a[i] = (typeof this[i].copy!=='undefined')?this[i].copy():this[i];
			return a;
		}
		/**
		 * Shuffles the array
		 * @name iddqd.internal.native.array.shuffle
		 * @method
		 * @returns {array} The array
		 */
		,shuffle: function () {
			var i = this.length, j, t;
			while (i--) {
				j = Math.floor((i + 1) * Math.random());
				t = this[i];
				this[i] = this[j];
				this[j] = t;
			}
			return this;
		}
		/**
		 * Adds all array entries
		 * @name iddqd.internal.native.array.sum
		 * @method
		 * @returns {number} The sum
		 */
		,sum: function() {
			var fSum = 0
				,l = this.length;
			while (l--) fSum += this[l];
			return fSum;
		}
		/**
		 * Move one array index to another index
		 * @param {number} old_index
		 * @param {number} new_index
		 * @returns {array}
		 */
		,move: function(old_index, new_index) {
			if (new_index >= this.length) {
				var k = new_index - this.length;
				while ((k--) + 1) {
					this.push(undefined);
				}
			}
			this.splice(new_index, 0, this.splice(old_index, 1)[0]);
			return this;
		}
	});
})(iddqd.internal));
