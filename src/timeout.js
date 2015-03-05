/**
 * Timeout
 * @module timeout
 * @param {Number} duration
 * @Returns {Promise}
 */
/* jshint ignore:start */
export default (duration = 40)=>{
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}
/* jshint ignore:end */
