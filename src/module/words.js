import {getStatistics} from 'chinese-lexicon/statistics'
import {shuffle} from 'lodash'


export const descriptiveWords = theChar => {
    const topWords = getStatistics({simp: theChar, trad: theChar, pinyin: ''}).topWords
    let toSpeak = theChar
    if (topWords.length > 0){
        const candidates = shuffle(topWords.filter(e => 
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
