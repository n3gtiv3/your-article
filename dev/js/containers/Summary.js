import React, { Component, PropTypes } from 'react';
import Box from 'components/Box/';
import {getSales, getpurchases, getOpenings} from "actions/summary";
import {closeModal} from "actions/common";
import {connect} from "react-redux";
import Modal from 'react-responsive-modal';
import DataTable from 'components/DataTable';

class Summary extends Component {
  constructor(props){
    super(props);
    this.init = this.init.bind(this);
  }
  init(props){
    const path = props.route.path;
    if(path === "/opening"){
      this.props.getOpenings();
    }else if(path === "/sale"){
      this.props.getSales();
    }else if(path === "/purchase"){
      this.props.getpurchases();
    }
  }
  componentDidMount(){
    this.init(this.props);
  }
  componentWillReceiveProps(nextProps){
    if(this.props.route.path != nextProps.route.path){
      this.init(nextProps);
    }
  }
  render(){
    const props = this.props;
    const {summary} = this.props;
      return (
        <div>
        <center><h1>{props.heading}</h1></center>
          <div className = "row">
            {summary && <DataTable data={summary} titles={['Stock', 'Quantity', 'Price', 'Date']}/>}
          </div>
          <Modal open={this.props.modal} onClose={this.props.closeModal} little>
              <div className="error"><p>Error!</p><p >{this.props.message}</p> </div>
          </Modal>
        </div>
      );
  }
};
function mapStateToProps(state) {
    return {
        ...state.Summary
    };
}
function mapDispatchToProps(dispatch) {
  return {
    getOpenings : () => {
      dispatch(getOpenings());
    },
    getSales : () => {
      dispatch(getSales());
    },
    getpurchases : () => {
      dispatch(getpurchases());
    },
    closeModal : () => {
      dispatch(closeModal());
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Summary);
