import { createStore } from 'redux';

function actionState(state = { value: '' }, action) {
    switch (action.type) {
      case 'callVideo':
        state.value = 'callVideo';
        return state
      default:
        return state
    }
  }
  
  export let storeSate = createStore(actionState);