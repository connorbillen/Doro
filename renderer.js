(function main() { 

  /* Modules to be included */
  var AddSprintModel = require('./models/AddSprintModel');
  var StartSprintModel = require('./models/StartSprintModel');
  var SprintModel = require('./models/SprintModel');
  var ModalModel = require('./models/ModalModel');
  var util = require('./util');

  /* DOM element selectors */
  var container = document.getElementById('contentArea');

  /* Application variables */
  var playing = false;
  var sprints = [];

  /* Main Initialization */
  new AddSprintModel({
    el: document.getElementById('addSprintButton'), 
    template: __dirname + '/templates/AddSprintTemplate.ejs',
    onclick: addNewSprintModal
  }).render();

  new StartSprintModel({
    el: document.getElementById('startSprintButton'),
    template: __dirname + '/templates/StartSprintTemplate.ejs',
    onclick: startSprint
  }).render();

  /* Utility Functions */
  function startSprint () {
    if (sprints.length && !playing) {
      sprints[0].start();
    } else if (sprints.length && playing) {
      sprints[0].pause();
    }
  }

  function addNewSprintModal () {
    console.log('creating modal...');

    new ModalModel({
      el: document.getElementById('modalContainer'),
      template: __dirname + '/templates/ModalTemplate.ejs',
      success: addNewSprint,
      debug: true,
      fields: [
        { label: 'Sprint Time', type: 'number' },
        { label: 'Sprint Task', type: 'text' }
      ]
    }).render();
  }

  function nextSprint () {
    var removedSprint = sprints.shift();

    if (sprints.length) {
      sprints[0].start();
    }
  }

  function addNewSprint (params) {
    var sprintContainer = document.createElement('span');
    container.insertBefore(sprintContainer, container.firstChild);

    var sprint = new SprintModel(util.extend({ 
      el: sprintContainer, 
      template: __dirname + '/templates/SprintTemplate.ejs' ,
      callback: nextSprint,
      debug: true
    }, params));

    sprint.render();
    sprints.unshift(sprint);
  }

})();

