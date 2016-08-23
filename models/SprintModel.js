var ejs = require('ejs');

var SprintModel = function (params) {
  
  this.log = function(message) {
    if (this.params.debug) {
      console.log(message);
    }
  }.bind(this);;
 
  this.get = function (param) {
    return this.params[param];
  }.bind(this);

  this.set = function(param, value) {
    this.params[param] = value;
  }.bind(this);

  this.countdown = function () {
    if (this.params.seconds === 0 && this.params.minutes === 0) {
      
    } else {
      this.params.minutes = (this.params.seconds === 0 ? this.params.minutes - 1 : this.params.minutes);
      this.params.seconds = (this.params.seconds === 0 ? 59 : this.params.seconds - 1); 
      this.render();
    }
  }.bind(this);

  this.render = function () {
    ejs.renderFile(this.params.template, this.params, {}, (err, str) => {
      if (err) {
        this.log('render error: ' + err);
        return;
      }

      this.params.el.innerHTML = str;
    });

    setTimeout(this.countdown, 1000);
  }.bind(this);

  this.init = (function () {
    if (!params.el) {
      this.log('A valid element to render to was not passed in.');
    }

    if (!params.template) {
      this.log('A valid template to render was not passed in.');
    }

    this.params = params;
    this.params.minutes = parseInt(this.params.SprintTime);
    this.params.seconds = 0;
  }).bind(this)();

  return {
    get: this.get,
    set: this.set,
    render: this.render
  };

};

module.exports = SprintModel;
