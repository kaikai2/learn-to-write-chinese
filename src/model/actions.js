import {START_RECOGNISE, RECOGNISE} from './actionTypes'

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
