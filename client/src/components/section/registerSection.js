import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerSection } from "../../actions/sectionsActions";
import classnames from "classnames";
import If from "../../utils/if";

class RegisterSection extends Component {
  constructor() {
    super();
    this.state = {
      sectionName: "",
      user: {},
      errors: {}
    };
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }else{
      const {user} = this.props.auth;
      this.setState({user: user});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
      this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newSection = {
      sectionName: this.state.sectionName,
      adminName: this.state.user.name
    };
    this.props.registerSection(newSection, this.props.history);
  };


  render() {
    const { errors } = this.state;
    const { user } = this.props.auth;

    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> new department
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit} autoComplete="off">
              <If test={user.isAdmin}>
              <input
                  onChange={this.onChange}
                  value={this.state.sectionName}
                  error={errors.sectionName}
                  id="sectionName"
                  type="text"
                  maxLength="100"
                  className={classnames("", {
                    invalid: errors.sectionName
                  })}
                  
                />
                <label htmlFor="sectionName"></label> 
                <span className="red-text">{errors.sectionName}</span>
              </If>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

RegisterSection.propTypes = {
  registerSection: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerSection }
)(withRouter(RegisterSection));
