#!/bin/sh

# -------------------------
# Install Dependencies
# -------------------------

# Add node repository
curl -sL https://deb.nodesource.com/setup | bash -

# Add gstreamer Repo
echo "deb http://vontaene.de/raspbian-updates/ . main" >> /etc/apt/sources.list

# Install Node and Gstreamer
apt-get update
apt-get install nodejs
apt-get install libgstreamer1.0-0-dbg gstreamer1.0-tools libgstreamer-plugins-base1.0-0 gstreamer1.0-plugins-good gstreamer1.0-plugins-bad-dbg gstreamer1.0-omx gstreamer1.0-alsa
