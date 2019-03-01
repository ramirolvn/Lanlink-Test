import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllTransictions } from "../../actions/transictionsActions";
import If from "../../utils/if";

class ViewAllTransictions extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      errors: {},
      transictions: [],
      search: "",
      isFilter: false,
      transictionsFiltreds: [],
      total: {}
    };
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated ) {
      this.props.history.push("/");
    }else{
      const {user} = this.props.auth;
      this.setState({user: user});
      this.props.getAllTransictions((err, result) => {
        if(err) {
            console.log(err)
        } else { 
          this.setState({transictions: result});
          this.calculTotal();
        }
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  createTable = () => {
    let table = []
    if(!this.state.isFilter){
      for (let i = 0; i < this.state.transictions.length; i++) {
        let children = []
        for (let j = 0; j < 4; j++) {
          switch(j) {
            case 0:
            children.push(<td key={"transictionDescription"+this.state.transictions[i]["id"]}>{this.state.transictions[i]["transictionDescription"]}</td>)
              break;
            case 1:
            children.push(<td key={"section"+this.state.transictions[i]["id"]}>{this.state.transictions[i]["section"]}</td>)
              break;
            case 2:
            children.push(<td key={"employeeName"+this.state.transictions[i]["id"]}>{this.state.transictions[i]["employeeName"]}</td>)
              break;
            default:
            children.push(<td key={"transictionPrice"+this.state.transictions[i]["id"]}>{this.state.transictions[i]["transictionPrice"]}</td>)
          }
          
        }
        table.push(<tr key={"tr"+i}>{children}</tr>)
      }
      return table
    }else{
      if(this.state.transictionsFiltreds.length > 0){
        for (let i = 0; i < this.state.transictionsFiltreds.length; i++) {
          let children = []
          for (let j = 0; j < 4; j++) {
            switch(j) {
              case 0:
              children.push(<td key={"transictionDescription"+j}>{this.state.transictionsFiltreds[i]["transictionDescription"]}</td>)
                break;
              case 1:
              children.push(<td key={"section"+j}>{this.state.transictionsFiltreds[i]["section"]}</td>)
                break;
              case 2:
              children.push(<td key={"employeeName"+j}>{this.state.transictionsFiltreds[i]["employeeName"]}</td>)
                break;
              default:
              children.push(<td key={"transictionPrice"+j}>{this.state.transictionsFiltreds[i]["transictionPrice"]}</td>)
            }
          }
          table.push(<tr key={"tr"+i}>{children}</tr>)
        }
      }
      return table
    }
    
  }

  onClick(e){
    e.preventDefault();
    if(this.state.search === "" || this.state.search === null){
      this.setState({isFilter: false},
        () => {
          this.calculTotal();
        }
      );
      
    }else{
      let transictions = this.filterByValue(this.state.transictions, this.state.search);
      this.setState({isFilter: true, transictionsFiltreds: transictions},
        () => {
          this.calculTotal();
        }
      );
      this.calculTotal();
      this.createTable();
    }
  }

  filterByValue(array, string) {
    let filtreds = [];
    array.forEach((obj) => {
      Object.keys(obj).forEach((key) => {
          if(key === "transictionDescription" || key === "employeeName"){
            if(obj[key].toString().toLowerCase().includes(string.toString().toLowerCase()) && !filtreds.includes(obj)){
              filtreds.push(obj);
            }
          }
      });
    });
    return filtreds;
  }
  

  onChange = e => {
      this.setState({ [e.target.id]: e.target.value });
  };

  calculTotal(){
    var totalDolars = 0;
    var totalCents = 0;
    if(this.state.isFilter){
      this.state.transictionsFiltreds.forEach((obj) => {
        Object.keys(obj).forEach((key) => {
            if(key === "transictionPrice"){
              let price = obj[key];
              var cents = price.split(",")[1].match(/\d/g);
              var dolars = price.split(",")[0].match(/\d/g);
              if(cents !== null){
                cents = parseFloat(cents.join(""));
                totalCents = totalCents+cents;
              }
              if(dolars !== null){
                dolars = parseFloat(dolars.join(""));
                totalDolars = totalDolars+dolars;
              }
            }
        });
      });
      let total = this.formatMoney(totalDolars+totalCents/100);
      this.setState({total: {name: "Sub-Total", qnt: total }});
    }else{
      this.state.transictions.forEach((obj) => {
        Object.keys(obj).forEach((key) => {
            if(key === "transictionPrice"){
              let price = obj[key];
              var cents = price.split(",")[1].match(/\d/g);
              var dolars = price.split(",")[0].match(/\d/g);
              if(cents !== null){
                cents = parseFloat(cents.join(""));
                totalCents = totalCents+cents;
              }
              if(dolars !== null){
                dolars = parseFloat(dolars.join(""));
                totalDolars = totalDolars+dolars;
              }
            }
        });
      });
      let total = this.formatMoney(totalDolars+totalCents/100);
      this.setState({total: {name: "Total", qnt: total }});
    }
  }

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
    const { user } = this.props.auth;
    const { total } = this.state;

    return (
      
      <div className="container">
        <If test={user.isAdmin}>
        <div className="Row">
          <div className="searchBar">
            <input type="text" onChange={this.onChange} placeholder="Look for an Employee Name or Description" id="search" name="search" value={this.state.search}/>
          </div>
          <div className="searchButton">
          <button className="btn black waves-effect waves-light" onClick={e=>this.onClick(e)} type="submit" name="action">Submit</button>
          </div>
        </div>
        <table className="striped" id="customers">
        <tbody>
        <tr>
          <th>Transiction Description</th>
          <th>Department</th>
          <th>Employee Name</th>
          <th>Transiction Price</th>
        </tr>
          {this.createTable()}
        </tbody>
        <tfoot>
          <tr>
              <th></th>
              <th></th>
              <th>{total.name}</th>
              <td>{total.qnt}</td>
          </tr>
      </tfoot>
      </table>
      </If>
      </div>
    );
  }
}

ViewAllTransictions.propTypes = {
  getAllTransictions: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getAllTransictions }
)(withRouter(ViewAllTransictions));
