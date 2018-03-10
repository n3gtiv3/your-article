import TransactionService from "service/transactions";
import {summary as actionType} from "constants/actions"
import {checkUserInput} from "actions/dashboard";
import {getDateWithoutTime} from "utils/format";

function _handleError(action, message){
  return {
    type : action,
    message : message,
  }
}
export function getOpenings(){
  return dispatch => {
    TransactionService.getOpenings().then(response => {
      dispatch({
        type : actionType.OPENINGS,
        openings : response.openings
      })
    }, error => {
    dispatch(_handleError(actionType.SUMMARY, error.message));
    });
  }
}
export function getpurchases(){
  return dispatch => {
    TransactionService.getpurchases().then(response => {
      dispatch({
        type : actionType.PURCHASES,
        purchases : response.purchases
      })
    }, error => {
      dispatch(_handleError(actionType.PURCHASES, error.message));
    });
  }
}
export function getSales(){
  return dispatch => {
    TransactionService.getSales().then(response => {
      dispatch({
        type : actionType.SALES,
        sales : response.sales
      })
    }, error => {
      dispatch(_handleError(actionType.SALES, error.message));
    });
  }
}
export function updateTransaction(type, quantity, price, date, stockCode, remarks,  txnId){
  return dispatch => {
    if(!checkUserInput(dispatch, actionType.UPDATE_TRANSACTION, type, quantity, price, date, stockCode, txnId)){
      return ;
    }
    date = getDateWithoutTime(date);
    let longDate = date.valueOf();
    TransactionService.updateTransaction(
      type,
      quantity,
      price,
      longDate,
      stockCode,
      remarks,
      txnId
    ).then(response => {
      console.log(response);
      dispatch({
        type : actionType.UPDATE_TRANSACTION,
        message : response.message,
        success : true
      });
      setTimeout(()=>{
        window.location.reload();
      }, 200);
    }, error => {
      dispatch(_handleError(actionType.UPDATE_TRANSACTION, error.message));
    })
  }
}
export function deleteTransaction(txnId){
  return dispatch => {
    TransactionService.deleteTransaction(txnId).then(response => {
      console.log(response);
      dispatch({
        type : actionType.DELETE_TRANSACTION,
        message : response.message,
        success : true
      });
      setTimeout(()=>{
        window.location.reload();
      }, 200);
    }, error => {
      dispatch(_handleError(actionType.DELETE_TRANSACTION, error.message));
    })
  }
}
