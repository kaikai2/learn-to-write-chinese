
const SpeakModule = {
    synth: null,
    voice: null,
    utterances: []
}


export const speak = (text, flush = false) => {
    const self = this
    const p = new Promise((resolve, reject) => {
        if (!SpeakModule.synth){
            SpeakModule.synth = window.speechSynthesis
        }

        if (SpeakModule.synth && typeof SpeakModule.synth.speak === "function" && !SpeakModule.voice){
            var zhVoices = SpeakModule.synth.getVoices().filter(v => v.lang.startsWith('zh'))
            console.log(zhVoices)
            var sortedVoices = Array.prototype.concat.apply([], 
                ['zh-CN', 'zh-HK', 'zh-TW'].map(c => zhVoices.filter(v => v.lang === c)))
            if (sortedVoices.length > 0) {
                SpeakModule.voice = sortedVoices[0]
            }        
        }

        if (SpeakModule.voice) {
            var utterThis = new SpeechSynthesisUtterance(text)
            utterThis.voice = SpeakModule.voice
            utterThis.onend = resolve.bind(self)
            if (!SpeakModule.synth.speaking) {
                SpeakModule.utterances.length = 0    
            }
            // https://stackoverflow.com/questions/23483990/speechsynthesis-api-onend-callback-not-working
            SpeakModule.utterances.push(utterThis)
            if (flush) {
                SpeakModule.synth.cancel()
            }
            SpeakModule.synth.speak(utterThis)
        } else {
            console.log('speak.reject')
            reject.bind(self)()
        }
    })
    return p;
}
