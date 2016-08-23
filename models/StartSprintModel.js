var StartSprintModel = function (params) {
  
  this.log = function(message) {
    if (this.params.debug) {
      console.log(message);
    }
  }.bind(this);;

  this.init = (function () {
    if (!params.el) {
      this.log('A valid element to render to was not passed in.');
    }

    this.params = params;
  }).bind(this)();

  this.render = function () {
    ejs.renderFile(this.params.template, this.params, {}, (err, str) => {
      if (err) {
        this.log('render error:' + err);
        return;
      }

      this.params.el.innerHTML += str;
      
      if (typeof this.params.onclick === 'function') {
        this.params.el.onclick = this.params.onclick;
      }
    });
  }.bind(this);

  return {
    render: this.render
  };

};

module.exports = StartSprintModel;
