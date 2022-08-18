#!/bin/bash

sudo apt-get update && sudo apt-get upgrade
sudo apt install mongodb-server

sudo service mongodb start
sudo service mongodb status