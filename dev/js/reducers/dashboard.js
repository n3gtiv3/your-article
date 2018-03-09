import {dashboard as actionType} from "constants/actions";

export default (state = {currentState : 1}, action) => {
  switch (action.type) {
    case actionType.SAVE_TRANSACTION:
      return {
        ...state,
        message : action.message,
        success : action.success,
        modal : true
      }
    case actionType.CLOSE_MODAL:
      return {
        ...state,
        modal : false
      }
    case actionType.SUMMARY:
      return {
        ...state,
        ltcg : action.ltcg,
        stcg : action.stcg,
        speculation : action.speculation,
        currentState : 2
      }
    default:
      return state;
  }
}
