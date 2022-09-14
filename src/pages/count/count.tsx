import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, counterActions } from '../../redux';

export const CountPage: FC = () => {
  const { count } = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>The count is: {count}</h1>
      <button onClick={() => dispatch(counterActions.increment())}>
        Increment
      </button>
      <button onClick={() => dispatch(counterActions.decrement())}>
        Decrement
      </button>
      <button onClick={() => dispatch(counterActions.set(11))}>
        Set to 11
      </button>
    </div>
  );
};
