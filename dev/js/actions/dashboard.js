import {dashboard as actionType} from "constants/actions"
import TransactionService from "service/transactions";

function _handleError(action, message){
  return {
    type : action,
    message : message,
    success : false
  }
}

export function saveTransaction(type, quantity, price, date, stockCode){
  return dispatch => {
    if(!type){
      dispatch(_handleError("Enter a valid transaction type"));
      return ;
    }
    if(!stockCode){
      dispatch(_handleError("Enter a valid stock code"));
      return ;
    }
    if(!date){
      dispatch(_handleError("Enter a valid Date"));
      return ;
    }
    if(!price){
      dispatch(_handleError("Enter a valid price"));
      return ;
    }
    if(!quantity){
      dispatch(_handleError("Enter a valid quantity"));
      return ;
    }
    let longDate = date.valueOf();
    TransactionService.saveTransaction(
      type,
      quantity,
      price,
      longDate,
      stockCode
    ).then(response => {
      console.log(response);
      dispatch({
        type : actionType.SAVE_TRANSACTION,
        message : response.message,
        success : true
      });
    }, error => {
      dispatch(_handleError(actionType.SAVE_TRANSACTION, error.message));
    })
  }
}

export function getSummary(){
  return dispatch => {
    TransactionService.getSummary().then(response => {
      dispatch({
        type : actionType.SUMMARY,
        speculation : response.speculation,
        ltcg : response.ltcg,
        stcg : response.stcg
      })
    }, error => {
      dispatch(_handleError(actionType.SUMMARY, error.message));
    });
  }
}
