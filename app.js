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
    //gst-launch-1.0 -e v4l2src device=/dev/video0 ! 'video/x-raw,width=640,height=480,framerate=30/1' ! omxh264enc ! avimux name=mux ! filesink location=webcam3.avi alsasrc device=hw:1,0 ! audioconvert ! 'audio/x-raw,rate=44100,channels=2' ! mux.
    //gst-launch-1.0 -e v4l2src device=/dev/video0 ! 'video/x-raw,width=640,height=480,framerate=30/1' ! omxh264enc ! avimux ! filesink location=webcam2.avi
    //gst-launch-1.0 -e v4l2src device=/dev/video0 ! 'video/x-raw,width=640,height=480,framerate=30/1' ! omxh264enc ! h264parse ! rtph264pay config-interval=1 pt=96 ! gdppay ! tcpclientsink host=localhost port=1000
    //h264parse ! rtph264pay config-interval=1 pt=96 ! gdppay ! tcpserversink host=0.0.0.0 port=5000
    //args = ['v4l2src', '!', 'video/x-raw,width=640,height=480,framerate=15/1', '!', 'h264enc bitrate=1000', '!', 'video/x-h264,profile=high', '!', 'h264parse', '!', 'queue', '!', 'flvmux name=mux alsasrc device=hw:1', '!', 'audioresample', '!', 'audio/x-raw,rate=48000', '!', 'queue', '!', 'voaacenc', 'bitrate=32000', '!', 'queue', '!', 'mux. mux.', '!', 'tcpclientsink', 'host=localhost', 'port=' + server.address().port];
    args = ["'v4l2src device=/dev/video0 ! 'video/x-raw,width=640,height=480,framerate=30/1' ! omxh264enc ! h264parse ! rtph264pay config-interval=1 pt=96 ! gdppay ! tcpclientsink host=localhost port=" + server.address().port]
    gst_muxer = child.spawn('gst-launch-1.0', args, null);
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


