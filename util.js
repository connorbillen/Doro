var util = function () {

  this.extend = function (main, data) {
    for (var prop in data) {
      main[prop] = data[prop];
    }

    return main;
  };

  return {
    extend: this.extend
  };

}();

module.exports = util;
