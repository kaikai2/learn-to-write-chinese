import { PREPARE_RECOGNISE, START_RECOGNISE, RECOGNISE } from "../actionTypes";
import { CharSheets} from "../charSheets"

const initialState = {
  newChar: [],
  reviewChar: [],
  charsToLearn: {},
  quizQueue: [],
  seed: 0,
  recogniseHistory: [],
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
    case PREPARE_RECOGNISE: {
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
          seed: seed
      };
    }
    case START_RECOGNISE: {
      let recogniseHistory = state.recogniseHistory instanceof Array ? state.recogniseHistory : []
      let newChar = state.newChar instanceof Array ? state.newChar : []
      let reviewChar = state.reviewChar instanceof Array ? state.reviewChar : []
      return {
        ...state,
        recogniseHistory: [...recogniseHistory, { 
          date: new Date(),
          newChar: newChar,
          reviewChar: reviewChar,
          finishDate: null
        }]
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
      let recogniseHistory = state.recogniseHistory
      if (!recognised) {
        if (quizQueue.length > 3) {
          var i = Math.floor(random(seed++) * quizQueue.length - 3) + 3
          quizQueue.push(quizQueue[i])
          quizQueue[i] = theChar
        } else {
          quizQueue.push(theChar)
        }
      } else {
        // passed?
        if (quizQueue.length === 0) {
          let currentRecognise = recogniseHistory[recogniseHistory.length - 1]
          recogniseHistory = [...recogniseHistory.slice(0, -1), {
            ...currentRecognise,
            finishDate: new Date()
          }]
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
        recogniseHistory: recogniseHistory
      };
    }
    default:
      return state;
  }
}
