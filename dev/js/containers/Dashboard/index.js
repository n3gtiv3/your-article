import React, { Component, PropTypes } from 'react';
import SummaryBoxRow from './components/SummaryBoxRow';
import Box from '../../components/Box/';
import {saveTransaction, closeModal} from "actions/dashboard";
import {connect} from "react-redux";
import Modal from 'react-responsive-modal';

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.handleSaveTxn = this.handleSaveTxn.bind(this);
    this.state = {
      modal : false
    }
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
    return (
      <div>
        <SummaryBoxRow
          ltcg={13}
          stcg={150}
          total={15432}
        />
        <div className = "row">
              <Box>
        				<h2>Add a Transaction</h2>
                <div className="Form-control">
                  <div className="row">
                    <div className="col-md-4">
                      <select className="Form-field" onChange = {(e)=>{this.setState({transactionType:e.target.value})}}>
                        <option value="" default>Transaction type</option>
                        <option value="buy">Opening</option>
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
          							<input className="Form-field" type="date" placeholder="Date" onChange={e => this.setState({date:e.target.value})}/>
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
        <div className="row">
          <div className="col-md-7">
            <Box className="ChartBox">
              <h2 className="ChartBox-title">
                Openings
              </h2>
            </Box>
          </div>

        </div>
        <Modal open={this.props.modal} onClose={this.props.closeModal} little>
            {this.props.success && <div className="success"> <p>Success!</p><p >{this.props.message}</p></div>}
            {!this.props.success && <div className="error"><p>Error!</p><p >{this.props.message}</p> </div>}

        </Modal>
      </div>
    );
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
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
