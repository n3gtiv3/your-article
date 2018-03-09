import React, { Component, PropTypes } from 'react';
import SummaryBoxRow from './components/SummaryBoxRow';
import Box from '../../components/Box/';
import {saveTransaction, getSummary} from "actions/dashboard";
import {closeModal} from "actions/common";
import {connect} from "react-redux";
import Modal from 'react-responsive-modal';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.handleSaveTxn = this.handleSaveTxn.bind(this);
    this.state = {
      modal : false,
      date : new moment()
    }
  }
  componentDidMount(props){
      this.props.getSummary();
  }
  handleSaveTxn(){
    this.props.saveTransaction(
      this.state.transactionType,
      this.state.quantity,
      this.state.price,
      this.state.date,
      this.state.stockCode
    );
  }
  render(){
    const props = this.props;
    const {currentState} = this.props;
    if(currentState === 2){
      return (
        <div>
          <SummaryBoxRow
            ltcg={props.ltcg}
            stcg={props.stcg}
            speculation={props.speculation}
          />
          <div className = "row">
                <Box>
          				<h2>Add a Transaction</h2>
                  <div className="Form-control">
                    <div className="row">
                      <div className="col-md-4">
                        <select className="Form-field" onChange = {(e)=>{this.setState({transactionType:e.target.value})}}>
                          <option value="" default>Transaction type</option>
                          <option value="buy">Purchase</option>
                          <option value="sell">Sale</option>
                        </select>
                      </div>
                    </div>
                  </div>
          				{
                    this.state.transactionType &&
                    <div className="row">
            					<form className="Form col-md-5">
            						<div className="Form-control">
            							<input className="Form-field" type="text" placeholder="Stock Name" onChange={e => this.setState({stockCode:e.target.value})}/>
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
            							<input className="Form-field" type="number" placeholder="Price" onChange={e => this.setState({price:e.target.value})}/>
            						</div>
                        <div className="Form-control">
            							<input className="Form-field" type="number" placeholder="Quantity" onChange={e => this.setState({quantity:e.target.value})} />
            						</div>
            						<div className="Form-control">
            							<textarea rows="4" placeholder="Remarks" className="Form-field" />
            						</div>
            						<div className="Form-control">
            							<input className="Form-button" value="Add" onClick = {this.handleSaveTxn}/>
            						</div>
            					</form>

            				</div>
                  }
                </Box>
              </div>

          <Modal open={this.props.modal} onClose={this.props.closeModal} little>
              {this.props.success && <div className="success"> <p>Success!</p><p >{this.props.message}</p></div>}
              {!this.props.success && <div className="error"><p>Error!</p><p >{this.props.message}</p> </div>}

          </Modal>
        </div>
      );
    }else{
      return (<div></div>);
    }
  }
};
function mapStateToProps(state) {
    return {
        ...state.Dashboard
    };
}
function mapDispatchToProps(dispatch) {
  return {
    saveTransaction : (type, quantity, price, date, stockCode) => {
      dispatch(saveTransaction(type, quantity, price, date, stockCode));
    },
    closeModal : () => {
      dispatch(closeModal());
    },
    getSummary : () => {
      dispatch(getSummary());
    },
    getOpenings : () => {
      dispatch(getOpenings());
    },
    getSales : () => {
      dispatch(getSales());
    },
    getpurchases : () => {
      dispatch(getpurchases());
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
