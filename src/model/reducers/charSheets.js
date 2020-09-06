import { CHANGE_NEW } from "../actionTypes"

const initialState = {
  newListIndex: 56,
};


export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_NEW: {
        console.log('reducers.charSheets', action.payload)
        let { newListIndex } = action.payload
        if (newListIndex < 1) {
            newListIndex = 1
        }
        return {
            ...state,
            newListIndex: newListIndex,
        };
    }
    default:
      return state;
  }
}
