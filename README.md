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
 
Reference:

https://github.com/js-platform/node-webrtc
- weird, java gtk2 and stuff, seem ocmplicated, maybe its using gtk to show the video
http://peerjs.com
- Seems better

