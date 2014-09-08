app = require('express')();
child = require('child_process');

var PORT = 33333;
var HOST = '127.0.0.1';

var dgram = require('dgram');

app.get('/stream', function(req, res) {
  var server = dgram.createSocket('udp4');
  res.writeHead(200, {
    'Date': (new Date()).toUTCString(),
    'Connection': 'close',
    'Cache-Control': 'private',
    'Content-Type': 'video/mp4'
  });
  server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
    var args, gst_muxer;
    args = ['-e', 'v4l2src device=/dev/video0', '!', 'video/x-raw,width=640,height=480,framerate=30/1', '!', 'omxh264enc', '!', 'rtph264pay pt=96', '!', 'udpsink host='+address.address+' port='+address.port]
    //gst_muxer = child.spawn('gst-launch-1.0', args, null);
    //gst_muxer.stderr.on('data', onSpawnError);
    //gst_muxer.on('exit', onSpawnExit);
  });
  server.on('message', function (message, remote) {
    console.log('data-')
    res.write(message);
  });
  server.bind(PORT, HOST);
});

onSpawnError = function(data) {
  return console.log(data.toString());
};

onSpawnExit = function(code) {
  if (code != null) {
    return console.error('GStreamer error, exit code ' + code);
  }
};

app.listen(7777);


