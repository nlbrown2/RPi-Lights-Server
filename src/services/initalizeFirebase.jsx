import * as firebase from 'firebase';

export default function initalizeFirebaseApp(){
  var config = {
    apiKey: "AIzaSyD8aV_iPuJrkx-GAuT5hv67cHMfFGfrxig",
    authDomain: "rpi-lights.firebaseapp.com",
    databaseURL: "https://rpi-lights.firebaseio.com",
    projectId: "rpi-lights",
    storageBucket: "rpi-lights.appspot.com",
    messagingSenderId: "407575179834"
  }
  return firebase.initalizeApp(config);
}
