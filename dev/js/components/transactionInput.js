import React, { Component, PropTypes } from 'react';
import Box from "components/Box";
import DatePicker from 'react-datepicker';
import moment from 'moment';

export default class TransactionInput extends Component {
  constructor(props){
    super(props);
    this.handleSaveTxn = this.handleSaveTxn.bind(this);
    this.state = {
      txnId : props.txnId,
      stockCode : props.stockCode,
      price : props.price,
      date : new moment(props.date),
      transactionType : props.transactionType,
      quantity : props.quantity,
      remarks : props.remarks
    };
  }
  handleSaveTxn(){
    this.props.addTransaction(
      this.state.transactionType,
      this.state.quantity,
      this.state.price,
      this.state.date,
      this.state.stockCode,
      this.state.remarks,
      this.props.txnId
    );
  }
  render (){
    return(
      <div className = "row">
            <Box>
              <h2>Add a Transaction</h2>
              <div className="Form-control">
                <div className="row">
                  <div className="col-md-4">
                    <select value = {this.state.transactionType} className="Form-field" onChange = {(e)=>{this.setState({transactionType:e.target.value})}}>
                      <option value="" default>Transaction type</option>
                      <option value="buy">Purchase</option>
                      <option value="sell">Sale</option>
                    </select>
                  </div>
                </div>
              </div>
              {
                <div className="row">
                  <form className="Form col-md-5">
                    <div className="Form-control">
                      <input value = {this.state.stockCode} className="Form-field" type="text" placeholder="Stock Code" onChange={e => this.setState({stockCode:e.target.value})}/>
                    </div>
                    <div className="Form-control">
                      <DatePicker
                          onChange={date => this.setState({date})}
                          selected={this.state.date}
                          maxDate = {new moment()}
                          name = {"Transaction Date"}
                          className="Form-field"
                      />
                    </div>
                    <div className="Form-control">
                      <input value = {this.state.quantity} className="Form-field" type="number" placeholder="Quantity" onChange={e => this.setState({quantity:e.target.value})} />
                    </div>
                    <div className="Form-control">
                      <input value = {this.state.price} className="Form-field" type="number" placeholder="Price" onChange={e => this.setState({price:e.target.value})}/>
                    </div>
                    <div className="Form-control">
                      <textarea value = {this.state.remarks} rows="4" placeholder="Remarks" className="Form-field" onChange={e => this.setState({remarks:e.target.value})} />
                    </div>
                    <div className="Form-control">
                      <input className="Form-button" value="Add" onClick = {this.handleSaveTxn}/>
                    </div>
                  </form>

                </div>
              }
            </Box>
          </div>
    )
  };
};
