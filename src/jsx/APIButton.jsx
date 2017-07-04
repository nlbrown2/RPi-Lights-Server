import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import initalizeFirebase from '../services/initalizeFirebase.js';

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
        console.log('null user');
      } else {
        console.log(user);
      }
    })
  }

  onPress(){
    firebase.auth().signOut()
    const origin = window.origin;
    window.location.assign(origin);
  }

  render(){
    return(
      <button id={this.props.id} onClick={() => this.onPress()}>
        {this.props.children}
      </button>
    )
  }
}

ReactDOM.render(<APIButton>Test Example</APIButton>, document.getElementById('mount'));
