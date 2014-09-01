express = require('express')
net = require('net')
child = require('child_process')

app = express.createServer();

app.get('/stream', function(req, res) {
  var server;
  res.writeHead(200, {
    'Date': (new Date()).toUTCString(),
    'Connection': 'close',
    'Cache-Control': 'private',
    'Content-Type': 'video/webm'
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
    args = ['v4l2src', '!', 'video/x-raw-rgb,framerate=30/1', '!', 'ffmpegcolorspace', '!', 'vp8enc', 'speed=2', '!', 'queue2', '!', 'm.', 'autoaudiosrc', '!', 'audioconvert', '!', 'vorbisenc', '!', 'queue2', '!', 'm.', 'webmmux', 'name=m', 'streamable=true', '!', 'tcpclientsink', 'host=localhost', 'port=' + server.address().port];
    gst_muxer = child.spawn('gst-launch', args, null);
    gst_muxer.stderr.on('data', onSpawnError);
    gst_muxer.on('exit', onSpawnExit);
    return res.connection.on('close', function() {
      return gst_muxer.kill();
    });
  });
});

app.listen(process.env.npm_package_config_port);

onSpawnError = function(data) {
  return console.log(data.toString());
};

onSpawnExit = function(code) {
  if (code != null) {
    return console.error('GStreamer error, exit code ' + code);
  }
};

process.on('uncaughtException', function(err) {
  return console.debug(err);
});


