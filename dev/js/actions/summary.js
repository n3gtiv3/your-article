import TransactionService from "service/transactions";
import {summary as actionType} from "constants/actions"

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
