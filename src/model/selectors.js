
export const getCharsState = store => store.chars;

export const getNewCharList = store =>
    getCharsState(store) ? getCharsState(store).newChar : [];


export const getUnrecognisedCharList = store => {
    let chars = getCharsState(store);
    console.log('getUnrecognisedCharList:')
    if (chars){
        let charsToLearn = chars.charsToLearn;
        console.log('getUnrecognisedCharList', charsToLearn)
        window.debugValue = charsToLearn
        return Object.entries(charsToLearn)
            .filter(([c, v]) => !v.recognised)
            .map(([c, v]) => c);
    }
    return [];
}