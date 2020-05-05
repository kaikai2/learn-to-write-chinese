
export const getCharsState = store => store.chars;

export const getNewCharList = store => {
    console.log('getNewCharList', getCharsState(store).newChar)
    return getCharsState(store) ? getCharsState(store).newChar : []
}

export const getReviewCharList = store => {
    console.log('getReviewCharList', getCharsState(store).reviewChar)
    return getCharsState(store) ? getCharsState(store).reviewChar : []
}

export const getUnrecognisedCharList = store =>
    getCharsState(store) ? Object.entries(getCharsState(store).charsToLearn)
        .filter(([c, v]) => !v.recognised)
        .map(([c, v]) => c) : []

export const getWrongChars = store => 
    getCharsState(store) ? Object.entries(getCharsState(store).charsToLearn)
        .filter(([c, v]) => !v.recognised && v.tried > 0)
        .map(([c, v]) => c) : []

export const getQuizCharQueue = store => 
    getCharsState(store) ? getCharsState(store).quizQueue : []

export const getCharSheetsState = store => store.charSheets

export const getNewListIndex = store => {
    console.log('getNewListIndex = ', getCharSheetsState(store));
    return getCharSheetsState(store) ? getCharSheetsState(store).newListIndex || 1 : 1
}

export const getRecogniseHistory = store => 
    getCharsState(store) ? getCharsState(store).recogniseHistory : []
