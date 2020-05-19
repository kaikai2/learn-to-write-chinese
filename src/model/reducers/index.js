import { combineReducers } from 'redux'

import chars from './chars'
import charSheets from './charSheets'
import settings from './settings'

export default combineReducers( {
    chars, 
    charSheets,
    settings
})
