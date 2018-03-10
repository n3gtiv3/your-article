import React, { Component, PropTypes } from 'react';
import SummaryBoxRow from './components/SummaryBoxRow';
import Box from '../../components/Box/';
import {saveTransaction, getSummary} from "actions/dashboard";
import {closeModal} from "actions/common";
import {connect} from "react-redux";
import Modal from 'react-responsive-modal';
import TransactionInput from "components/transactionInput";
import 'react-datepicker/dist/react-datepicker.css';

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal : false
    }
  }
  componentDidMount(props){
      this.props.getSummary();
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

          <TransactionInput addTransaction = {this.props.saveTransaction}/>
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
    saveTransaction : (type, quantity, price, date, stockCode, remarks) => {
      dispatch(saveTransaction(type, quantity, price, date, stockCode, remarks));
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
