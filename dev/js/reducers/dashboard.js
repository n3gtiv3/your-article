import {dashboard as actionType} from "constants/actions";

export default (state = {}, action) => {
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
    default:
      return state;
  }
}
