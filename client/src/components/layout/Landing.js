import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import If from "../../utils/if";



class Landing extends Component {


  render() {
    const { user } = this.props.auth;
    console.log(user);
    return (
      <div>
        <div style={{ width: "auto", height: "75vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align">
              <h4>
                <b>Hey there,</b> {user.name.split(" ")[0]}
                <p className="flow-text grey-text text-darken-1">
                  You are logged into a {" "}
                  <span style={{ fontFamily: "monospace" }}>Lanlink</span> Test 👏
              </p>
              </h4>
              <br />
              <If test={user.isAdmin}>
                <div className="col s3">
                  <Link
                    to="/register"
                    style={{
                      width: "300px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px"
                    }}
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  >
                    Register New Employee
                      </Link>
                </div>
                <div className="col s3">
                  <Link
                    to="/registerSection"
                    style={{
                      width: "300px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px"
                    }}
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  >
                    New Department
                      </Link>
                </div>
                <div className="col s3">
                  <Link
                    to="/registerTransictions"
                    style={{
                      width: "300px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px"
                    }}
                    className="btn btn-large waves-effect waves-light hoverable white black-text accent-3"
                  >
                    Register Transiction
                      </Link>
                </div>
                <div className="col s3">
                  <Link
                    to="/viewAllTransictions"
                    style={{
                      width: "300px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px"
                    }}
                    className="btn btn-large waves-effect waves-light hoverable white black-text accent-3"
                  >
                    View Transictions
                      </Link>
                </div>
              </If>
              <If test={!user.isAdmin}>
                <div className="col s6">
                  <Link
                    to="/registerTransictions"
                    style={{
                      width: "300px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px"
                    }}
                    className="btn btn-large waves-effect waves-light hoverable white black-text accent-3"
                  >
                    Register Transiction
                      </Link>
                </div>
                <div className="col s6">
                  <Link
                    to="/viewTransictions"
                    style={{
                      width: "300px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px"
                    }}
                    className="btn btn-large waves-effect waves-light hoverable white black-text accent-3"
                  >
                    View Transictions
                      </Link>
                </div>
              </If>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Landing)
