import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import firebaseui  from 'firebaseui';
import initalizeFirebase, { initalizeFirebaseUI } from '../services/initalizeFirebase.js';
import Test from './Test.jsx';

class App extends Component {

  componentWillMount(){
    // Initialize Firebase
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
    this.firebase = initalizeFirebase();
    this.auth = this.firebase.auth();
    this.ui = initalizeFirebaseUI(this.auth,'#firebaseui-auth');
  }

  render(){
    return (
      <div id="firebaseui-auth">
        <p>Hi there!</p>
        <Test />
	    </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('mount'));
