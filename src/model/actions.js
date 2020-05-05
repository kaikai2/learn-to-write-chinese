import {
    PREPARE_RECOGNISE,
    START_RECOGNISE,
    RECOGNISE, 
    CHANGE_NEW
} from './actionTypes'

export const prepareRecognise = (newList, reviewList) => ({
    type: PREPARE_RECOGNISE,
    payload: {
        newList,
        reviewList 
    }
});

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
});

export const changeNew = (newListIndex) => ({
    type: CHANGE_NEW,
    payload: {
        newListIndex,
    }
});
