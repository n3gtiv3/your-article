import {dashboard as actionType} from "constants/actions"
import TransactionService from "service/transactions";

export function saveTransaction(type, quantity, price, date, stockCode){
  return dispatch => {
    let longDate = date;
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
      dispatch({
        type : actionType.SAVE_TRANSACTION,
        message : error.message,
        success : false
      });
    })
  }
}
export function closeModal(){
  return {
    type : actionType.CLOSE_MODAL
  }
}
