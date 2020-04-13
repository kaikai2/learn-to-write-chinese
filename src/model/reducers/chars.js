import { START_RECOGNISE, RECOGNISE } from "../actionTypes";
import { CharSheets} from "../charSheets"

const initialState = {
  newChar: [],
  reviewChar: [],
  charsToLearn: {},
  quizQueue: [],
  seed: 0,
};

function random(seed) {
  var x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function shuffle(array, seed){
  for (var m = array.length; m;) {
    var i = Math.floor(random(seed++) * m);
    m--;
    var t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return {
    array,
    seed
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case START_RECOGNISE: {
        console.log('reducers.chars', action.payload)
        const { newList, reviewList } = action.payload
        const newChar = newList.map(listName => CharSheets[listName]).join("").split("")
        const reviewChar = reviewList.map(listName => CharSheets[listName]).join("").split("")
        // newChar must learn 2 times.
        const {array, seed} = shuffle(newChar.concat(reviewChar), state.seed)
        const quizQueue = newChar.concat(array)
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
            quizQueue: quizQueue,
            seed: seed,
        };
    }
    case RECOGNISE: {
      const { theChar, recognised } = action.payload;
      if (theChar !== state.quizQueue[0]) {
        console.log('Exception! theChar should be the first in queue');
        return state
      }

      let quizQueue = state.quizQueue.slice(1)
      let seed = state.seed
      if (!recognised) {
        if (quizQueue.length > 3) {
          var i = Math.floor(random(seed++) * quizQueue.length - 3) + 3
          quizQueue.push(quizQueue[i])
          quizQueue[i] = theChar
        } else {
          quizQueue.push(theChar)
        }
      }
      return {
        ...state,
        charsToLearn: {
          ...state.charsToLearn,
          [theChar]: {
            tried: state.charsToLearn[theChar].tried + 1,
            recognised: recognised
          }
        },
        quizQueue: quizQueue,
        seed: seed,
      };
    }
    default:
      return state;
  }
}