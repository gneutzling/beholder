beholder
========

A project to study about two-way comunication using node js

Plan:
implement a nodejs app that will server a page with a client, handle conections and stabilish a two way communication with video and audio between the client and the server. much like the video intercom used in some houses.

Full HTML5 on the client side
Full command line on the server side

We should have on/off for mic, cam and volume on the client

Raspberry compatible server (but will start developing on x86 platform first)
- gstreamer would be nice since gstreamer1.0 has h264 encode and decode via hardware on 
- omxplayer could be used to display the stream on rpi side, if using rpi camera maybe its all we need
- use of usb microphone
 
Dont know how yet:
- catch video microphone with node and send in a socket

Reference:

https://github.com/js-platform/node-webrtc
- weird, java gtk2 and stuff, seem ocmplicated, maybe its using gtk to show the video

http://peerjs.com
- Seems better

https://github.com/buildar/getting_started_with_webrtc
- this seems to be the shit

https://github.com/RightClickHarder/TwitchCast/blob/master/Server/app.js
- example of openning a socket stream with omxplayer

https://gist.github.com/kalkov/1744211
- this IS the shit


status
========

http://www.raspberrypi.org/forums/viewtopic.php?t=6852&p=538740

On this post this guy is trying to do the same thing this project aim, the gstreamer streaming part at least, and running on the same problems im having, it seams it is a bug on gstreamer and SPS NAL. We need to find a package for this or compile gstreamer from source with this patch.
