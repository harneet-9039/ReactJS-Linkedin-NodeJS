import React, { Component } from "react";
import "./App.css";
import ProfileCard from "./components/ProfileCard";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import brands from "@fortawesome/fontawesome-free-brands";

var IN = null;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorized: false,
      firstName: null,
      lastName: null,
      headline: null,
      profileURL: null,
      pictureURL: null,
      location: null,
      positions: null,
      summary: null,
      connectionsCount: null,
    };
  }
  isLinkedinAuthorized = () => {
    return IN.User.isAuthorized();
  };
  linkedinAuthorize = () => {
    IN.User.authorize(this.onLinedInLoad());
  };
  updateAuthorizeStatus = () => {
    if (IN === null) {
      IN = window.IN;
    }
    if (this.isLinkedinAuthorized()) {
      this.setState({
        isAuthorized: true
      });
      this.requestLinkedinProfile();
    }
  };
  onLinedInLoad = () => {
    IN.Event.on(IN, "auth", this.updateAuthorizeStatus);
  };
  linkedinLogout = () => {
    IN.User.logout(this.updateAuthorizeStatus);
  };
  componentDidMount = () => {
    this.loadLinkedinJS();
  };

  loadLinkedinJS = () => {
    window.updateAuthorizeStatus = this.updateAuthorizeStatus;
    var script = window.document.createElement("script");
    script.src = "//platform.linkedin.com/in.js";
    script.innerHTML = `api_key: 81h5ijp2ap1spm
    authorize: true
    onLoad:updateAuthorizeStatus`;
    script.async = true;
    document.getElementsByTagName("head")[0].appendChild(script);
  };

  requestLinkedinProfile = () => {
    IN.API.Raw(
      "/people/~:(first-name,last-name,public-profile-url,location,headline,picture-url,positions,summary,num-connections)?format=json"
    )
      .method("GET")
      .body()
      .result(this.updateLinkedinProfile);
  };

  updateLinkedinProfile = profile => {
    this.setState({
      firstName: profile.firstName,
      headline: profile.headline,
      lastName: profile.lastName,
      profileURL: profile.publicProfileUrl,
      pictureURL: profile.pictureUrl,
      location: profile.location.name,
      positions: profile.positions,
      summary: profile.summary,
      connectionsCount: profile.numConnections
    });
  };

  

  requestOAuthToken = () => {
    console.log(process.env.EXPRESS_APP_CLIENT_ID);
    console.log(process.env.EXPRESS_APP_CLIENT_SECRET);
    var oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&scope=r_basicprofile&state=123456&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`
    var width = 450,
      height = 730,
      left = window.screen.width / 2 - width / 2,
      top = window.screen.height / 2 - height / 2;

    window.addEventListener(
      "message",
      (event) => {
        if (event.data.type === "access_token") {
          Alert.success(`Access token obtained: ${event.data.access_token}`,{position:'top'});
        }
      },
      false
    );

    window.open(
      oauthUrl,
      "Linkedin",
      "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" +
        width +
        ", height=" +
        height +
        ", top=" +
        top +
        ", left=" +
        left
    );
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Linkedin Login</h1>
          <p className="App-intro">A demo page for Linkedin login</p>
          <FontAwesomeIcon icon={["fab", "github"]} />{" "}
          <a
            href="https://github.com/harneet-9039/ReactJS-Linkedin-NodeJS"
            className="github-link"
          >
            harneet-9039/React-Linkedin-Login
          </a>
          <Alert />
        </header>
        <div className="App-body">
          {this.state.isAuthorized ? (
            <span>
              <button onClick={this.linkedinLogout}>Linkedin Logout</button>
              
            </span>
          ) : (
            <button onClick={this.linkedinAuthorize}>Linkedin Login</button>
          )}
          <button onClick={this.requestOAuthToken}>
            Request OAuth2.0 Token
          </button>
          {this.state.isAuthorized &&
            this.state.summary && (
              <ProfileCard
                firstName={this.state.firstName}
                headline={this.state.headline}
                lastName={this.state.lastName}
                profileURL={this.state.profileURL}
                pictureURL={this.state.pictureURL}
                location={this.state.location}
                positions={this.state.positions}
                summary={this.state.summary}
                connectionsCount={this.state.connectionsCount}
              />
            )}
        </div>
      </div>
    );
  }
}

export default App;
