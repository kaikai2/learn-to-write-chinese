
export const getCharsState = store => store.chars;

export const getNewCharList = store =>
    getCharsState(store) ? getCharsState(store).newChar : [];

export const getReviewCharList = store =>
    getCharsState(store) ? getCharsState(store).reviewChar : [];

    
export const getUnrecognisedCharList = store => {
    let chars = getCharsState(store);
    if (chars){
        let charsToLearn = chars.charsToLearn;
        window.debugValue = charsToLearn
        return Object.entries(charsToLearn)
            .filter(([c, v]) => !v.recognised)
            .map(([c, v]) => c);
    }
    return [];
}

export const getQuizCharQueue = store => {
    let chars = getCharsState(store);
    if (chars){
        return chars.quizQueue;
    }
    return []
}