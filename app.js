/**
 * Namespace
 * config - default configuration
 * state - application status
 * global - global variables
 * i - instances
 * module - modules
 */
var BEH = {
  config: {},
  state: {},
  global: {},
  i: {},
  module: {}
};


BEH.app = require('express')();
BEH.child = require('child_process');
BEH.io = require('socket.io').listen(app)

// Main configuration for app
BEH.config = {
  mothership: 'http://live.taller.net.br/',
  cameraID:   'casadiogo'
};

// Keeps Application State
BEH.state = {
  current: 'idle',
  connection: 'disconnected'
  alarmMovement: false
  recording: false
}


// Init Function
// Here we will start connection with mothership 
BEH.module.init = function () {
  BEH.module.connectMS();
}

// Execute Socket Connection to mothership
// All socket io implementation will be done here, function calling auto reconnection
BEH.module.connectMS = function() {
  BEH.state.connection = 'connecting';
  // Open socket to mothershio
  BEH.state.connection = 'connected'
  // on error, disconnect and etc loop?
}

// Handle streaming to Mothership
// Will start gstreamer pipeline and kill gsteramer process when needed
BEH.module.startSteaming = function() {
  // Start gstreamer
}

BEH.module.stopSteaming = function() {
  // Kills gsteamer process
}

// Handle monitoring
// Will check for movement using opencv and release the camera when asked
BEH.module.startMonitoring = function {
  BEH.state.current = 'monitoring';
  // uses opencv to grab camera and check for movement
}

BEH.module.stopMonitoring = function {
  //releases opencv camera and stuff
  BEH.state.current = 'idle';
}

// Function called when there is movement and alarm is set
BEH.module.alarmTrigger = function() {
  // Execute alarm procedure
  // Notify MS throu socket
}
