import { createStore } from 'redux';

function counterReducer(state = { value: '' }, action) {
  switch (action.type) {
    case 'chatting':
      state.value = 'chatting';
      return state
    default:
      return state
  }
}

export let storeRedux = createStore(counterReducer);