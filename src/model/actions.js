import {
    PREPARE_RECOGNISE,
    START_RECOGNISE,
    RECOGNISE, 
    CHANGE_NEW,
    CHANGE_SETTINGS,
    RESET_SETTINGS
} from './actionTypes'

export const prepareRecognise = (newList, reviewList) => ({
    type: PREPARE_RECOGNISE,
    payload: {
        newList,
        reviewList 
    }
})

export const startRecognise = () => ({
    type: START_RECOGNISE,
    payload: {        
    }
})

export const recognise = (theChar, recognised ) => ({
    type: RECOGNISE,
    payload: {
        theChar,
        recognised 
    }
})

export const changeNew = (newListIndex) => ({
    type: CHANGE_NEW,
    payload: {
        newListIndex,
    }
})

export const changeSettings = (key, value) => ({
    type: CHANGE_SETTINGS,
    payload: {
        key,
        value
    }
})

export const resetSettings = () => ({
    type: RESET_SETTINGS,
    payload: {
    }
})
