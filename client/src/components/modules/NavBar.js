import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  GoogleLogout,
} from "react-google-login";

import "./NavBar.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "443787533713-gl7npn20to1874psma3ittu2882rj3a4.apps.googleusercontent.com";



/**
 * The navigation bar at the top of all pages.
 */
class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="NavBar-container">
        <div  className="NavBar-title u-inlineBlock">Fiesta</div>
          
        <div className="NavBar-linkContainer u-inlineBlock">
          
          
          
           
            <Link to="/" className="NavBar-link">
            Home
          </Link>
          
          {this.props.userId && (
            <Link to={`/Feed/${this.props.userId}`} className="NavBar-link" >Feed</Link>
          )}
          
          {this.props.userId && (
            <Link to={`/profile/${this.props.userId}`} className="NavBar-link">
              Profile
            </Link>
          )}

          {this.props.userId ? (
            <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={this.props.handleLogout}
              onFailure={() => console.log("Failed logging out.")}
              className="NavBar-link NavBar-login"
            />
          ) : (
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={this.props.handleLogin}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login"
            />
          )}
        </div>
      </nav>
    );
  }
}

export default NavBar;

  