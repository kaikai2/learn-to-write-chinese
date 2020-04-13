import { START_RECOGNISE, RECOGNISE } from "../actionTypes";
import { CharSheets} from "../charSheets"

const initialState = {
  newChar: [],
  reviewChar: [],
  charsToLearn: {},
};


export default function(state = initialState, action) {
  switch (action.type) {
    case START_RECOGNISE: {
        console.log('reducers.chars', action.payload)
        const { newList, reviewList } = action.payload;
        const newChar = newList.map(listName => CharSheets[listName]).join("").split("");
        const reviewChar = reviewList.map(listName => CharSheets[listName]).join("").split("");
        return {
            ...state,
            newChar: newChar,
            reviewChar:  reviewChar,
            charsToLearn: newChar.concat(reviewChar).reduce(function(result, item, index, array){
                result[item] = {
                    tried: 0,
                    recognised: false,
                };
                return result
            }, {}),
        };
    }
    case RECOGNISE: {
      const { theChar, recognised } = action.payload;
      return {
        ...state,
        charsToLearn: {
          ...state.charsToLearn,
          [theChar]: {
            tried: state.charsToLearn[theChar].tried + 1,
            recognised: recognised
          }
        }
      };
    }
    default:
      return state;
  }
}
