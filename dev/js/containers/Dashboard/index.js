import React, { Component, PropTypes } from 'react';
import SummaryBoxRow from './components/SummaryBoxRow';
import Box from '../../components/Box/';

const Dashboard = (props) => {
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
                    <select className="Form-field">
                      <option value="" default>Transaction type</option>
                      <option value="opening">Opening</option>
                      <option value="purchase">Purchase</option>
                      <option value="sale">Sale</option>
                    </select>
                  </div>
                </div>
              </div>
      				{
                props.transactionType &&
                <div className="row">
        					<form className="Form col-md-5">
        						<div className="Form-control">
        							<input className="Form-field" type="text" placeholder="Stock Name" />
        						</div>

        						<div className="Form-control">
        							<input className="Form-field" type="datetime-local" placeholder="Date" />
        						</div>



        						<div className="Form-control">
        							<textarea rows="4" placeholder="Remarks" className="Form-field" />
        						</div>
        						<div className="Form-control">
        							<input className="Form-button" type="submit" value="Add" />
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
    </div>
  );
};
export default Dashboard;
