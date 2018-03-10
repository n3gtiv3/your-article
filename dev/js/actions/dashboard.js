import {dashboard as actionType} from "constants/actions"
import TransactionService from "service/transactions";

function _handleError(action, message){
  return {
    type : action,
    message : message,
    success : false
  }
}
export function checkUserInput(dispatch, action, type, quantity, price, date, stockCode){
  if(!type){
    dispatch(_handleError(action, "Enter a valid transaction type"));
    return false;
  }
  if(!stockCode){
    dispatch(_handleError(action, "Enter a valid stock code"));
    return false;
  }
  if(!date){
    dispatch(_handleError(action, "Enter a valid Date"));
    return false;
  }
  if(!price){
    dispatch(_handleError(action, "Enter a valid Price"));
    return false;
  }
  if(!quantity){
    dispatch(_handleError(action, "Enter a valid quantity"));
    return false;
  }
  return true;
}
export function saveTransaction(type, quantity, price, date, stockCode, remarks){
  return dispatch => {
    if(!checkUserInput(dispatch, actionType.SAVE_TRANSACTION, type, quantity, price, date, stockCode)){
      return ;
    }
    let longDate = date.valueOf();
    TransactionService.saveTransaction(
      type,
      quantity,
      price,
      longDate,
      stockCode,
      remarks
    ).then(response => {
      console.log(response);
      dispatch({
        type : actionType.SAVE_TRANSACTION,
        message : response.message,
        success : true
      });
      setTimeout(()=>{
        window.location.reload();
      }, 200);
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
      });

    }, error => {
      dispatch(_handleError(actionType.SUMMARY, error.message));
    });
  }
}
