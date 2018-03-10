import React, { Component, PropTypes } from 'react';
import Box from 'components/Box/';
import {getSales, getpurchases, getOpenings, updateTransaction, deleteTransaction} from "actions/summary";
import {closeModal} from "actions/common";
import {connect} from "react-redux";
import Modal from 'react-responsive-modal';
import DataTable from 'components/DataTable';
import TransactionInput from "components/transactionInput";

class Summary extends Component {
  constructor(props){
    super(props);
    this.init = this.init.bind(this);
    this.state = {
      updateModal : false
    }
    this.updateTransaction = this.updateTransaction.bind(this);
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
  updateTransaction(txnId, stockCode, quantity, price, date, transactionType, remarks){
    this.setState({
      txnId,
      updateModal : true,
      txnId,
      stockCode,
      quantity,
      price,
      date,
      remarks,
      transactionType
    })
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
            {summary &&
            <DataTable updateTransaction = {this.updateTransaction} deleteTransaction = {this.props.deleteTransaction}
            data={summary} titles={['Stock', 'Quantity', 'Price', 'Date', 'Remarks']}/>}
          </div>
          <Modal open={this.state.updateModal} onClose={()=>{this.setState({updateModal:false})}}>
            <TransactionInput txnId = {this.state.txnId} stockCode = {this.state.stockCode}
            price = {this.state.price} quantity = {this.state.quantity}
            date = {this.state.date} remarks = {this.state.remarks}
            transactionType = {this.state.transactionType}
            addTransaction = {this.props.updateTransaction}/>
          </Modal>
          <Modal open={this.props.modal} onClose={this.props.closeModal} little>
          {
            props.success && <div className="success"><p>Success!</p><p >{this.props.message}</p> </div>
          }
          {
            !props.success && <div className="error"><p>Error!</p><p >{this.props.message}</p> </div>
          }
          </Modal>

        </div>
      );updateModal
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
    },
    updateTransaction : (type, quantity, price, date, stockCode,remarks, txnId) => {
      dispatch(updateTransaction(type, quantity, price, date, stockCode,remarks, txnId));
    },
    deleteTransaction : (txnId) => {
      dispatch(deleteTransaction(txnId));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Summary);
