# RPi-Lights-Server
## Introduction
This is the master repo for the Raspberry Pi controlled LEDs. This code will contain all of the web interfacing and have the light-controlling code as a submodule.

## Installation
### Dependencies
This repo requires [python 3](https://www.python.org/downloads/), pip3 (comes with python 3) and [yarn](https://yarnpkg.com/lang/en/docs/install/).  
  
**Highly recommend installing/using a virtualenv for python 3**  
This prevents issues with the wrong python version being used and any version issues with other dependencies you may have installed (or install in the future).  
### Setting up a Virtual Env
Command                          |  Description
-------                          |  -----------
`$ python3 -m venv {folder_name (I like venv) }` | Sets up Virtual Env.
`$ . {folder_name}/bin/activate` | Activate Virtual Env.
`$ deactivate`                   | Deactivates the Virtual Env.                      


### Installing Python dependencies
Since this is a Flask app, we have to intall a few dependencies for python. This can be done with pip.  
`$ pip install -r requirements.txt`  

### Installing Web Dependencies
Since this also builds a website using webpack and React.JS, we use yarn to manage those dependencies.   
`$ yarn install`  

## Running the App
There is a shell script that will set up all the environment variables needed for flask to run correctly.  
To configure for debug mode:  
`$ source flask_debug.sh`  

We use yarn to bundle our assets through webpack and then run the app.  
`$ yarn start`  

**Warning** Since webpack is not in watch mode, flask will not update any changes to assets (Javascript source or any files like that)  
To fix this, we can run webpack in watch mode.  
1. Open a new terminal window and cd into this repo.
2. `$ yarn watch`
3. Swtich tabs in terminal
4. `$ yarn run run`
  
Now, any updates to assets like source Javascript will result in webpack re-bundling this for us. All we have to do is reload our webpage and flask should serve us a new static page that reflects those updates.
*If this does not happen, please make sure that either flask does not allow caching or that you remove the cached files in your browser*  

If you use vim, then I suggest using this [plugin](https://github.com/andreax79/vim-on-write) to refresh your browser on buffer write. I use Chrome, so my command is   
`sleep 3 && osascript -e 'tell application "Google Chrome" to tell the active tab of its first window to reload' `  
This way, the 3 seconds is plenty of time for webpack to do all the bundling it needs, and then the apple script will reload the active tab I have (which should be the flask app anyways :P) 
