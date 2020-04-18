import {
    START_RECOGNISE, 
    RECOGNISE, 
    CHANGE_NEW
} from './actionTypes'

export const startRecognise = (newList, reviewList) => ({
    type: START_RECOGNISE,
    payload: {
        newList,
        reviewList 
    }
});

export const recognise = (theChar, recognised ) => ({
    type: RECOGNISE,
    payload: {
        theChar,
        recognised 
    }
});

export const changeNew = (newListIndex) => ({
    type: CHANGE_NEW,
    payload: {
        newListIndex,
    }
});
