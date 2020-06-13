const VERSION = '2.0';
const getCharDataUrl = (char) => `https://cdn.jsdelivr.net/npm/hanzi-writer-data@${VERSION}/${char}.json`;

const localStorageKey_charDataCache = 'charDataCache'

// The defaultCharDataLoader comes from hanzi-writer, 
let defaultCharDataLoader = (char, onLoad, onError) => {
    // load char data from hanziwriter cdn (currently hosted on jsdelivr)
    const xhr = new global.XMLHttpRequest();
    if (xhr.overrideMimeType) { // IE 9 and 10 don't seem to support this...
      xhr.overrideMimeType('application/json');
    }
    xhr.open('GET', getCharDataUrl(char), true);
    xhr.onerror = (event) => {
      onError(xhr, event);
    };
    xhr.onreadystatechange = () => {
      // TODO: error handling
      if (xhr.readyState !== 4) return;
  
      if (xhr.status === 200) {
        onLoad(JSON.parse(xhr.responseText));
      } else if (xhr.status !== 0 && onError) {
        onError(xhr);
      }
    };
    xhr.send(null);
}

let cache = null

let getCache = () => {
    if (cache === null) {
        cache = {
            data: {},
            changes: 0
        }
        try {
            let charDataCache = localStorage.getItem(localStorageKey_charDataCache)
            if (charDataCache !== null){
                cache.data = JSON.parse(charDataCache)
            }
        } catch(err) {
            console.log('hanziDataLoader.getCache', err)
        }
    }

    return cache
}

let updateCache = (char, data) => {
    let cache = getCache()
    cache.data[char] = data
    cache.changes++
    if (cache.changes > 20) {
        cache.changes = 0
        try {
            const serializedState = JSON.stringify(cache.data)
            localStorage.setItem(localStorageKey_charDataCache, serializedState)
            console.log('saveState', serializedState.slice(0, 100))
        } catch(err) {
            // ignore write errors
            console.log('hanziDataLoader.getCache', err)
        }
    }
}

export const charDataLoader = (char, onLoad, onError) => {
    let cache = getCache()
    if (char in cache.data){
        setTimeout(() => {
            onLoad(cache.data[char])
        }, 0)
    } else {
        defaultCharDataLoader(char, (res) => {
            updateCache(char, res)
            onLoad(res)
        }, onError)
    }
}

export const cacheSize = () => {
    try {
        let charDataCache = localStorage.getItem(localStorageKey_charDataCache)
        return charDataCache.length
    } catch(err) {
        console.log('hanziDataLoader.cacheSize', err)
    }
    return 0
}
