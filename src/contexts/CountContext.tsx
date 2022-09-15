import React from 'react';
import { createContext, useState, useReducer } from 'react';
import { ContextProviderPropsInterface } from '../interfaces';

interface CountStateInterface {
  count: number;
  other: string;
}

interface CounterContextInterface {
  state: CountStateInterface;
  increment(): void;
  decrement(): void;
  set(value: number): void;
}

const ACTION = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement',
  SET: 'set',
};

const initialState: CountStateInterface = {
  count: 0,
  other: 'something',
};

const reducer = (state: CountStateInterface, action: any) => {
  console.log(action);
  switch (action.type) {
    case ACTION.INCREMENT:
      return { ...state, count: state.count + 1 };
    case ACTION.DECREMENT:
      return { ...state, count: state.count - 1 };
    case ACTION.SET:
      return { ...state, count: (state.count = action.payload) };
    default:
      return state;
  }
  return { ...state, count: state.count + 1 };
};

export const CountContext = createContext<CounterContextInterface>({
  state: initialState,
  increment: () => undefined,
  decrement: () => undefined,
  set: (value: number) => undefined,
});

export const CountContextProvider = ({
  children,
}: ContextProviderPropsInterface) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [count, setCount] = useState(0);
  const increment = () => {
    // setCount(count + 1);
    dispatch({ type: ACTION.INCREMENT });
  };
  const decrement = () => {
    dispatch({ type: ACTION.DECREMENT });
  };
  const set = (value: number) => {
    dispatch({ type: ACTION.SET, payload: value });
  };
  // const set = (value: number) => {
  //   // setCount(value);
  // };
  return (
    <CountContext.Provider value={{ state, increment, decrement, set }}>
      {children}
    </CountContext.Provider>
  );
};
