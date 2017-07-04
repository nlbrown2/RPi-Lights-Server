import * as firebase from 'firebase';
import firebaseui from 'firebaseui';

export default function initalizeFirebaseApp(){
  // new comment
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyD8aV_iPuJrkx-GAuT5hv67cHMfFGfrxig",
      authDomain: "rpi-lights.firebaseapp.com",
      databaseURL: "https://rpi-lights.firebaseio.com",
      projectId: "rpi-lights",
      storageBucket: "",
      messagingSenderId: "407575179834"
    };
  return firebase.initializeApp(config);
}

export function initalizeFirebaseUI(firebaseAuth, startString){ 
  var uiConfig = {
    signInSuccessUrl: 'signedIn',
    signInOptions: [ {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID
    } ],
    signInFlow: 'redirect',
    // Terms of service url.
    tosUrl: '<your-tos-url>' 
  };
  var ui = new firebaseui.auth.AuthUI(firebaseAuth)
  ui.start(startString, uiConfig);

}
