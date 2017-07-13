import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import axios from 'axios';
import initalizeFirebase from '../services/initalizeFirebase.js';
import apiConfig from '../services/apiConfig.js';

class APIButton extends Component {

  componentWillMount(){
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyD8aV_iPuJrkx-GAuT5hv67cHMfFGfrxig",
      authDomain: "rpi-lights.firebaseapp.com",
      databaseURL: "https://rpi-lights.firebaseio.com",
      projectId: "rpi-lights",
      storageBucket: "",
      messagingSenderId: "407575179834"
    };
    this.firebase = initalizeFirebase();
    this.auth = this.firebase.auth();
    firebase.auth().onAuthStateChanged((user) => {
      if(user == null){
        const origin = window.origin;
        window.location.assign(origin);
      } 
    })
  }

  constructor(){
    super();
    this.state = {};
    this.state.mqtt = new Paho.MQTT.Client("m12.cloudmqtt.com", 30048, "web_" + parseInt(Math.random() * 100, 10));
    let options = {
      useSSL: true,
      userName: "RpiLightsClient",
      password: "T2c%I02504O&",
      onSuccess: () => {
        console.log('success'); 
        this.state.mqtt.subscribe("/lightmode"); 
        console.log('subscribed');
        console.log('success');
        let message = new Paho.MQTT.Message("Hello Troutman"); 
        console.log('created ', message);
        message.destinationName = "/lightmode"; 
        this.state.mqtt.send(message);
        console.log('sent message');
      },
      onFailure:() => console.log('failure')
    }
    this.state.mqtt.onMessageArrived = (message) => {
      console.log('message recieved: ', message);
    }
    this.state.mqtt.connect(options);
  }

  onPress(){
    firebase.auth().currentUser.getIdToken(true).then((idToken) => {
      axios.get(apiConfig.baseURL + this.props.endpoint, { headers: { 'id-token': idToken } } ).then((response) => console.log(response));
    });
    }

  render(){
    return(
      <button id={this.props.id} onClick={() => this.onPress()}>
        {this.props.children}
      </button>
    )
  }
}

ReactDOM.render(<APIButton endpoint='test'>Test Example</APIButton>, document.getElementById('mount'));
