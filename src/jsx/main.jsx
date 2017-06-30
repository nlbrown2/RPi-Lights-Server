import React, { Component } from 'react';
import ReactDOM from 'react-dom';
var firebase = require('firebase');
var firebaseui = require('firebaseui');
// Initialize Firebase
console.log("outside react app");
class Authentication extends Component {

  render(){
		console.log("react render");
    return (
			<p>From React</p>
    );
  }
}
alert('test');
ReactDOM.render(<Authentication />, document.getElementById('mount'));
