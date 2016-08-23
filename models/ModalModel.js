var ejs = require('ejs');

var ModalModel = function (params) {
  
  this.log = function (message) {
    if (this.params.debug) {
      console.log(message);
    }
  }.bind(this);

  this.submit = function () {
    var fieldData = {};

    this.params.fields.forEach( (field) => {
      fieldData[field.label.split(' ').join('')] = document.getElementById('input-' + field.label).value;
    });

    this.success(fieldData);
  }.bind(this);

  this.remove = function () {
    this.params.el.innerHTML = '';

    for (var prop in this) {
      delete this[prop];
    }
  }.bind(this);

  (function init () {
    if (!params.el) {
      this.log('A valid element to render to was not passed in.');
    }

    if (!params.template) {
      this.log('A valid template to render was not passed in.');
    }
    
    this.params = params;
    this.remove = this.remove;
    this.success = (typeof params.success === 'function' ? params.success : '');
  }).bind(this)();

  this.renderFields = function () {
    var html = '';

    this.params.fields.forEach( (field) => {
      html += '<p class="control">';
      html += '<input class="input" type="' + field.type + '" id="input-' + field.label + '" placeholder="' + field.label + '">';
      html += '</p>';
    });

    return html;
  }.bind(this);

  this.render = function () {
    console.log(this.params.el);

    console.log('rendering...');

    ejs.renderFile(this.params.template, this.params, {}, (err, str) => {
      if (err) {
        this.log('render error:' + err);
        return;
      }

      this.params.el.innerHTML += str;
      document.getElementById('modalContent').innerHTML = (this.params.fields ? this.renderFields(): '');
      document.getElementById('submitModal').onclick = () => { this.submit(); this.remove(); };
      document.getElementById('closeModal').onclick = this.remove;
    });
  }.bind(this);

  return {
    render: this.render
  };

};

module.exports = ModalModel;
