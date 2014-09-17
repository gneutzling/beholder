app = require('express')();
child = require('child_process');
io = require('socket.io').listen(app)

// Main configuration for app
var config = {
  'mothership':	    'http://live.taller.net.br/',
  'cameraID':       'casadiogo'
}

// Keeps Application State
var state = {
  'current':        'idle',
  'connection':     'disconnected'
  'alarmMovement':  False
  'recording':      False
}


// Init Function
// Here we will start connection with mothership 
init = function() {
  connectMS();
}


// Execute Socket Connection to mothership
// All socket io implementation will be done here, function calling auto reconnection
connectMS = function() {
  state.connection = 'connecting';
  // Open socket to mothershio
  state.connection = 'connected'
  // on error, disconnect and etc loop?
}

// Handle streaming to Mothership
// Will start gstreamer pipeline and kill gsteramer process when needed
startSteaming = function() {
  // Start gstreamer
}

stopSteaming = function() {
  // Kills gsteamer process
}

// Handle monitoring
// Will check for movement using opencv and release the camera when asked
startMonitoring = function {
  state.current = 'monitoring';
  // uses opencv to grab camera and check for movement
}

stopMonitoring = function {
  //releases opencv camera and stuff
  state.current = 'idle';
}

// Function called when there is movement and alarm is set
alarmTrigger = function() {
  // Execute alarm procedure
  // Notify MS throu socket
}
