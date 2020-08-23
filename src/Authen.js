import React, { Component } from "react";

var firebase = require("firebase");

var firebaseConfig = {
  apiKey: "AIzaSyCrXZiTkSCY2SMPcMt84fN3jNkgvRV-sA4",
  authDomain: "uservey-9dcd1.firebaseapp.com",
  databaseURL: "https://uservey-9dcd1.firebaseio.com",
  projectId: "uservey-9dcd1",
  storageBucket: "uservey-9dcd1.appspot.com",
  messagingSenderId: "132269150322",
  appId: "1:132269150322:web:3224a78ef88f527df072eb",
  measurementId: "G-GLFMF61V75",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default class Authen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
    };

    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
    this.google = this.google.bind(this);
    this.googleRedirect = this.googleRedirect.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  login(e) {
    const email = this.email.value;
    const password = this.password.value;
    console.log(email, password);

    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, password);

    promise.then((user) => {
      var lout = document.getElementById("logout");
      lout.classList.remove("hide");
      var message = "Welcome " + user.user.email;
      this.setState({ message });
    });
    promise.catch((e) => {
      var message = e.message;
      console.log(message);
      this.setState({ message });
    });
  }

  signUp() {
    const email = this.email.value;
    const password = this.password.value;
    console.log("email" + email, password);

    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise.then((user) => {
      var message = "Welcome " + user.user.email;
      firebase
        .database()
        .ref("users/" + user.user.uid)
        .set({
          email: user.user.email,
        });
      console.log(user);
      this.setState({ message });
    });
    promise.catch((e) => {
      var message = e.message;
      console.log(message);

      this.setState({ message });
    });
  }

  logOut() {
    firebase.auth().signOut();
    var lout = document.getElementById("logout");
    lout.classList.add("hide");

    var message = "Thanks for bearing with us";
    this.setState({ message });
  }

  google() {
    var provider = new firebase.auth.GoogleAuthProvider();
    var promise = firebase.auth().signInWithPopup(provider);
    promise.then((result) => {
      console.log("pop " + result);

      var user = result.user;
      firebase
        .database()
        .ref("users/" + user.uid)
        .set({ email: user.email, name: user.displayName });
    });
    promise.catch((e) => {
      var message = e.message;
      console.log(message);
    });
  }

  googleRedirect() {
    // Using a redirect.
    firebase
      .auth()
      .getRedirectResult()
      .then(function (result) {
        if (result.credential) {
          // This gives you a Google Access Token.
          var token = result.credential.accessToken;
          console.log(token);
        }
        var user = result.user;
        this.setState({ message: user });
        console.log(this.state.message);
      });

    // Start a sign in process for an unauthenticated user.
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    firebase.auth().signInWithRedirect(provider);
  }

  render() {
    return (
      <div>
        <input
          id="email"
          ref={(email) => (this.email = email)}
          type="email"
          placeholder="Enter your email"
        />
        <input
          id="pass"
          ref={(pass) => (this.password = pass)}
          type="password"
          placeholder="Enter your password"
        />
        <br />
        <p>{this.state.message}</p>
        <button onClick={this.login}>Log In</button>
        <button onClick={this.signUp}>Sign Up</button>
        <button id="logout" className="hide" onClick={this.logOut}>
          Log Out
        </button>
        <br />
        <button className="google" onClick={this.google} id="google">
          Sign in with google
        </button>

        <button className="google" onClick={this.googleRedirect} id="google">
          Sign in with google Redirect
        </button>
      </div>
    );
  }
}
