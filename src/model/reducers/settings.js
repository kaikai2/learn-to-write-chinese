import { CHANGE_SETTINGS, RESET_SETTINGS } from "../actionTypes"

const initialState = {
    complimentsEnabled: false,
    compliments: [
        '',
        '你真~棒啊!', 
        '厉~害',
        '记幸~不错',
        '棒棒棒',
        '还真是难不倒你啊',
        '你记住了耶',
        //'真他妈是个天才',
        //'我就不信你全知道',
    ],
    encouragementEnabled: false,
    encouragement: [
        '',
        '再想想看', 
        '哎呀，答错了', 
        //'我佛慈悲',
        //'我就知道你答不上来'

    ],
    wordsEnabled: false,
    maxWords: 3,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SETTINGS: {
        console.log('reducers.settings', action.payload)
        let { key, value } = action.payload
        let newState = {
            ...state,
        }
        newState[key] = value
        return newState
    }
    case RESET_SETTINGS: {
        return initialState
    }
    default:
      return state
  }
}
