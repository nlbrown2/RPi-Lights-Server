# RPi-Lights-Server
## Introduction
This is the master repo for the Raspberry Pi controlled LEDs. This code will contain all of the web interfacing and have the light-controlling code as a submodule.

## Installation

### Pre-requisites
Set up a MQTT Broker. Please use your own broker and not mine (I can't handle more connections on a free plan). You can get one for free with [cloudMQTT](https://www.cloudmqtt.com/), so there is no reason to use mine. After setting up your MQTT broker, have all MQTT clients connect to that broker and not mine. This is done by modifying any connect funcitons on an MQTT client (there will be one in backend.py and one in the frontend code, likely mqtt.js).
### Dependencies
This repo requires [python 3](https://www.python.org/downloads/), pip3 (comes with python 3) and [yarn](https://yarnpkg.com/lang/en/docs/install/).  
I would use Python 3.6 or newer, as this repo was build with Python 3.6 and there is no reason (especially with virtual environments) to use older versions of python 3. You can try it, but it may not work.


  
**Highly recommend installing/using a virtualenv for python 3**  
This prevents issues with the wrong python version being used and any version issues with other dependencies you may have installed (or install in the future).  
### Setting up a Virtual Env
Command                          |  Description
-------                          |  -----------
`$ python3 -m venv {folder_name (I like venv) }` | Sets up Virtual Env.
`$ . {folder_name}/bin/activate` | Activate Virtual Env.
`$ deactivate`                   | Deactivates the Virtual Env.                      


### Installing Python dependencies
The python backend sends and recieves information using MQTT. This allows the Pi (or whatever backend you want to use) to send and recieve information without users connecting directly to the backend. This removes any requirements on port forwarding, DNS, iptables, etc. Plus, there are fewer security concerns as the backend is not being directly connected to. To use MQTT for python, this repo uses the paho-mqtt package. To install, just run:
`$ pip install -r requirements.txt`  

### Setting up a secure connection to the backend
You need to have SSL/TLS to communicate between MQTT clients and brokers. This repo uses a free plan from [cloudMQTT](https://www.cloudmqtt.com/), but you can set up your own broker using a DigitalOcean droplet with Mosquito or any other number of services. To enable SSL between the backend and the broker, specify the path the certificate authorities on your OS (on the Pi, it is at /etc/ssl/certs/ca-certificates.crt) in the line `client.tls_set(<Your Path Here>)`. 

### Installing Front-End Dependencies
Since this also builds a website using webpack and React.JS, we use yarn to manage those dependencies.   
`$ yarn install`  

We use yarn to bundle our assets through webpack and then run the app.  
`$ yarn start`  

Run webpack in watch mode in order to update the page on refresh.
1. Open a new terminal window and cd into this repo.
2. `$ yarn watch`
3. Swtich tabs in terminal
4. `$ yarn run run`
  
Now, any updates to assets like source Javascript will result in webpack re-bundling this for us. All we have to do is reload our webpage and flask should serve us a new static page that reflects those updates.
*If this does not happen, please make sure that you remove the cached files in your browser*  

If you use vim, then I suggest using this [plugin](https://github.com/andreax79/vim-on-write) to refresh your browser on buffer write. I use Chrome, so my command is   
`sleep 3 && osascript -e 'tell application "Google Chrome" to tell the active tab of its first window to reload' `  
This way, the 3 seconds is plenty of time for webpack to do all the bundling it needs, and then the apple script will reload the active tab I have (which should be the flask app anyways :P) 

## How everything comes together
The frontend is completely independent and can be hosted on pretty much any static hosting service. The front-end will write MQTT messages to certain topics and subscribe to other topics. These messages are sent over TLS websockets to the MQTT broker (if you use a custom broker, you need to enable TLS on your websockets). These messages are recieved by the backend that is subscribed to them and the backend then handles these similarly to API endpoints. 
