import React, { Component } from 'react';
import ReactDOM from 'react-dom';
var firebase = require('firebase');
var firebaseui = require('firebaseui');
var config = {
    apiKey: "AIzaSyD8aV_iPuJrkx-GAuT5hv67cHMfFGfrxig",
    authDomain: "rpi-lights.firebaseapp.com",
    databaseURL: "https://rpi-lights.firebaseio.com",
    projectId: "rpi-lights",
    storageBucket: "rpi-lights.appspot.com",
    messagingSenderId: "407575179834"
  };
var app = firebase.initializeApp(config);
var uiConfig = {
				signInSuccessUrl: 'http://localhost:5000',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
				tosUrl: 'http://localhost:5000',
				signInFlow: 'popup'
      };
//var user = auth.sign_in_with_email_and_password(email, password);
//firebase.auth().signInWithPopup(provider).then(function(result) {
//  // This gives you a Google Access Token. You can use it to access the Google API.
//  var token = result.credential.accessToken;
//  // The signed-in user info.
//  var user = result.user;
//	console.log("Token: ", token);
//	console.log("User: ", user);
//  // ...
//}).catch(function(error) {
//  // Handle Errors here.
//  var errorCode = error.code;
//  var errorMessage = error.message;
//  // The email of the user's account used.
//  var email = error.email;
//  // The firebase.auth.AuthCredential type that was used.
//  var credential = error.credential;
//  // ...
//	console.log("ERR: ", errorCode);
//});
////React.createClass({
//  componentDidMount: function() {
//    var self = this;
//    var uiConfig = {
//      'callbacks': {
//        'signInSuccess': function(user) {
//          if (self.props.onSignIn) {
//            self.props.onSignIn(user);
//          }
//          return false;
//        }
//      },
//      'signInOptions': [
//        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//        firebase.auth.EmailAuthProvider.PROVIDER_ID
//      ]
//    };
//    authUi.start('#firebaseui-auth', uiConfig);
//  },
//  componentWillUnmount: function() {
//    authUi.reset();
//  },
//  render: function() {
//    return (
//      <div id="firebaseui-auth"></div>
//    );
//  }
//});
class Authentication extends Component {
	componentDidMount(){
		// FirebaseUI config.
		var uiConfig = {
		  'signInSuccessUrl': '/signedIn',
		  'signInOptions': [
		    // Leave the lines as is for the providers you want to offer your users.
		    firebase.auth.GoogleAuthProvider.PROVIDER_ID
		  ],
		  // Terms of service url.
		  'tosUrl': '<your-tos-url>',
		};
		
		// Initialize the FirebaseUI Widget using Firebase.
		var ui = new firebaseui.auth.AuthUI(firebase.auth());
		// The start method will wait until the DOM is loaded.
		ui.start('#firebaseui-auth-container', uiConfig);
		
		var initApp = function() {
		 firebase.auth().onAuthStateChanged(function(user) {
		   if (user) {
		     // User is signed in.
		     var displayName = user.displayName;
		     var email = user.email;
		     var emailVerified = user.emailVerified;
		     var photoURL = user.photoURL;
		     var uid = user.uid;
		     var providerData = user.providerData;
		     user.getToken().then(function(accessToken) {
		       document.getElementById('sign-in-status').textContent = 'Signed in';
		       document.getElementById('sign-in').textContent = 'Sign out';
		       document.getElementById('account-details').textContent = JSON.stringify({
		         displayName: displayName,
		         email: email,
		         emailVerified: emailVerified,
		         photoURL: photoURL,
		         uid: uid,
		         accessToken: accessToken,
		         providerData: providerData
		       }, null, '  ');
		     });
		   } else {
		     // User is signed out.
		     document.getElementById('sign-in-status').textContent = 'Signed out';
		     document.getElementById('sign-in').textContent = 'Sign in';
		     document.getElementById('account-details').textContent = 'null';
		   }
		 }, function(error) {
		   console.log(error);
		 });
		};
		
		initApp();
		
		};
	

  componentWillUnmount(){
    authUi.reset();
  }

  render(){
    return (
			<div>
         <div id="firebaseui-auth-container"></div>
         <div id="sign-in-status"></div>
         <div id="sign-in"></div>
         <div id="account-details"></div>
      </div>
    );
  }
}

ReactDOM.render(<Authentication onSignIn={(user) => console.log(user)}/>, document.getElementById('mount')); 
