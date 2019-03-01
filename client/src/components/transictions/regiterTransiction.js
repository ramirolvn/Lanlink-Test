import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerTransictions } from "../../actions/transictionsActions";
import { getAllSections } from "../../actions/sectionsActions";
import classnames from "classnames";
import If from "../../utils/if";

class RegisterTransiction extends Component {
  constructor() {
    super();
    this.state = {
      transictionDescription: "",
      transictionPrice: "$ 0,00",
      section: "",
      user: {},
      sections: [],
      errors: {}
    };
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }else{
      const {user} = this.props.auth;
      this.setState({user: user});
      if(!user.isAdmin){
        this.setState({
         section: user.section
        });
      }else{
        this.props.getAllSections((err, result) => {
          if(err) {
              console.log(err)
          } else { 
            this.setState({sections: result});
            if(this.state.sections.length > 0){
              this.setState({section: this.state.sections[0].sectionName});
            }
          }
        });
      }
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
    if (e.target.id === "transictionPrice" && e.target.value !== null && e.target.value !== "") {
      if (e.target.value.includes("$") || !isNaN(e.target.value.substr(e.target.value.lenght - 1))) {
        e.target.value = this.formatMoney(e.target.value);
      } else {
        e.target.value = e.target.value.substr(0, e.target.value.length - 1);
      }

      if (e.target.value === "") {
        e.target.value = "$ 0,00";
      }
      this.setState({ [e.target.id]: e.target.value });
    }else{
      this.setState({ [e.target.id]: e.target.value });
    }
    
  };

  onSubmit = e => {
    e.preventDefault();

    const newTransiction = {
      transictionDescription: this.state.transictionDescription,
      transictionPrice: this.state.transictionPrice,
      section: this.state.section,
      employeeName: this.state.user.name,
      employeeId: this.state.user.id
    };


    this.props.registerTransictions(newTransiction, this.props.history);
  };

  formatMoney(
    string,
    decimals = 2,
    decimal = ",",
    thousands = ".",
    pre = "$ "
  ) {
    var numbers = string
      .toString()
      .match(/\d+/g)
      .join([]);
    numbers = numbers.padStart(decimals + 1, "0");
    var splitNumbers = numbers.split("").reverse();
    var mask = "";
    splitNumbers.forEach((d, i) => {
      if (i === decimals) {
        mask = decimal + mask;
      }
      if (i > decimals + 1 && (i - 2) % (decimals + 1) === 0) {
        mask = thousands + mask;
      }
      mask = d + mask;
    });
    if (mask.substring(0, 2) !== "0,") {
      while (mask.charAt(0) === "0") {
        mask = mask.substr(1);
      }
    }
    return pre + mask;
  }

  render() {
    const { errors } = this.state;
    const { user } = this.props.auth;
    const items = this.state.sections.map((f, index) => {
      return <option key={index} value={f.sectionName}>{f.sectionName}</option>;
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> new transiction
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit} autoComplete="off">
              <div className="input-field col s12">
                <textarea
                  onChange={this.onChange}
                  value={this.state.transictionDescription}
                  error={errors.name}
                  id="transictionDescription"
                  type="text"
                  maxLength="500"
                  className={classnames("", {
                    invalid: errors.transictionDescription
                  })}
                />
                <label htmlFor="name">Transiction Description</label>
                <span className="red-text">{errors.transictionDescription}</span>
              </div>
              <If test={!user.isAdmin}>
              <div className="input-field col s12">
              <input
                  onChange={this.onChange}
                  value={this.state.section}
                  error={errors.section}
                  id="section"
                  type="text"
                  className={classnames("", {
                    invalid: errors.section
                  })}
                  disabled
                />
                <span className="red-text">{errors.section}</span>
                </div>
              </If>
              <If test={user.isAdmin}>
              <label htmlFor="section">Section</label>
                <select id="section" onChange={this.onChange} className="browser-default">
                  {items}
                </select>
                <span className="red-text">{errors.section}</span>
              </If>
              <div className="input-field col s12">
                <input
                  placeholder="price"
                  onChange={e => this.onChange(e)}
                  value={this.state.transictionPrice}
                  error={errors.transictionPrice}
                  id="transictionPrice"
                  type="text"
                  className={classnames("", {
                    invalid: errors.transictionPrice
                  })}
                />
                <span className="red-text">{errors.transictionPrice}</span>
              </div>
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

RegisterTransiction.propTypes = {
  registerTransictions: PropTypes.func.isRequired,
  getAllSections: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerTransictions, getAllSections }
)(withRouter(RegisterTransiction));
