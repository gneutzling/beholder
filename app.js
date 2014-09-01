app = require('express')();
net = require('net');
child = require('child_process');

app.get('/stream', function(req, res) {
  var server;
  res.writeHead(200, {
    'Date': (new Date()).toUTCString(),
    'Connection': 'close',
    'Cache-Control': 'private',
    'Content-Type': 'video/mp4'
  });
  server = net.createServer(function(socket) {
    socket.on('data', function(data) {
      return res.write(data);
    });
    return socket.on('close', function(had_error) {
      return res.end();
    });
  });
  return server.listen(function() {
    var args, gst_muxer;
    args = ['v4l2src', '!', 'video/x-raw,width=640,height=480,framerate=15/1', '!', 'omxh264enc', '!', 'video/x-h264,profile=high', '!', 'h264parse', '!', 'mp4mux', '!', 'queue', '!', 'tcpclientsink', 'host=localhost', 'port=' + server.address().port];
    gst_muxer = child.spawn('gst-launch-1.0', args, null);
    gst_muxer.stderr.on('data', onSpawnError);
    gst_muxer.on('exit', onSpawnExit);
    return res.connection.on('close', function() {
      return gst_muxer.kill();
    });
  });
});

app.listen(7777);

onSpawnError = function(data) {
  return console.log(data.toString());
};

onSpawnExit = function(code) {
  if (code != null) {
    return console.error('GStreamer error, exit code ' + code);
  }
};

process.on('uncaughtException', function(err) {
  return console.log(err);
});


