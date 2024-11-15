import React from "react";
import './WelcomeScreen.css';

function WelcomeScreen(props) {
  return props.showWelcomeScreen ? (
    <div className="WelcomeScreen">
      <div className="container">
      <h1>Welcome to the Meet app</h1>
      <h4>Log in to see upcoming events around the world for full-stack developers</h4>
      <div className="button_cont" align="center">
        <div className="google-btn">
          <div className="google-icon-wrapper">
            <img
              className="google-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
              alt="Google sign-in"
            />
          </div>
          <button
            onClick={() => { props.getAccessToken() }}
            rel="nofollow noopener"
            className="btn-text"
          >
            <b>Sign in with google</b>
          </button>
        </div>
      </div>
      <a href="/privacy.html" rel="nofollow noopener">
        Privacy policy
      </a>
    </div>
  </div>
  ) : null;
}

export default WelcomeScreen;
