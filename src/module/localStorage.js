export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state')
        if (serializedState === null) {
            console.log('loadState, state is null')
            return undefined
        }
        console.log('loadState', serializedState)
        let r = JSON.parse(serializedState)
        console.log('loadState, pared:', r)
        return r;
    } catch (err) {
        console.log('loadState, caught err:', err)
        return undefined
    }
}

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
        console.log('saveState', serializedState)
    } catch(err) {
        // ignore write errors
        console.log('saveState, caught err:', err)
    }
}
