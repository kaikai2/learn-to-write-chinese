
import {getEntries} from 'chinese-lexicon'
import {shuffle} from 'lodash'

export const descriptiveWords = theChar => {
    const entries = getEntries(theChar)
    let toSpeak = theChar
    if (entries.length > 0){
        const candidates = shuffle(entries[0].statistics.topWords.filter(e => 
            e.word.length > theChar.length && 
            e.share > 0.01 &&
            e.word.includes(theChar)
            ).map(e => e.word))
        console.log(candidates)
        if (candidates.length > 0) {
            toSpeak += '，' + candidates.slice(0, 3).map(c => c + '的' + theChar).join('，')
        }
    }
    return toSpeak
}
