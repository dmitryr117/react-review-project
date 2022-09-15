import React, { FC, useContext, useState } from 'react';
import { CountContext } from '../../contexts/CountContext';

export const CountPage: FC = () => {
  const counterContext = useContext(CountContext);
  const [value, setValue] = useState('');
  const submitValue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const num = parseInt(value);
    if (!isNaN(num)) {
      counterContext.set(num);
    }
  };

  return (
    <div>
      <h1>The count is: {counterContext.state.count}</h1>
      <button onClick={() => counterContext.increment()}>Increment</button>
      <button onClick={() => counterContext.decrement()}>Decrement</button>
      <form onSubmit={submitValue}>
        <input
          type="text"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
        ></input>
        <button type="submit">Set Number</button>
      </form>
    </div>
  );
};
