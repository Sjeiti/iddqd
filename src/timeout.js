/**
 * Timeout
 * @module timeout
 * @param {Number} duration
 * @Returns {Promise}
 */
export default (duration = 40)=>{
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}