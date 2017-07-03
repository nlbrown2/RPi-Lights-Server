import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import firebaseui  from 'firebaseui';

class App extends Component {

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
    this.uiConfig = {
      signInSuccessUrl: 'signedIn',
      signInOptions: [ {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID
      }
      ],
      signInFlow: 'redirect',
      // Terms of service url.
      tosUrl: '<your-tos-url>'
    };
    // Initialize the FirebaseUI Widget using Firebase.
    // The start method will wait until the DOM is loaded.
    this.firebase = firebase.initializeApp(config);
    this.auth = this.firebase.auth();
    this.ui = new firebaseui.auth.AuthUI(this.auth);
    this.ui.start('#firebaseui-auth', this.uiConfig);
  }

  render(){
    return (
      <div id="firebaseui-auth">
        <p>Hi there!</p>
	    </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('mount'));
