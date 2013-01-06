
/* !
 * parallel-each
 * async parallel each
 *
 * @copyright 2013 Enrico Marino
 * @license MIT
 */

/*
 * Expose `parallel_each`
 */

module.exports = parallel_each;

/*
 * parallel_each
 * Apply 'iterator' to each item in 'array' in parallel
 * and call 'callback' when done
 *
 * @param {Array} array array
 * @param {Function} iterator iterator
 * @param {Function} callback callback
 * @api public
 */

function parallel_each (array, iterator, callback) {
  var completed = 0;
  var len = array.length;
  var i;

  function complete (err) {
    if (err) {
      callback(err);
      callback = function () {};
      return;
    }
    completed += 1;
    if (completed === len) {
      callback();
      return;
    }
  };

  for (i = 0; i < len; i += 1) {
    iterator(array[i], complete);
  }
}