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

### Setting up HTTPS connection
At the time of this creation, TLS is a secure protocol. To set up the server to use TLS, this [link](http://werkzeug.pocoo.org/docs/0.12/serving/#ssl) will likely be the best place. Currently, it is configured by making an SSL key using `make_ssl_devcert` from werkzeug.serving, then using pyOpenSSL to generate a context with those keys and specifying TLS protocols, and specifying private key/certificate files. All of this is dependent upon OpenSSL, which can be found [here](https://www.openssl.org/source/). I would recommend downloading the long term stable release, but the most recent one may be more secure. If you have to upgrage your version of OpenSSL (which is a good thing), I recommend using brew: `brew upgrade`. If you do openssl version and still see the old version, do `brew info` and add the path it gives you to your PATH variable `$ export PATH=[path from brew]:$PATH`. At the time of this writing, it is very complicated to get Google Chrome to accept a self-signed certificate. So, for development, We are going to use a less secure browser! Firefox! Follow [this](https://www.poweradmin.com/help/sslhints/firefox.aspx) to weaken your security by accepting your self signed certification. When you are ready to deploy to the real world, I suggest [this](https://www.sslforfree.com/) to get a free SSL certification for your website (which is good!). [This](https://gethttpsforfree.com/) may be another site that will allow for your website to make HTTPS calls to your API.   

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

## How everything comes together
This repo uses webpack to manage our assets. Basically, we allow it to bundle all the React code together into one browser-friendly JS file. In addition, it will also manage things such as images and styles. This Python [plugin](https://github.com/nickjj/flask-webpack) allows flask to easily use webpack to manage its assets. This plugin relies on a [plugin](https://github.com/nickjj/manifest-revision-webpack-plugin) for Webpack. Basically, The Webpack plugin will generate a manifest.json file in the directiory specified in the webpack.config.js that flask can then read in (set up in app config dictionary) and thus can then translate calls for assets in Jinja templates. It's pretty neat, because webpack will put on an md5 hash into the filename for the asset (hence the need for a manifest.json file). This allows for version control. I have webpack set up to put the bundled file(s) into the static folder so they are easily accessible by flask (although they don't have to be in static, as that folder can be adjusted in the flask config settings in flask\_app.py). 
