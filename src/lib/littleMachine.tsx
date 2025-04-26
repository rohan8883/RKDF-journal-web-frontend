import { createStore, useStateMachine } from 'little-state-machine';

export const littleMachineStore = createStore({
  language: 'en'
});

export function updateAction(state: any, payload: { [key: string]: any }) {
  return {
    ...state,
    ...payload
  };
}

export function useLittleMachine() {
  return useStateMachine({ updateAction });
}
