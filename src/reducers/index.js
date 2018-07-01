import { combineReducers } from 'redux';
import { chosenSections, chosenCategories, startYear, endYear } from '../actions';

const thoseReducers = (state = [], action) => {
  switch (action.type) {
    case 'CHOSEN_SECTIONS':
      return [
        ...state,
        {
          val: action.val,
          title: action.title,
        }
      ]
    case 'CHOSEN_CATEGORIES':
      return [
        ...state,
        {
          val: action.val,
          title: action.title,
        }
      ]
    case 'START_YEAR':
      return [
        ...state,
        {
          year: action.year
        }
      ]
    case 'END_YEAR':
      return [
        ...state,
        {
          year: action.year
        }
      ]
    default:
      return state
  }
}

export default combineReducers({
  thoseReducers
})
