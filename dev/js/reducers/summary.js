import {summary as actionType} from "constants/actions";

export default (state = {modal : false}, action) => {
  switch (action.type) {
      case actionType.SUMMARY_ERROR:
        return {
          ...state,
          modal : true
        }
      case actionType.CLOSE_MODAL:
        return {
          ...state,
          modal : false
        }
      case actionType.OPENINGS:
        return {
          ...state,
          summary : action.openings,
          heading : 'Openings'
        }
      case actionType.PURCHASES:
        return {
          ...state,
          summary : action.purchases,
          heading : 'Purchases'
        }
      case actionType.SALES:
        return {
          ...state,
          summary : action.sales,
          heading : 'Sales'
        }
      default:
        return state;
  }
}
